package com.example.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.vo.BoardVO;
import com.example.demo.web.dto.board.BoardListDto;

@Mapper
public interface BoardMapper {

	public List<BoardVO> getBoardList();

	public int insertBoard(BoardListDto board);
	
	public List<BoardVO> getDetail(Long boardId);
}
