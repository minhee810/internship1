package com.example.demo.web;

import java.io.UnsupportedEncodingException;

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

import com.example.demo.service.auth.UserServiceImpl;
import com.example.demo.web.dto.auth.JoinDto;
import com.example.demo.web.dto.auth.LoginDto;

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
	public String join(@ModelAttribute JoinDto joinDto) throws UnsupportedEncodingException {

		if (userServiceImpl.join(joinDto) > 0) {

			log.info("joinDto = {} ", joinDto);

			return "redirect:/auth/login";
		}
		// 회원가입 실패시 예외처리
		return "auth/membership";
	}

	@PostMapping("/idCheck")
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

	
	
	/** 로그인 기능 **/
	@PostMapping("/login")
	public String login(LoginDto loginDto, HttpServletRequest request) throws Exception {
		
		log.info("loginDto = {}", loginDto);
		
		LoginDto savedUser = userServiceImpl.getLoginUser(loginDto);
		
		log.info("** savedUser = {}", savedUser);
		
		// 로그인 실패 
		if (savedUser == null) {
			
			return "board/main";
		}
		
		// 로그인 성공 
		// 세션이 있다면 세션 반환, 없으면 신규 생성 
		HttpSession session = request.getSession();
		
		session.setAttribute("loginUser", savedUser);
		
		return "board/main";
	}
	
	
	
	
	@PostMapping("/logout")
	public String logout(HttpServletRequest request) throws Exception{
			
		// 세션 삭제 
		HttpSession session = request.getSession(false); 
		
		if(session != null) {
			session.invalidate();
		}
		return "redirect:/board/main";
		
	}
}
