package com.example.demo.service.auth;

import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.UsersVO;
import com.example.demo.dto.JoinDto;
import com.example.demo.dto.LoginDto;
import com.example.demo.mapper.UserMapper;
import com.example.demo.service.utils.PasswordEncoder;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

	private final PasswordEncoder passwordEncoder;

	@Autowired
	UserMapper userMapper;
	
	@Override
	public int join(JoinDto joinDto) throws UnsupportedEncodingException {

		String encPassword = passwordEncoder.encrypt(joinDto.getEmail(), joinDto.getPassword());
		joinDto.setPassword(encPassword);

		log.debug(encPassword);
		return userMapper.join(joinDto);
	}

	@Override
	public int idCheck(String username) {
		int result = userMapper.idCheck(username);

		return result;
	}

	@Override
	public int emailCheck(String email) {
		int result = userMapper.emailCheck(email);
		return result;
	}

	@Override
	public LoginDto login(String username, String password) {
		
		return null;
	}

	



}
