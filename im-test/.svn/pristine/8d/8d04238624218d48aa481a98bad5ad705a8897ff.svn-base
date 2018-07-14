package com.ledo.im.web.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ledo.im.model.ImMessage;
import com.ledo.im.model.ImSession;
import com.ledo.im.service.ImChatService;
import com.ledo.im.service.ImSessionService;
import com.ledo.im.util.Page;

@RestController
@RequestMapping("/chat")
public class IMChatController {
	private static 	Logger LOG= LoggerFactory.getLogger(IMChatController.class);	
	@Autowired
	private ImChatService imChatService;
	@Autowired
	private ImSessionService imSessionService;
	 @Autowired
	  private SimpMessagingTemplate template;
	@RequestMapping(value="/show/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public String  show(@PathVariable("id")int id){
		
		try {
//			imChatService.test();
//			RestTemplate template = new RestTemplate();
//			MultiValueMap<String , String>  p = new LinkedMultiValueMap<>();
//			p.add("ts", System.currentTimeMillis()+"");
//			String object = template.postForObject("http://10.237.81.195:3000/webqq/loginStatus", p, String.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
 		return "hello"+id;
	}
	
	
    @RequestMapping("/message")    
    @MessageMapping("/message")
    @SendToUser("/queue/chat/message")
    public ImMessage userMessage(ImMessage message) throws Exception {
//    	message.setContent(URLDecoder.decode(message.getContent(),"utf-8"));
    	System.out.println(message.getContent());
        return message;
    }
    
    @RequestMapping("/showMsg")
    public Page<ImMessage> listMessages(@RequestBody Page<ImMessage> param){
    	Page<ImMessage> Page = imChatService.queryWithPageByCondition(param);
    	return Page;
    }
    @RequestMapping("/listSessions")
    public Page<ImSession> listSessions(@RequestBody Page<ImSession> param){
    	Page<ImSession> Page = imSessionService.queryWithPageByCondition(param);
    	return Page;
    }
    
    @RequestMapping("/showChats/{sid}")
    public Map<String,Object> showChats(@PathVariable("sid")Integer sid){
    	Map<String,Object> ret = new HashMap<String,Object>();
    	ret.put("records", imChatService.showChats(sid));
    	return  ret ;
    }
    
    @RequestMapping("/chatSession/{uid}")
    public Map<String,Object> chatSession(@PathVariable("uid")Integer uid){
    	return   imChatService.chatSession(uid) ;
    }
    
    @RequestMapping("/sendMsg")
    public int sendMsg(@RequestBody ImMessage message){
    	 int  i   =  imChatService.sendMsg(message);
    	return 0;
    }
	
    @RequestMapping("/colseChatSession/{uid}/{sid}")
    public Map<String,Object> colseChatSession(@PathVariable("sid")Integer sid,@PathVariable("uid")Integer uid){
    	Map<String,Object> tmp = new HashMap<String,Object>();
    	 Long ret = imChatService.colseChatSession(sid,uid) ;
    	 tmp.put("ret", ret);
    	return  tmp;
    }
    
    
    @RequestMapping("/dialogueMsgs/{sessionId}")
    public Map<String,Object> dialogueMsgs(@PathVariable("sessionId")Integer sessionId){
    	Map<String,Object> ret = new HashMap<String,Object>();
    	ret.put("records", imChatService.dialogueMsgs(sessionId));
    	return  ret ;
    }
    
    
}
