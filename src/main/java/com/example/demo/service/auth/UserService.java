package com.example.demo.service.auth;

import java.io.UnsupportedEncodingException;

import com.example.demo.web.dto.auth.JoinDto;
import com.example.demo.web.dto.auth.LoginDto;

public interface UserService {

	public int join(JoinDto joinDto) throws UnsupportedEncodingException;

	public int idCheck(String id);

	public int emailCheck(String email);

	public LoginDto getLoginUser(LoginDto loginDto) throws Exception;
	
	public boolean checkPassword(String plainPassword, String hashedPassword) throws Exception;
	
	public int existUser(LoginDto loginDto);
	
}
