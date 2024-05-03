package com.example.demo.service.board;

import java.util.List;
import java.util.Map;

import com.example.demo.vo.BoardVO;
import com.example.demo.vo.UploadFileVO;
import com.example.demo.web.dto.board.BoardListDto;

public interface BoardService {

	/* 게시글 목록 조회 */
	public List<BoardVO> getBoardList();

	int insertBoard(BoardListDto board) throws Exception;
	
	BoardVO getDetail(Long boardId);
	
	public int modifyBoard(BoardVO board);
	
	public int deleteBoard(Long boardId);
	
	// 첨부파일 업로드
	public int insertFile(UploadFileVO fileVO) throws Exception;

}
