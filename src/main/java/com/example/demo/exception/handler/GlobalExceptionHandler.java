package com.example.demo.exception.handler;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.exception.ErrorResponse;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class GlobalExceptionHandler {

	@ResponseStatus
	@ExceptionHandler(IllegalArgumentException.class)
	public ErrorResponse illegalExHandle(IllegalArgumentException e) {
		log.error("exceptionHadle = {}", e);
		return new ErrorResponse("BAD", e.getMessage());
	}
	
}
