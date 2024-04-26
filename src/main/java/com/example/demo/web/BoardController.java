package com.example.demo.web;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BoardController {

	@GetMapping("/")
	public String mainPage(HttpServletRequest request) {
		return "/board/main";
	}

}
