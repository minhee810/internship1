package com.example.demo.controller;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.domain.UsersVO;
import com.example.demo.service.UserServiceImpl;

@RequestMapping("/auth")
@Controller
public class UsersController {

	private final Logger log = LoggerFactory.getLogger(UsersController.class);

	@Autowired
	UserServiceImpl userServiceImpl;

	// 회원가입 페이지 이동
	@GetMapping("/join")
	public String joinPage() {
		return "auth/membership";
	}

	// 로그인 페이지 이동
	@GetMapping("/login")
	public String loginPage() {
		return "auth/login";
	}

	// 회원가입
	@PostMapping("/join")
	public String join(@ModelAttribute UsersVO userVO, HttpServletRequest request, Model model)
			throws UnsupportedEncodingException {

		log.debug("userVO {}", userVO);

		if (userServiceImpl.join(userVO) > 0) {
			return "redirect:/auth/login";
		}
		// 회원가입 실패시 예외처리
		return "auth/membership";
	}

	@PostMapping(value = "/idCheck")
	@ResponseBody
	public int idCheck(String username) {
		
		int result = userServiceImpl.idCheck(username);

		log.debug("username : ", "username");
		
		return userServiceImpl.idCheck(username);
	}
	
	@PostMapping(value = "/emailCheck")
	@ResponseBody
	public int emailCheck(String email) {
		int result = userServiceImpl.emailCheck(email);
		return userServiceImpl.emailCheck(email);
	}
	

}
