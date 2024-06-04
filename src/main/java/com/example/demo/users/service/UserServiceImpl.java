package com.example.demo.users.service;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.common.exception.CustomException;
import com.example.demo.users.dto.JoinDto;
import com.example.demo.users.dto.LoginDto;
import com.example.demo.users.mapper.UserMapper;
import com.example.demo.utils.SaltEncrypt;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final SaltEncrypt saltEncrypt;
	private final UserMapper userMapper;

	/**
	 * 회원 가입
	 */
	@Override
	@Transactional
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
	@Transactional
	public int idCheck(String username) {
		int result = userMapper.idCheck(username);
		return result;
	}

	/**
	 * 이메일 중복 확인
	 */
	@Override
	@Transactional
	public int emailCheck(String email) {
		int result = userMapper.emailCheck(email);
		log.info("result = {}", result);
		log.info("email = {}", email);
		return result;
	}

	/**
	 * 이메일로 사용자 비밀번호 불러오기 (비밀번호 확인을 위함) -> 추후 사용할 수도 있어 보류 ...
	 */
	@Transactional
	private String findPassword(String email) {

		String password = userMapper.findPassword(email);

		log.info("** password", password);

		return password;
	}

	/**
	 * 이메일로 사용자가 존재하는지 확인
	 */
	@Override
	@Transactional
	public int existUser(LoginDto loginDto) {
		return userMapper.emailCheck(loginDto.getEmail());
	}

	/**
	 * 사용자 정보 불러오기 1. map 사용해서 리턴하기 2. 사용자 정보
	 */
	@Override
	@Transactional
	public LoginDto getLoginUser(String email) throws Exception {
		try {
			LoginDto savedUser = userMapper.getLoginUser(email);
			if (savedUser == null) {
				throw new CustomException(-1, "saved null입니다");
			}
			return savedUser;

		} catch (Exception e) {
			log.info(e.getMessage());
			return null;
		}

	}

	/**
	 * 로그인 기능
	 */
	@Override
	@Transactional
	public Map<String, Object> login(LoginDto loginDto) throws Exception {

		String email = loginDto.getEmail();
		String password = loginDto.getPassword();
		
		Map<String, Object> map = new HashMap<String, Object>();

		LoginDto savedUser = getLoginUser(loginDto.getEmail());

		// 저장되어있는 이메일인지 확인 저장되어있지 않다면 return false;
		if (savedUser == null) {
			throw new CustomException(-1, "이메일 혹은 비밀번호가 실패했습니다.");
		}

		String savedUsername = savedUser.getUsername();

		if (!email.equals(savedUser.getEmail()) || !checkPassword(password, savedUser.getPassword())) {

			throw new CustomException(-1, "이메일 혹은 비밀번호가 실패했습니다.");
		}

		map.put("userId", savedUser.getUserId());
		map.put("username", savedUsername);

		// DB 호출
		return map;
	}

	/**
	 * 비밀번호 확인
	 */
	@Override
	@Transactional
	public boolean checkPassword(String plainPassword, String hashedPassword) throws Exception {
		return saltEncrypt.isMatch(plainPassword, hashedPassword);
	}

}
