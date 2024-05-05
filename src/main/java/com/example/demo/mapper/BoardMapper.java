package com.example.demo.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.vo.BoardVO;
import com.example.demo.vo.UploadFileVO;
import com.example.demo.web.dto.board.BoardListDto;

@Mapper
public interface BoardMapper {

	public List<BoardVO> getBoardList();

	public int insertBoard(BoardListDto board);
	
	public BoardVO getDetail(Long boardId);
	
	public int modifyBoard(BoardVO board);

	public int deleteBoard(Long boardId);
	
}
