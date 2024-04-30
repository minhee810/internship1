package com.example.demo.service.board;

import java.util.List;

import com.example.demo.vo.BoardVO;
import com.example.demo.web.dto.board.BoardListDto;

public interface BoardService {

	/* 게시글 목록 조회 */
	public List<BoardVO> getBoardList();

	int insertBoard(BoardListDto board) throws Exception;
}
