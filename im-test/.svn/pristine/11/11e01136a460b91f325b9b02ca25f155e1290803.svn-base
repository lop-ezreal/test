package com.ledo.im.conf;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.serializer.JdkSerializationRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import com.ledo.im.service.IMSessionListener;

@Configuration
@EnableCaching(proxyTargetClass=true)
//@ComponentScan("com.ledo.im.conf")
@EnableConfigurationProperties(RedisProperties.class)
public class RedisCacheConfig {

    @Autowired
    RedisProperties redisProperties;

    @Bean
    public JedisConnectionFactory jedisConnectionFactory() {
        JedisConnectionFactory factory = new JedisConnectionFactory();
        factory.setHostName(redisProperties.getHostname());
        factory.setPort(redisProperties.getPort());
        factory.setUsePool(true);
        return factory;
    }

    @Bean
    public RedisTemplate<Object, Object> redisTemplate() {
        RedisTemplate<Object, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(jedisConnectionFactory());
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new JdkSerializationRedisSerializer());
        return redisTemplate;
    }

    @Bean
    public CacheManager cacheManager() {
        return new RedisCacheManager(redisTemplate());
    }
    
    @Bean
    public RedisMessageListenerContainer redisMessageListenerContainername() {
    	RedisMessageListenerContainer container = new RedisMessageListenerContainer();
    	
    	container.setConnectionFactory(jedisConnectionFactory());
    	container.addMessageListener(new IMSessionListener(),new ChannelTopic("IMChannel"));
//    	container.setMessageListeners(listeners);
    	return container;
    	
	}
}

