package com.ledo.im.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ledo.im.model.ImMessage;
import com.ledo.im.service.GreetingService;


@Controller
public class GreetingController {
/*	@Autowired
	 private SimpMessagingTemplate template;*/
	@Autowired
	private GreetingService greetingService;
	
    @MessageMapping("/chat")
    public void greeting(ImMessage message) throws Exception {
    }
    
    
    @RequestMapping("/send")
    public void sendMessage2Client(){
    	ImMessage helloMessage = new ImMessage();
    }

}
