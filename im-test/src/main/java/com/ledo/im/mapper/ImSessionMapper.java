package com.ledo.im.mapper;

import tk.mybatis.mapper.common.ConditionMapper;
import tk.mybatis.mapper.common.Mapper;

import com.ledo.im.model.ImSession;

public interface ImSessionMapper extends Mapper<ImSession>,ConditionMapper<ImSession> {
  //其他必须手写的接口...42

}