package com.example.demo.service.auth;

import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.exception.CustomException;
import com.example.demo.mapper.UserMapper;
import com.example.demo.service.utils.SaltEncrypt;
import com.example.demo.web.dto.auth.JoinDto;
import com.example.demo.web.dto.auth.LoginDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

	private final SaltEncrypt saltEncrypt;

	@Autowired
	UserMapper userMapper;

	/**
	 * 회원 가입
	 */
	@Override
	public int join(JoinDto joinDto) throws UnsupportedEncodingException {

		String encPassword = saltEncrypt.encrypt(joinDto.getPassword());

		joinDto.setPassword(encPassword);

		log.info(encPassword);

		return userMapper.join(joinDto);
	}

	/**
	 * 아이디 중복 확인
	 */
	@Override
	public int idCheck(String username) {
		int result = userMapper.idCheck(username);
		return result;
	}

	/**
	 * 이메일 중복 확인
	 */
	@Override
	public int emailCheck(String email) {
		int result = userMapper.emailCheck(email);
		return result;
	}

	/**
	 * 이메일로 사용자 비밀번호 불러오기 (비밀번호 확인을 위함)
	 */
	private String findPassword(String email) {

		String password = userMapper.findPassword(email);

		log.info("** password", password);

		return password;
	}

	/**
	 * 이메일로 사용자가 존재하는지 확인
	 */
	@Override
	public int existUser(LoginDto loginDto) {
		return userMapper.emailCheck(loginDto.getEmail());
	}

	/**
	 * 사용자 정보 불러오기
	 * 1. map 사용해서 리턴하기
	 * 2. 사용자 정보 
	 */
	@Override
	public LoginDto getLoginUser(LoginDto loginDto) throws Exception {
		
		String password = findPassword(loginDto.getEmail());
		
		// 이메일 + 비밀번호 맞는지 확인하기 
		if (!checkPassword(loginDto.getPassword(), password)) {
			throw new CustomException(-1, "비밀번호가 사용자 정보와 일치하지 않음.");
		}
		
		if(existUser(loginDto) == 1 && !checkPassword(loginDto.getPassword(), password)) {
			
		}
		// 1. 이메일이 있는지 확인
		
		// 비밀번호가 서로 일치하면 사용자의 정보를 가져온다.
		return userMapper.getLoginUser(loginDto);
	}

	/**
	 * 비밀번호 확인
	 */
	@Override
	public boolean checkPassword(String plainPassword, String hashedPassword) throws Exception {
		return saltEncrypt.isMatch(plainPassword, hashedPassword);
	}

}
