package com.example.demo.service.utils;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Base64;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

import org.springframework.stereotype.Component;

@Component
public class PasswordEncoder {

	// 같은 비밀번호를 사용하는 사용자들이 존재할 수 있어 password, email 값을 동시에 사용하여 암호화함
	public String encrypt(String email, String password) throws UnsupportedEncodingException {
		try {

			KeySpec spec = new PBEKeySpec(password.toCharArray(), getSalt(email), 85319, 256);

			SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");

			byte[] hash = factory.generateSecret(spec).getEncoded();

			return Base64.getEncoder().encodeToString(hash);

		} catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
			throw new RuntimeException(e);
		}
	}

	private byte[] getSalt(String password) throws NoSuchAlgorithmException {
		MessageDigest digest = MessageDigest.getInstance("SHA-512");
		byte[] keyBytes = password.getBytes();

		return digest.digest(keyBytes);
	}

}
