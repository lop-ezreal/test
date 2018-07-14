package com.ledo.im.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.ledo.im.model.ImMessage;

@Service
public class GreetingService {
    private SimpMessagingTemplate template;

    @Autowired
    public GreetingService(SimpMessagingTemplate template) {
        this.template = template;
    }

    public void sendMessageLoop(ImMessage helloMessage) {
        for (int index = 0; index < 10; index++) {
            String text = "[" + index + "]:" + helloMessage.getContent();
            this.template.convertAndSend("/topic/greetings", text);
        }
    }
}
