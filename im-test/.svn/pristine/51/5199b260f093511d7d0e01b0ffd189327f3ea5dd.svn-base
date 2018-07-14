package com.ledo.im.conf;

import java.util.Map;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

public class ChatHandshakeInterceptor implements HandshakeInterceptor {

	@Override
	public void afterHandshake(ServerHttpRequest req, ServerHttpResponse resp, WebSocketHandler handler, Exception ex) {
	}

	@Override
	public boolean beforeHandshake(ServerHttpRequest req, ServerHttpResponse resp, WebSocketHandler handler,
			Map<String, Object> map) throws Exception {
		return true;
	}
}