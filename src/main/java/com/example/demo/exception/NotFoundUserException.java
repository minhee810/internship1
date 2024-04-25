package com.example.demo.exception;

public class NotFoundUserException extends RuntimeException{
	

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	int code; 
	String msg;
	
	public NotFoundUserException(int code, String msg) {
		super();
		this.code = code;
		this.msg = msg;
	} 
	
}
