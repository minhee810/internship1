package com.example.demo.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.domain.UsersVO;
import com.example.demo.dto.JoinDto;

@Mapper
public interface UserMapper {

	// 회원가입 : 수행된 쿼리의 개수를 반환
	public int join(UsersVO userVO);

	public int idCheck(String username);

	public int emailCheck(String email);

}
