package com.example.demo.users.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.users.dto.JoinDto;
import com.example.demo.users.dto.LoginDto;

@Mapper
public interface UserMapper {

	// 회원가입 : 수행된 쿼리의 개수를 반환
	public int join(JoinDto joinDto);

	public int idCheck(String username);

	public int emailCheck(String email);

	public LoginDto getLoginUser(String email);

	public String findPassword(String email);

	public int getListCount();
	
}
