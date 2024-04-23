package com.example.demo.service.auth;

import java.io.UnsupportedEncodingException;

import com.example.demo.dto.JoinDto;
import com.example.demo.dto.LoginDto;

public interface UserService {

//	public int join(UsersVO userVO) throws UnsupportedEncodingException;
	
	public int join(JoinDto joinDto) throws UnsupportedEncodingException;

	public int idCheck(String id);

	public int emailCheck(String email);
	
	public LoginDto login(String username, String password);
}
