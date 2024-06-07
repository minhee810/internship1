package com.example.demo.users.controller;

import java.io.UnsupportedEncodingException;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
	public ResponseEntity<?> join(@RequestBody JoinDto joinDto) throws UnsupportedEncodingException {

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
	public ResponseEntity<?> idCheck(@PathVariable String username) {
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
	public ResponseEntity<?> login(@RequestBody LoginDto loginDto, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		// session 객체 생성 
		HttpSession session = request.getSession();
		
		// session 객체에 사용자 아이디 넣기 
		session.setAttribute(SessionConst.USER_ID, loginDto.getUserId());
		session.setAttribute(SessionConst.USER_EMAIL, loginDto.getEmail());
		
		// session id 추출
//		String sessionId = session.getId();
		
		// 일단 세션에 사용자의 아이디를 넣어서 세션 아이디를 쿠키에 넣어서 발급하기 
		Map<String, Object> userInfo = userSerivce.login(loginDto);

		if(userInfo.get("username") == null) {
			return new ResponseEntity<>(new ResponseDto<>(-1, "아이디 혹은 이메일이 실패하였습니다.", null), HttpStatus.NOT_FOUND);
		}
		
		// 로그인 성공 시 세션 아이디를 쿠키에 저장 
//		Cookie cookie = new Cookie("LS_SESSION_ID", sessionId);
//		cookie.setHttpOnly(true);
//		cookie.setPath("/");
//		
//		// 응답 시 session id 를 넣은 쿠키 전송
//		response.addCookie(cookie);
//		log.info("response = {}", response.toString());
//		log.info("cookie = {}", cookie.toString());
//		log.info("sessionId = {}", sessionId);
		return new ResponseEntity<>(new ResponseDto<>(1, "로그인이 되었습니다.", userInfo), HttpStatus.OK);
	}

	@GetMapping("/user")
	public ResponseEntity<?> getUserInfo(HttpServletRequest request) throws Exception{
		// 쿠키에 세션 정보가 있다면 request 에서 꺼내면 됨. 
		// 없다면 로그인 요청 시 넣어주고 
		// 다시 로드하는 거면 request 에서 아이디 뽑아서 쓰자 
	
		HttpSession session =  request.getSession(false);
		
		if(session == null) {
			log.info("sessionId 없음");
			return new ResponseEntity<>(new ResponseDto<>(-1, "세션이 만료 되었습니다.", null),HttpStatus.UNAUTHORIZED);
		}
		
		// 저장되어있는 세션에서 이메일 값 꺼내기 
		String userEmail = (String) session.getAttribute(SessionConst.USER_EMAIL);
		log.info("userEmail = {}", userEmail);
		LoginDto loginDto = userSerivce.getLoginUser(userEmail);
		log.info("loginUser = {}", loginDto);
		
		return new ResponseEntity<>(new ResponseDto<>(1, "로그인이 되었습니다.", loginDto),HttpStatus.OK);

	}
	
	@GetMapping("/logout")
	public ResponseEntity<?> logout(HttpSession session) throws Exception {
		log.info("session = {}", session.getAttribute(SessionConst.USER_ID));
		log.info("logout 로직 실행");
		session.invalidate();
		return new ResponseEntity<>(new ResponseDto<>(1, "로그아웃 되었습니다.", null),HttpStatus.OK);
	}
	
	@GetMapping("/myprofile")
	public String myprofile() {
		return "/users/profile";
	}
	
}
