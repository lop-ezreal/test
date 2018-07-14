package com.ledo.im.conf;

import java.security.Principal;
import java.util.Map;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeFailureException;
import org.springframework.web.socket.server.HandshakeHandler;

public class ChatHandshakeHandler implements HandshakeHandler {

	@Override
	public boolean doHandshake(ServerHttpRequest req, ServerHttpResponse resp, WebSocketHandler handler,
			Map<String, Object> map) throws HandshakeFailureException {
		
		Principal principal = req.getPrincipal();
		String name = principal.getName();
		System.err.println(name);
		System.err.println(map);
		
		return true;
	}

}
