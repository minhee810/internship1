package com.example.demo.service.board;

import java.util.List;

import com.example.demo.vo.BoardVO;
import com.example.demo.web.dto.board.BoardListDto;

public interface BoardService {

	/* 게시글 목록 조회 */
	public List<BoardVO> getBoardList();

	int insertBoard(BoardListDto board) throws Exception;
	
	BoardVO getDetail(Long boardId);
	
	int deleteBoard(Long boardId);

	/**
	 * 게시글 수정 기능
	 * @param deletedFilesId 
	 * @param boardId 
	 */
	int modifyBoard(Long boardId, BoardListDto dto, List<Long> deletedFilesId) throws Exception;

	// 첨부파일 업로드
//	public int insertFile(UploadFileVO fileVO) throws Exception;

}
