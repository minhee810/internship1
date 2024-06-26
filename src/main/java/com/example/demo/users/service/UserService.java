package com.example.demo.users.service;

import java.io.UnsupportedEncodingException;
import java.util.Map;

import com.example.demo.users.dto.JoinDto;
import com.example.demo.users.dto.LoginDto;

public interface UserService {

	int join(JoinDto joinDto) throws UnsupportedEncodingException;

	int idCheck(String id);

	int emailCheck(String email);

	boolean checkPassword(String plainPassword, String hashedPassword) throws Exception;

	int existUser(LoginDto loginDto);

	LoginDto getLoginUser(String email) throws Exception;

	Map<String, Object> login(LoginDto loginDto) throws Exception;

}
