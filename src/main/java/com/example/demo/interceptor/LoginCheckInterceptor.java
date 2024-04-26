package com.example.demo.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;

import com.example.demo.web.SessionConst;

public class LoginCheckInterceptor implements HandlerInterceptor {

//	@Override
//	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
//			throws Exception {
//		
//		// 1. 세션에서 회원 정보 조회
//		HttpSession session = request.getSession();
//		session.getAttribute(SessionConst.LOGIN_USER);
//
//		if (session.getAttribute(SessionConst.LOGIN_USER) == null) {
//			response.sendRedirect("/auth/login");
//			return false;
//		}
//
//		return HandlerInterceptor.super.preHandle(request, response, handler);
//	}

}
