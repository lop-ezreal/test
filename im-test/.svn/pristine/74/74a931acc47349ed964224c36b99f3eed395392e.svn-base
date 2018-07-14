package com.ledo.im.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.ledo.im.mapper.ImMessageMapper;
import com.ledo.im.mapper.ImSessionMapper;
import com.ledo.im.model.IMUser;
import com.ledo.im.model.ImMessage;
import com.ledo.im.model.ImSession;
import com.ledo.im.util.Constant;

@Service
public class IMSchedule4AdmitQueue {

    @Autowired
    private SimpMessagingTemplate template;
    @Autowired
	private RedisTemplate<Object, Object> redisTemplate;
	@Autowired
	private ImUserService imUserService;
	@Autowired
	private ImSessionMapper imSessionMapper;
	@Autowired
	private ImMessageMapper imMessageMapper;
	
    // this will send a message to an endpoint on which a client can subscribe
    @Scheduled(fixedRate = 5000)
    public  void trigger() {
        	ListOperations<Object, Object> opsForList = redisTemplate.opsForList();
        	Object pop = opsForList.rightPop(Constant.CHAT_ADMITQUEUE);
        	
        	if(null!=pop){
        		boolean  shouldAccept = true;	
        		ImSession session =(ImSession) pop;
        		Integer userId = session.getUid();
        		List<Object> list = opsForList.range(userId+Constant.CHAT_SESSION, 0,-1);

        		for(Object o :list){
        			ImSession s = (ImSession)o;
        			if(s.getOpenid().equals(session.getOpenid())){
        				shouldAccept =false;
        				break;
        			}
        		}
        		
        		if(shouldAccept){
            		IMUser imUser = imUserService.selectUserById(userId);
            		imSessionMapper.insert(session);
            		opsForList.rightPush(userId+Constant.CHAT_SESSION, session);
            		ImMessage message = new ImMessage();
                    message.setContent(session.getName()+"接入会话!");
                    message.setOpenid(session.getOpenid());
                    message.setNickname(session.getName());
                    message.setCreateTime(new Date());
                    message.setUname(imUser.getUname());// ;
                    message.setSessionId(session.getId());
                	message.setType((short)0);
                	message.setUserId(userId);
                	imMessageMapper.insert(message);
    				template.convertAndSendToUser(userId+"", "/chat/message", message);
        		}
        	}	
        	
        	Object object = opsForList.rightPop(Constant.CHAT_MSGQUEUE);
        	if(null!=object){
        		ImMessage message  = (ImMessage)object;
        		Integer userId = message.getUserId();
        		IMUser imUser = imUserService.selectUserById(userId);
        		message.setUname(imUser.getUname());
        		message.setCreateTime(new Date());
        		imMessageMapper.insert(message);
        	    template.convertAndSendToUser(userId+"", "/chat/message", message);
        	}
        
    }

}