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
		.order(1)
		.addPathPatterns("/**")
		.excludePathPatterns("/", "/member/**", "/css/**", "/*.ico", "/error**", "/resources/**", "/board/detail/**",
				"/comment/**");

	}

}
