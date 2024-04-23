package com.example.demo.controller;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.dto.JoinDto;
import com.example.demo.dto.LoginDto;
import com.example.demo.service.auth.UserServiceImpl;

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

	// 회원가입
	@PostMapping("/join")
	public String join(@ModelAttribute JoinDto joinDto) throws UnsupportedEncodingException {

		if (userServiceImpl.join(joinDto) > 0) {
			return "redirect:/auth/login";
		}
		// 회원가입 실패시 예외처리
		return "auth/membership";
	}

	@PostMapping(value = "/idCheck")
	@ResponseBody
	public int idCheck(String username) {

		int result = userServiceImpl.idCheck(username);

		log.info("username ={} ", "username");
		log.info("result ={}", result);

		return userServiceImpl.idCheck(username);
	}

	@PostMapping("/emailCheck")
	@ResponseBody
	public int emailCheck(String email) {
		log.info("email = {}", email);

		int result = userServiceImpl.emailCheck(email);
		log.info("result ={}", result);

		return userServiceImpl.emailCheck(email);
	}

	@GetMapping("/login")
	@ResponseBody
	public LoginDto login(HttpServletRequest request) {

		String username = request.getParameter("username");
		String password = request.getParameter("password");

		LoginDto loginDto = userServiceImpl.login(username, password);
		Map<String,Object> result = new HashMap<String, Object>();
		
		if (loginDto != null) {
			HttpSession session = request.getSession();
			session.setAttribute("loginDto", loginDto);
			session.setMaxInactiveInterval(60 * 30);
			
			result.put("success", true);
		}else {
			result.put("success", false);
			
		}
		
		return loginDto;
	}
}
