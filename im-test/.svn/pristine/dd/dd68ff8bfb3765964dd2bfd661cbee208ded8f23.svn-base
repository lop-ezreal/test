/*package com.ledo.kf_im;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

import com.ledo.im.mapper.ImMessageMapper;
import com.ledo.im.model.ImMessage;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

*//**
 * Unit test for simple App.
 *//*
public class AppTest 

    extends TestCase
{
	
	@Autowired
	private ImMessageMapper chatMessageMapper;
	@Autowired
	private RedisTemplate<Object, Object> redisTemplate;
    *//**
     * Create the test case
     *
     * @param testName name of the test case
     *//*
    public AppTest( String testName )
    {
        super( testName );
    }

    *//**
     * @return the suite of tests being tested
     *//*
    public  Test suite()
    {

    		ValueOperations<Object, Object> opsForValue = redisTemplate.opsForValue();
    		opsForValue.set("xxx","杀杀杀啊啊");
    		Object object = opsForValue.get("xxx");
    		System.out.println((String)object);
    		
    		ImMessage message = new ImMessage();
    		message.setContent("xaaaaaaaaa");
    		chatMessageMapper.insert(message);
    		
//    		PageHelper.startPage(1, 5);
    		Example example = new Example(ChatMessage.class);
    		example.createCriteria().andEqualTo("content", "xaaaaaaaaa");
    		List<ChatMessage> list = chatMessageMapper.selectByExample(example);
    		LOG.info(list.size()+"");
    		ImMessage message2 = new ImMessage();
    		message2.setId(1);
    		chatMessageMapper.delete(message2);
    		chatMessageMapper.deleteByPrimaryKey(2);
    		ImMessage chatMessage = chatMessageMapper.selectByPrimaryKey(3);
    		int count = chatMessageMapper.selectCount(message);
    		message.setId(null);
    		 count = chatMessageMapper.selectCount(message);
    	
        return new TestSuite( AppTest.class );
    }

    *//**
     * Rigourous Test :-)
     *//*
    public void testApp()
    {
        assertTrue( true );
    }
}
*/