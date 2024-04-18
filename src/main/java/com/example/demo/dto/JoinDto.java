package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class JoinDto {

	private String username;
	private String email;
	private String password;
	private String phone;
	private String address;
	private String detailAddress;
	private String zipCode;
	private String note;
	
}
