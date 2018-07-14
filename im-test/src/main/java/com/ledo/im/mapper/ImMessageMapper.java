package com.ledo.im.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import tk.mybatis.mapper.common.ConditionMapper;
import tk.mybatis.mapper.common.Mapper;

import com.ledo.im.model.ImMessage;

public interface ImMessageMapper extends Mapper<ImMessage>,ConditionMapper<ImMessage> {
  //其他必须手写的接口...

	@Select("select openid from im_message where user_id=#{uid} ")
	List<String> selectHisOpenidByUid(@Param("uid")Integer uid);
}