package com.ledo.im.service;

import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Component;


@Component
public class IMSessionListener implements MessageListener{

	@Override
	public void onMessage(Message message, byte[] pattern) {
		
		byte[] body = message.getBody();
		System.out.println(new String(body));
		System.out.println(new String(pattern));
		
	}

}
