package com.example.demo.web;

import java.io.UnsupportedEncodingException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.service.auth.UserServiceImpl;
import com.example.demo.web.dto.ResponseDto;
import com.example.demo.web.dto.auth.JoinDto;
import com.example.demo.web.dto.auth.LoginDto;

import lombok.extern.slf4j.Slf4j;

@RequestMapping("/auth")
@Controller
@Slf4j
public class UsersController {

	@Autowired
	UserServiceImpl userServiceImpl;

	// 회원가입 페이지 이동
	@GetMapping("/join")
	public String joinPage() {
		return "auth/join";
	}

	// 로그인 페이지 이동
	@GetMapping("/login")
	public String loginPage() {
		return "auth/login";
	}

	// 회원가입
	@PostMapping("/join")
	public String join(@ModelAttribute JoinDto joinDto) throws UnsupportedEncodingException {

		if (userServiceImpl.join(joinDto) > 0) {

			log.info("joinDto = {} ", joinDto);

			return "redirect:/auth/login";
		}
		// 회원가입 실패시 예외처리
		return "auth/join";
	}

	/** 아이디 중복 검사 **/
	@PostMapping("/idCheck")
	@ResponseBody
	public int idCheck(String username) {
		return userServiceImpl.idCheck(username);
	}

	/** 이메일 중복 검사 **/
	@PostMapping("/emailCheck")
	@ResponseBody
	public int emailCheck(String email) {
		return userServiceImpl.emailCheck(email);
	}

	/**
	 * 로그인 기능
	 * 
	 **/
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDto loginDto, HttpServletRequest request) throws Exception {

		Map<String, Object> sessionInfo = userServiceImpl.login(loginDto);

		if (sessionInfo == null) {
			return new ResponseEntity<>(new ResponseDto<>(-1, "로그인 실패", null), HttpStatus.OK);
		}

		HttpSession session = request.getSession();

		session.setAttribute(SessionConst.LOGIN_USER, sessionInfo);
		
		log.info("sessionInfo = {} ", sessionInfo.get("username"));
		
		return new ResponseEntity<>(new ResponseDto<>(1, "로그인 성공", sessionInfo), HttpStatus.OK);

	}

	@PostMapping("/logout")
	public String logout(HttpServletRequest request) throws Exception {

		// 세션 삭제
		HttpSession session = request.getSession(false);

		if (session != null) {
			session.invalidate();
		}
		return "redirect:/board/main";

	}
}
