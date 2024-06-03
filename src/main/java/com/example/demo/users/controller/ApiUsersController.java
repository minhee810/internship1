package com.example.demo.users.controller;

import java.io.UnsupportedEncodingException;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.common.dto.ResponseDto;
import com.example.demo.users.consts.SessionConst;
import com.example.demo.users.dto.JoinDto;
import com.example.demo.users.dto.LoginDto;
import com.example.demo.users.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class ApiUsersController {

	private final UserService userSerivce;

	// 회원가입
	@PostMapping("/join")
	public ResponseEntity<?> join(JoinDto joinDto) throws UnsupportedEncodingException {

		log.info("회원가입 로직 실행");
		log.info("joinDto ={}", joinDto);

		if (userSerivce.join(joinDto) > 0) {
			return new ResponseEntity<>(new ResponseDto<>(1, "회원가입에 성공하였습니다.", null), HttpStatus.CREATED);
		}
		// 회원가입 실패시
		return new ResponseEntity<>(new ResponseDto<>(-1, "회원가입에 실패하였습니다.", null), HttpStatus.BAD_REQUEST);
	}

	/** 아이디 중복 검사 **/
	@GetMapping("/username/{username}/check")
	public ResponseEntity idCheck(@PathVariable String username) {
		log.info("username = {}", username);
		
		int code =  userSerivce.idCheck(username);
		if(code == 1) {
			return new ResponseEntity<>(new ResponseDto<>(-1, "이미 사용중인 아이디입니다.", code), HttpStatus.CONFLICT);
		}
		return new ResponseEntity<>(new ResponseDto<>(1, "사용 가능한 아이디입니다.",code), HttpStatus.OK);
	}

	/** 이메일 중복 검사 **/
	@GetMapping("/email/{email}/check")
	public ResponseEntity<?> emailCheck(@PathVariable String email) {

		log.info("emailCheck 로직 실행");
		log.info("email = {}", email);
		log.info("userSerivce.emailCheck(email) = {}", userSerivce.emailCheck(email));

		int code = userSerivce.emailCheck(email);
		
		if(code == 1) {
			return new ResponseEntity<>(new ResponseDto<>(-1, "이미 사용중인 이메일입니다.", code), HttpStatus.CONFLICT);
		}
		return new ResponseEntity<>(new ResponseDto<>(1, "사용 가능한 이메일입니다.",code), HttpStatus.OK);
	}

	/**
	 * 로그인 기능
	 * 
	 **/
	@PostMapping("/login")
	public ResponseEntity<?> login(LoginDto loginDto, HttpSession session) throws Exception {
		
		log.info("login ==== ");
		Long id = (Long) session.getAttribute(SessionConst.USER_ID);
		
		if (session.getAttribute(SessionConst.USER_ID) != null) {
			log.info("id= {}", id);
			session.removeAttribute(SessionConst.USER_ID);
			session.removeAttribute(SessionConst.USERNAME);
		}

		Map<String, Object> userInfo = userSerivce.login(loginDto);

		session.setAttribute(SessionConst.USER_ID, userInfo.get("userId"));
		session.setAttribute(SessionConst.USERNAME, userInfo.get("username"));

		log.info("userInfo = {} ", userInfo.get("username"));

		return new ResponseEntity<>(new ResponseDto<>(1, "로그인 성공", userInfo), HttpStatus.OK);

	}

	@GetMapping("/logout")
	public String logout(HttpSession session) throws Exception {
		session.invalidate();
		return "redirect:/";

	}
	@GetMapping("/myprofile")
	public String myprofile() {
		return "/users/profile";
	}
	
}
