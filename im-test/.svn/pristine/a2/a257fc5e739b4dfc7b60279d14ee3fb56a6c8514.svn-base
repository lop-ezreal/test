package com.ledo.im.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.ledo.im.model.ImMessage;
import com.ledo.im.util.Constant;

@Service
public class ScheduleTask {

    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
	private RedisTemplate<Object, Object> redisTemplate;
	
    // this will send a message to an endpoint on which a client can subscribe
    @Scheduled(fixedRate = 15000)
    public void trigger() {
   //     this.template.convertAndSend("/topic/greetings", "Date: " + new Date());
    /*	ImMessage   message = new ImMessage();
        message.setContent("这是一条中文消息呢");
        message.setOpenid("xxx");
        message.setNickname("测试消息1");
        message.setCreateTime(new Date());
        message.setUname("KFMM1");
        template.convertAndSendToUser("31", "/chat/message", message);
        message.setNickname("测试消息2");
        message.setOpenid("adoule");
        template.convertAndSendToUser("31", "/chat/message", message);
        message.setNickname("测试消息3");
        message.setOpenid("adoule11");
        template.convertAndSendToUser("35", "/chat/message", message);
        
        ListOperations<Object, Object> opsForList = redisTemplate.opsForList();
        
        String openid ="adoule";
		opsForList.rightPush(openid +Constant.CHAT_MSG, message);
		openid="xxx";
		opsForList.rightPush(openid +Constant.CHAT_MSG, message);*/
        
//        String prefix = template.getUserDestinationPrefix();
//        MessageChannel channel = template.getMessageChannel();
    }

}