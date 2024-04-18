package com.example.demo.domain;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@ToString
@Getter
@Setter
public class UsersVO {

	private Long userId; 
	private String username; // 닉네임 
	private String email; 
	private String password;
	private String phone;
	private String address;
	private String detailAddress;
	private String zipCode;
	private String note; 
	private LocalDateTime createdDate;
	private LocalDateTime modifidDate;
	private String isDeleted;

}
