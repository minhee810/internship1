package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class BasicController {

	// 추후에 로그인한 사용자만 접근 가능하도록 처리하기 
	@GetMapping("/")
	public String sample() {
		return "auth/login";
	}

	@GetMapping("/errorPage")
	public String errorPage() {
		return "errorPage";
	}

	@GetMapping("/mainPage")
	public String mainPage() {
		return "main";
	}

	@GetMapping("/board-detail")
	public String boardDetail() {
		return "boardDetail";
	}

	@GetMapping("/board-modify")
	public String boardModify() {
		return "boardModify";
	}

}
