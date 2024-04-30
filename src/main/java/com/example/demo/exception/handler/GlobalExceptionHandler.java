package com.example.demo.exception.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.demo.exception.CustomException;
import com.example.demo.web.dto.ResponseDto;

import lombok.extern.slf4j.Slf4j;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

	@ExceptionHandler(CustomException.class)
	public ResponseEntity<?> userNotFoundException(CustomException e) {
		
		log.error(e.getMsg());
		
		return new ResponseEntity<>(new ResponseDto(-1, e.getMsg(), null), HttpStatus.BAD_REQUEST);
	}
}
