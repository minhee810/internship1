package com.example.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.demo.interceptor.LoginCheckInterceptor;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		
		registry.addInterceptor(new LoginCheckInterceptor())
		
		
		// 모든 페이지 접근 시 preHandle 작동 
		// excludePathPatterns()를 이용해서 로그인 페이지, 로그아웃 페이지 URI는 인터셉터 실행에서 제외 
		
		// 필터링 할 URL 패턴 
		.addPathPatterns("")
		.excludePathPatterns("/log*","/", "/board/main");
	}
	
	

}
