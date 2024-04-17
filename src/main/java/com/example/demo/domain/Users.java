package com.example.demo.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter 
@Setter
@ToString
public class Users {

	private Long userId; 
	private String username;
	private String email; 
	private String password;
	private String phone;
	private String address;
	private String detailAddress;
	private String zipCode;
	private String note; 
	private String createdDate;
	private String modifidDate;
	private String isDeleted;

}
