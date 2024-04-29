package com.example.demo.web;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class BoardController {

	@GetMapping("/")
	public String mainPage(HttpServletRequest request) {
		return "/board/main";
	}
	
	@PostMapping("/")
	public String getBoardList(HttpServletRequest request) {
		
		return "/board/main";
	}

}
