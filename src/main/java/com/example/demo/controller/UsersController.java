package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.domain.Users;

import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequestMapping("/auth")
@Slf4j
public class UsersController {

	// 회원가입 페이지 이동 
 	@GetMapping("/join")
	public String joinPage() {
		return "/auth/membership";	
	}
	
	// 회원가입
	@PostMapping("/join")
	public String join(Users users) {
		return "/auth/membership";
	}
}
