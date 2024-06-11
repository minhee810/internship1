package com.example.demo.config;

import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.demo.interceptor.LoginCheckInterceptor;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {


	@Override
	public void addInterceptors(InterceptorRegistry registry) {

		registry.addInterceptor(new LoginCheckInterceptor())
		.order(1).addPathPatterns()
		.excludePathPatterns("/", "/board", "/detail/**",
				"/users/**", "/member/**", "/css/**", "/*.ico", "/error**", "/resources/**", "/board/detail/**",
				"/member/join", "/comment/**", "/join", "/login", "/logout");
	}

	
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 모든 경로에 대해 모든 HTTP 메서드에 대한 CORS를 허용
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:8081", "http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true) // 이 부분 추가 -> 인증 정보 교환시 필수 설정
                .exposedHeaders("Set-Cookie")
                .allowedHeaders("*");
    }
    
}
