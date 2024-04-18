package com.example.demo.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.domain.UsersVO;
import com.example.demo.service.UserService;

import lombok.extern.slf4j.Slf4j;

@RequestMapping("/auth")
@Controller
@Slf4j
public class UsersController {
	
	private final Logger log = LoggerFactory.getLogger(UsersController.class);
	
	@Autowired
	UserService userService; 

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
	public String join(@ModelAttribute UsersVO userVO, HttpServletRequest request, Model model) {
		log.debug("userVO {}", userVO);
		System.out.println(userVO.toString());
		System.out.println(userVO);
		HttpSession session = request.getSession();
		
		if(userService.join(userVO) > 0) {
			return "auth/login";
		}
		// 회원가입 실패시 예외처리
		return "auth/membership";
	}
}
