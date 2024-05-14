package com.example.demo.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MaxUploadSizeException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public MaxUploadSizeException(String msg) {
		super(msg);
	}

	public MaxUploadSizeException(String msg, Throwable cause) {
		super(msg, cause);
	}
}
