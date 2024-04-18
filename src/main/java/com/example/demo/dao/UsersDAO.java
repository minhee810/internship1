package com.example.demo.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.UsersVO;

@Repository
public class UsersDAO {

	private SqlSession sqlSession;
	
	public static final String MAPPER = "com.example.demo.mapper";
	
	@Autowired
	public UsersDAO(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}
	
	public int join(UsersVO usersVO) {
		return sqlSession.insert(MAPPER+".UserMapper", usersVO);
	}
}
