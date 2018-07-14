package com.ledo.im.service;

import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.ledo.im.mapper.IMUserMapper;
import com.ledo.im.mapper.ImMessageMapper;
import com.ledo.im.mapper.ImSessionMapper;
import com.ledo.im.model.IMUser;
import com.ledo.im.model.ImMessage;
import com.ledo.im.model.ImSession;
import com.ledo.im.util.Constant;
import com.ledo.im.util.MD5Util;

import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.entity.Example.Criteria;
import tk.mybatis.mapper.entity.Example.OrderBy;

@Service
public class ImChatService extends CommonService<ImMessage>{
	private static 	Logger LOG= LoggerFactory.getLogger(ImChatService.class);	
	@Autowired
	private ImMessageMapper imMessageMapper;
	@Autowired
	private IMUserMapper iMUserMapper;
	@Autowired
	private  ImSessionMapper imSessionMapper; 
	@Autowired
	private RedisTemplate<Object, Object> redisTemplate;
	private  	RestTemplate template = new RestTemplate();
	
	@Transactional
	public void test() throws NoSuchAlgorithmException {
//		LOG.info("xxx={}", 1/0);
		ImMessage message = new  ImMessage();
		message.setContent("test  Transactional...");
		message.setCreateTime(new Date());
		message.setType((short)1);
		message.setUserId(1);
		
		IMUser imUser = new IMUser();
		String password ="password";
		imUser.setUname("username");
		imUser.setPassword(MD5Util.encrypt(password));

		iMUserMapper.insert(imUser);
		
		int insert = imMessageMapper.insert(message);
		LOG.info("insert message ret ===>{}",insert );
		
/*		Example example = new Example(ChatMessage.class);
		example.createCriteria().andCondition(" content = ", message2.getContent());
		chatMessageMapper.deleteByCondition(example);*/
	}
	
	/**
	 * 显示聊天窗口消息
	 * @param openid
	 * @return
	 */
	public List<ImMessage>  showChats(Integer sid){
		Example  example = new Example(ImMessage.class);
		example.createCriteria().andEqualTo("sessionId", sid);
		RowBounds bounds = new RowBounds(0, 100);
		example.setOrderByClause("create_time  asc");
		List<ImMessage> messages = mapper.selectByExampleAndRowBounds(example, bounds);
		return  messages;
	}

	public Map<String,Object> chatSession(Integer uid) {
		ListOperations<Object, Object> opsForList = redisTemplate.opsForList();
		Map<String ,Object > ret = new HashMap<String, Object>();
		
		List<Object> chatsession = opsForList.range(uid+Constant.CHAT_SESSION, 0, -1);
		
		Map<String ,Object > msgMap = new HashMap<String, Object>();
 		for(Object obj : chatsession){
			ImSession is = (ImSession)obj;
			String openid = is.getOpenid();
			Integer sid = is.getId();
			
		/*	if(	opsForList.size(openid+Constant.CHAT_MSG)>0){
			List<Object> msgs = opsForList.range(openid+Constant.CHAT_MSG, 0, -1);
			msgMap.put(openid, msgs);
			}*/
			
			ImMessage record = new ImMessage();
			record.setSessionId(sid);
			List<ImMessage> msgs = mapper.select(record);
			msgMap.put(openid, msgs);
		}
		
 		ret.put("session", chatsession);
 		ret.put("msg", msgMap);
		
		return  ret;
	}

	public int sendMsg(ImMessage message) {
		ListOperations<Object, Object> opsForList = redisTemplate.opsForList();
		List<Object> chatsession = opsForList.range(message.getUserId()+Constant.CHAT_SESSION, 0, -1);
		ImSession currentSession = null;
 		for(Object obj : chatsession){
			ImSession is = (ImSession)obj;
			if(message.getOpenid().equals(is.getOpenid())&&message.getUserId().equals(is.getUid())){
				currentSession =is;
				break;
			}
			
		}
 		message .setSessionId(currentSession==null?-1:currentSession.getId());
 		message.setNickname(currentSession==null?"":currentSession.getName());
		mapper.insert(message);
	
//		opsForList.rightPush(message.getOpenid()+Constant.CHAT_MSG, message);
		
		//send to wechat
		MultiValueMap<String , String>  param = new LinkedMultiValueMap<>();
		param.add("uniqueCode", "1002");
		param.add("openid", message.getOpenid());
		param.add("msgContent",message.getContent());
		
		String result = template.postForObject(Constant.WECHAT_URL, param, String.class);
		LOG.info("send to wechat result ---->>{}",result);
		
		
		return 0;
	}

	public Long  colseChatSession(Integer sid,Integer uid) {
		
		
	  	ListOperations<Object, Object> opsForList = redisTemplate.opsForList();
	   List<Object> range = opsForList.range(uid+Constant.CHAT_SESSION, 0, -1);
	   ImSession session = null;
	   for(Object o : range){
		   ImSession s = (ImSession)o;
		   if(s.getId().equals(sid)){
			   session =s;
			   break;
		   }
	   }
	   Long remove = opsForList.remove(uid+Constant.CHAT_SESSION, 1, session);
	   if(null!=session){
		   session.setEndTime(new Date());
		   imSessionMapper.updateByPrimaryKey(session);
	   }
		return remove;
	}

	public List<ImMessage> dialogueMsgs(Integer sessionId) {
//		Example example = new Example(ImMessage.class);
//		example.createCriteria().andCondition("session_id", sessionId);
//			example.orderBy("createTime").desc();
//		List<ImMessage> condition = imMessageMapper.selectByExample(example);
		
//		example.selectProperties(properties);
		ImMessage record = new ImMessage();
		record.setSessionId(sessionId);
		
	return mapper.select(record);	
//		return imMessageMapper.selectByExample(example);
	}

/*	public Page<ImMessage> listMessages(Page<ImMessage> param)  {
		
		int offset =(param.getPageNum()-1)*param.getPageSize();
		int count = imMessageMapper.selectCount(null);
		Example example=  new Example(ImMessage.class);
		param.setTotalNum(count);
		Map<String, Object> conditions = param.getConditions();
		
		Criteria criteria = example.createCriteria();
		if(conditions!=null&&!conditions.isEmpty()){
			for(Entry<String,Object> entrySet :  conditions.entrySet() ){
				criteria.andEqualTo(entrySet.getKey(), entrySet.getValue());
			}
		}
		if(!StringUtils.isEmpty(param.getOrderBy())){
			example.setOrderByClause(""+param.getOrderBy()+" desc");
		}
		
		RowBounds bounds = new RowBounds(offset, param.getPageSize());
		List<ImMessage> list = imMessageMapper.selectByExampleAndRowBounds(example, bounds);
		param.setRecords(list);
		return	param;
	}*/
}
