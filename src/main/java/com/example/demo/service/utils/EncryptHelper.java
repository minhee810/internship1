package com.example.demo.service.utils;


public interface EncryptHelper {
	
	public String encrypt(String password);
	
	public boolean isMatch(String password, String hashed);
	
}
