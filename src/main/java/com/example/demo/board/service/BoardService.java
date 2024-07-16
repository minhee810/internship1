package com.example.demo.board.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.demo.board.dto.BoardListDto;
import com.example.demo.board.vo.BoardVO;
import com.example.demo.board.vo.BoardVO2;

public interface BoardService {

	/* 게시글 목록 조회 */
	public Page<BoardVO> getBoardList(Pageable pageable);

	int insertBoard(BoardListDto board) throws Exception;
	
	BoardVO getDetail(Long boardId);
	
	int deleteBoard(Long boardId);

	int modifyBoard(Long boardId, BoardListDto dto, List<Long> deletedFilesId) throws Exception;
	
	List<BoardVO2> getAllListForJasper();

}
