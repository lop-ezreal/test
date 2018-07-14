package com.ledo.im.model;

import java.io.Serializable;

import javax.persistence.Id;
import javax.persistence.Table;

@Table(name="im_user")
public class IMUser implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 8527098893241440018L;
	@Id
	private Integer id;
	private String uname;
	private String password;
	private Short role;// 1 admin,2 staff
	private String email;
	private String  phoneNo;
	private  Integer inchatNum;//s
	private String game;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getUname() {
		return uname;
	}
	public void setUname(String uname) {
		this.uname = uname;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Short getRole() {
		return role;
	}
	public void setRole(Short role) {
		this.role = role;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhoneNo() {
		return phoneNo;
	}
	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}
	public Integer getInchatNum() {
		return inchatNum;
	}
	public void setInchatNum(Integer inchatNum) {
		this.inchatNum = inchatNum;
	}
	public String getGame() {
		return game;
	}
	public void setGame(String game) {
		this.game = game;
	}
}
