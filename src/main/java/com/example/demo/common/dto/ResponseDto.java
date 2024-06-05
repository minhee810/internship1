package com.example.demo.common.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Getter
@Setter
public class ResponseDto<T> {

	private final Integer code;
	private final String msg;
	private final T data;
	
}
