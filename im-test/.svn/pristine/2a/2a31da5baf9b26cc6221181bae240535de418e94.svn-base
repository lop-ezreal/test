
package com.ledo.im.conf;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.user.UserDestinationMessageHandler;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurationSupport;

@Configuration
public class WebSocketConfig extends WebSocketMessageBrokerConfigurationSupport{

	@Override
	public void configureMessageBroker(MessageBrokerRegistry config) {
		config.enableSimpleBroker("/queue","/user");
		config.setApplicationDestinationPrefixes("/ledo");
		config.setUserDestinationPrefix("/user");
		UserDestinationMessageHandler a;
	}

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry.addEndpoint("/service")
					
//				   .setHandshakeHandler(new ChatHandshakeHandler())
//				   .addInterceptors(new ChatHandshakeInterceptor())
				   .withSockJS();
	}

	@Override
	public void configureClientInboundChannel(ChannelRegistration channelRegistration) {
		// TaskExecutorRegistration executor = channelRegistration.taskExecutor();
		
	}

	@Override
	public void configureClientOutboundChannel(ChannelRegistration channelRegistration) {
	}

}