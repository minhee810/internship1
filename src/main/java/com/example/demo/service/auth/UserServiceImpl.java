package com.example.demo.service.auth;

import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.mapper.UserMapper;
import com.example.demo.service.utils.EncryptHelper;
import com.example.demo.service.utils.PasswordEncoder;
import com.example.demo.web.dto.auth.JoinDto;
import com.example.demo.web.dto.auth.LoginDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

	private final EncryptHelper encryptHelper;

	@Autowired
	UserMapper userMapper;

	@Override
	public int join(JoinDto joinDto) throws UnsupportedEncodingException {

		String encPassword = encryptHelper.encrypt(joinDto.getPassword());

		joinDto.setPassword(encPassword);

		log.info(encPassword);

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
	public LoginDto getLoginUser(LoginDto loginDto) throws Exception {
		
		int email = emailCheck(loginDto.getEmail()); 
		
		if(email == 1) {
			checkPassword(loginDto.getPassword(), null)
		}
				
		
		loginDto.setPassword(encryptHelper.encrypt(loginDto.getPassword()));
		
		log.info("loginDto.getPassword() = {}", loginDto.getPassword());
		
		return userMapper.getLoginUser(loginDto);
	}

	@Override
	public LoginDto login(LoginDto loginDto) throws Exception {
		
		// db 저장된 사용자의 정보 
		LoginDto savedUser = getLoginUser(loginDto);
		
		// 사용자가 로그인 시 입력한 비밀번호 인코딩 값 
		String plainPassword = encryptHelper.encrypt(loginDto.getPassword());
		
		// 저장되어있는 사용자의 인코딩 된 비밀번호 
		String hashedPassword = savedUser.getPassword();
		
		// 비밀번호 일치 확인 
		if(checkPassword(plainPassword, hashedPassword)) {
			
		}
		
		return null;
	}

	@Override
	public boolean checkPassword(String plainPassword, String hashedPassword) throws Exception {
		return encryptHelper.isMatch(plainPassword, hashedPassword);
	}
	


	// 1. 사용자가 입력한 이메일, 비밀번호 받아와서 db에 있는 정보인지 확인 getLoginUser()
	// 1-1. 사용자 id 로 회원 정보 조회, 비밀번호 비교 메서드 호출, 가입한 사용자라면 세션에 정보 저장 login()
	// 1-2. 조회한 정보로 pw 비교 메서드 checkPassword()

}
