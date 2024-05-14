package com.example.demo.service.board;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.demo.vo.BoardVO;
import com.example.demo.web.dto.board.BoardListDto;

public interface BoardService {

	/* 게시글 목록 조회 */
	public Page<BoardVO> getBoardList(Pageable pageable);

	int insertBoard(BoardListDto board) throws Exception;
	
	BoardVO getDetail(Long boardId);
	
	int deleteBoard(Long boardId);

	/**
	 * 게시글 수정 기능
	 * @param deletedFilesId 
	 * @param boardId 
	 */
	int modifyBoard(Long boardId, BoardListDto dto, List<Long> deletedFilesId) throws Exception;


}
