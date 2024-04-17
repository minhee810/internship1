package com.example.demo.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.domain.Users;

@Mapper
public interface UserMapper {


	// 회원가입 
	public int join(Users user);
	
}

