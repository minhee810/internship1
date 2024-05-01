package com.example.demo.service.board;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.mapper.BoardMapper;
import com.example.demo.vo.BoardVO;
import com.example.demo.web.dto.board.BoardListDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

	private final BoardMapper boardMapper;

	@Override
	 public List<BoardVO> getBoardList() {
		log.info("boardMapper.getBoardList() = {} " ,boardMapper.getBoardList());
		
		// localDateTime --> date
		return boardMapper.getBoardList();
		
		
	}
	
	@Override
	public int insertBoard(BoardListDto board) throws Exception {	
		return boardMapper.insertBoard(board);
	}

	
	@Override
	public List<BoardVO> getDetail(Long boardId) {
		log.info("boardServiceImpl -> getDetail() = {} ", boardMapper.getDetail(boardId));
		return boardMapper.getDetail(boardId);
	}
	

}
