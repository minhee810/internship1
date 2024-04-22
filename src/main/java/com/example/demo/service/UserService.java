package com.example.demo.service;

import java.io.UnsupportedEncodingException;

import com.example.demo.dto.JoinDto;

public interface UserService {

//	public int join(UsersVO userVO) throws UnsupportedEncodingException;
	
	public int join(JoinDto joinDto) throws UnsupportedEncodingException;

	public int idCheck(String id);

	public int emailCheck(String email);
}
