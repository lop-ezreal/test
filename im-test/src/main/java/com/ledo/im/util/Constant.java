package com.ledo.im.util;

public class Constant {

	
	public final static String WECHAT_URL="http://wx.ledo.com/ledo/cstmservice/sendMsg2User";
	
	// <redis key suffix start >
	public final  static  String CHAT_ADMITQUEUE="chat.admit.queue";
	public final  static  String  CHAT_MSGQUEUE="chat.msg.queue"; 
	public final  static  String  CHAT_SESSION=".chat.session"; 
	public final  static  String  CHAT_MSG=".chat.msg"; 
	public final  static  String  CHAT_OLUSER="online.user.set"; //online KF set key of redis
	public final static  String CHAT_RECORD=".chat.record";
	// <redis key suffix  end >

}
