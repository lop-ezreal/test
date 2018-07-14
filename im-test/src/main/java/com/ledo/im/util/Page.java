package com.ledo.im.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Page<T> {

	private int totalNum;
	private int  pageNum;
	private int  pageSize;
	private String orderBy;
	
	private Map<String,Object> conditions;
	private List<T> records = new ArrayList<>();
	
	
	
	public String getOrderBy() {
		return orderBy;
	}
	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
	}
	public Map<String, Object> getConditions() {
		return conditions;
	}
	public void setConditions(Map<String, Object> conditions) {
		this.conditions = conditions;
	}
	
	public int getTotalNum() {
		return totalNum;
	}
	public void setTotalNum(int totalNum) {
		this.totalNum = totalNum;
	}
	public int getPageNum() {
		return pageNum;
	}
	public void setPageNum(int pageNum) {
		this.pageNum = pageNum;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public List<T> getRecords() {
		return records;
	}
	public void setRecords(List<T> records) {
		this.records = records;
	}
	
}
