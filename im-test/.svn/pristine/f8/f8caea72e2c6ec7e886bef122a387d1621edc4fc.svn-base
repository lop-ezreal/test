package com.ledo.im.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class ImSession  implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8458650409306247258L;
	@Id
	@GeneratedValue(generator="JDBC")
	private Integer id;
	private Integer uid;
	private String name;
	private String  openid;
	@Column(name="game")
	private Short game;
	private Integer roleId;
	private Date startTime;
	private Date endTime;
	
	public Integer getUid() {
		return uid;
	}
	public void setUid(Integer uid) {
		this.uid = uid;
	}
	public String getOpenid() {
		return openid;
	}
	public void setOpenid(String openid) {
		this.openid = openid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Short getGame() {
		return game;
	}
	public void setGame(Short game) {
		this.game = game;
	}
	public Integer getRoleId() {
		return roleId;
	}
	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Date getStartTime() {
		return startTime;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	
}
