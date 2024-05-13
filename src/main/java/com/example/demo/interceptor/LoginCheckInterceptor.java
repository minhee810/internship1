package com.example.demo.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo.web.SessionConst;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class LoginCheckInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		log.info("[=====preHandle]=====");

		// 1. 세션에서 회원 정보 조회
		HttpSession session = request.getSession();
		Long id = (Long) session.getAttribute(SessionConst.USER_ID);

		log.info("id = {}", id);
		
		if (session == null|| id == null) {
			log.info("미인증 사용자의 요청");
			
			String urlPrior = request.getRequestURL().toString() + "?" + request.getQueryString();
			request.getSession().setAttribute("url_prior_login", urlPrior); // 직전 url 을 세션에 저장함. 
			
			response.sendRedirect(request.getContextPath() + "/login");
			
			return false; // 세션에 id 정보가 없을 경우 더이상 컨트롤러 요청 진입을 못하도록 return false 처리를 해줘야 함.
		}
		return true; // return true 시 컨트롤러 진입 후 요청 진행
	}

	// 컨트롤러 실행 후, 뷰 진입 전 
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		log.info("=====[postHandle]=====");
		
		HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
	}

	// 뷰 진행 후 
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		log.info("=====[afterCompletion]=====");
		HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
	}
	

}
