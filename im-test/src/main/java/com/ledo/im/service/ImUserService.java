package com.ledo.im.service;

import java.util.List;
import java.util.Set;

import org.apache.ibatis.session.RowBounds;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import tk.mybatis.mapper.entity.Example;

import com.github.pagehelper.PageHelper;
import com.ledo.im.mapper.ImMessageMapper;
import com.ledo.im.model.IMUser;
import com.ledo.im.util.Constant;
import com.ledo.im.util.MD5Util;

@Service
public class ImUserService  extends CommonService<IMUser>{
	private static 	Logger LOG= LoggerFactory.getLogger(ImUserService.class);	
	@Autowired
	private ImMessageMapper imMessageMapper;
	@Autowired
	private RedisTemplate<Object, Object> redisTemplate;
	
	public  List<IMUser> listUsers(int pageNum,int pageSize)  {
//		Page<IMUser> page = PageHelper.startPage(pageNum, pageSize, true);
		
		PageHelper.startPage(pageNum, pageSize);
		
		int offset =(pageNum-1)*pageSize;
		
		int selectCount = mapper.selectCount(null);
//		List<IMUser> list = iMUserMapper.selectAll();
		Example example=  new Example(IMUser.class);
		example.setOrderByClause("id desc");
		RowBounds bounds = new RowBounds(offset, pageSize);
//		List<IMUser> list3 = iMUserMapper.selectByExample(example);
		List<IMUser> list2 = mapper.select(null);
		List<IMUser> list = mapper.selectByExampleAndRowBounds(example, bounds);
		
		return	list;
	}
	
	@Transactional
	public int saveUser(IMUser user) {
		int ret = 0;
		if(user.getId()==null) {
			user.setPassword(MD5Util.encrypt(user.getPassword()));
			 ret  = mapper.insertSelective(user);
		} else {
		 	ret = mapper.updateByPrimaryKeySelective(user);
		}
		return ret;
	}

	public IMUser login(IMUser user) {
		user.setPassword(MD5Util.encrypt(user.getPassword()));
	 	IMUser imUser = mapper.selectOne(user);
	 	if(imUser!=null&&imUser.getRole()==2){
	 		Integer uid = imUser.getId();
	 		SetOperations<Object, Object> opsForSet = redisTemplate.opsForSet();
	 		opsForSet.add(Constant.CHAT_OLUSER, imUser);//put  to redis-cache
	 		//get the his service record
	 		List<String> hisOpenids = imMessageMapper.selectHisOpenidByUid(uid);
	 		for(String openid:hisOpenids){
	 			opsForSet.add(uid+Constant.CHAT_RECORD, openid);
	 		}
	 		Set<Object> members = opsForSet.members(uid+Constant.CHAT_RECORD);
	 	}
		
		return imUser;
	}
	
	
	public IMUser selectUserById(Integer uid){
		return mapper.selectByPrimaryKey(uid);
	}

	public long logout(IMUser user) {
		SetOperations<Object, Object> opsForSet = redisTemplate.opsForSet();
		Long remove = opsForSet.remove(Constant.CHAT_OLUSER, user);
		LOG.info("user  logout  result --->{}",remove);
		
		return remove;
	}

	/**
	 * 
	 * @param uname
	 * @return 1, exist   0,can usable
	 */
	public boolean checkUname(String uname) {
//		Example example=  new Example(IMUser.class);
//		example.createCriteria().andEqualTo("uname", uname);
//		List<IMUser> list = mapper.selectByExample(example);
		IMUser param = new IMUser();
		param.setUname(uname);
		IMUser imUser = mapper.selectOne(param);
		return imUser==null;
	}


}
