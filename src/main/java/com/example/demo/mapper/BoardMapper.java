package com.example.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.service.utils.RequestList;
import com.example.demo.vo.BoardVO;
import com.example.demo.web.dto.board.BoardListDto;

@Mapper
public interface BoardMapper {

	// pagenation
	public List<BoardVO> getBoardList(RequestList<?> requestList);

	public int getListBoardCount();
	
	public int insertBoard(BoardListDto board);
	
	public BoardVO getDetail(Long boardId);
	
	public int modifyBoard(BoardListDto board);

	public int deleteBoard(Long boardId);

	public int updateCommentCnt(Long boardId, int count); // map으로 받아와야 하나
	
	
}
