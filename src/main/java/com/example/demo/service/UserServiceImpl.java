package com.example.demo.service;

import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.UsersVO;
import com.example.demo.mapper.UserMapper;

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
	public int join(UsersVO userVO) throws UnsupportedEncodingException {

		String encPassword = passwordEncoder.encrypt(userVO.getEmail(), userVO.getPassword());
		userVO.setPassword(encPassword);

		log.debug(encPassword);
		return userMapper.join(userVO);
	}

	@Override
	public int idCheck(String username) {
		int result = userMapper.idCheck(username);

		return result;
	}

	@Override
	public int emailCheck(String email) {
		int result = userMapper.emailCheck(email);
		return 0;
	}



}
