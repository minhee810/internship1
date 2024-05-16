package com.example.demo.utils;


public interface EncryptHelper {
	
	public String encrypt(String password);
	
	public boolean isMatch(String password, String hashed);
	
}
