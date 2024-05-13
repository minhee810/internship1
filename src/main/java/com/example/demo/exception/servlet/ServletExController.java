package com.example.demo.exception.servlet;

import java.io.IOException;

import javax.management.RuntimeErrorException;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class ServletExController {

	@GetMapping("/error-ex")
	public void errorEx() {
		throw new RuntimeException("예외가 발생했습니다.");
	}

	@GetMapping("/error-404")
	public void error404(HttpServletResponse response) throws IOException {
		response.sendError(404, "404오류가 발생했습니다.");
	}
	
	@GetMapping("/error-500")
	public void error500(HttpServletResponse response) throws IOException{
		response.sendError(500);
	}
	
}

