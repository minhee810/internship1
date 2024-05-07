package com.example.demo.service.board;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.mapper.BoardMapper;
import com.example.demo.mapper.FileMapper;
import com.example.demo.service.file.FileManager;
import com.example.demo.service.file.FileServiceImpl;
import com.example.demo.service.utils.RequestList;
import com.example.demo.vo.BoardVO;
import com.example.demo.web.dto.board.BoardListDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

	private final FileServiceImpl fileServiceImpl;
	private final FileMapper fileMapper;
	
	private final FileManager fileManager;

	private final BoardMapper boardMapper;

	@Value("${file.path}")
	private String path;

	/**
	 * 게시글 목록 조회
	 */
	@Override
	@Transactional
	public Page<BoardVO> getBoardList(Pageable pageable) {
		
		// builder 패컨으로 data, pageable 파라미터에 데이터 주입
		RequestList<?> requestList = RequestList.builder()
				.data(null)
				.pageable(pageable)
				.build();
		
		List<BoardVO> content = boardMapper.getBoardList(requestList);
		int total = boardMapper.getListBoardCount();
		log.info("데이터 총 개수 total = {}", total);
		log.info("content = {}", content);
		log.info("pageable = {}", pageable);
		return new PageImpl<BoardVO>(content, pageable, total);
	}

	/**
	 * 게시글 저장
	 */
	@Override
	@Transactional
	public int insertBoard(BoardListDto dto) throws Exception {

		log.info("serviceImpl dto = {}", dto);

		BoardListDto board = BoardListDto.builder()
				.title(dto.getTitle())
				.content(dto.getContent())
				.files(dto.getFiles())
				.commentCnt(dto.getCommentCnt())
				.userId(dto.getUserId()) // 로그인한 // 이름 저장
				.build();
		
		// board 정보를 db 에 insert 
		int result = boardMapper.insertBoard(board);

		log.info("board.getBoardId() = {}", board.getBoardId());
		
		String boardFolderPath = fileManager.createFolder(path, board.getBoardId());

		fileManager.saveFiles(board, boardFolderPath);
		
		return result;
	}

	/**
	 * 게시글 상세보기
	 */
	@Override
	@Transactional
	public BoardVO getDetail(Long boardId) {
		log.info("boardServiceImpl -> getDetail() = {} ", boardMapper.getDetail(boardId));
		return boardMapper.getDetail(boardId);
	}

	/**
	 * 게시글 수정 기능
	 * @param deletedFilesId 
	 * @param boardId 
	 */
	@Override
	@Transactional
	public int modifyBoard(Long boardId, BoardListDto dto, List<Long> deletedFilesId) throws Exception {
		log.info("[boardId] = {}", boardId);
		
		log.info("dto = {}", dto);
		
		log.info("deletedFilesId = {}", deletedFilesId);
		
		// 삭제할 파일들 리스트 형태로 받아와서 삭제 -> 논리 삭제 진행
		fileServiceImpl.deleteAllByIds(deletedFilesId);

		// 서버에서 해당 파일 삭제 -> 물리 삭제 
		Boolean result = fileServiceImpl.deleteFile(boardId, deletedFilesId);
		
		log.info("파일 삭제 결과 : result = {}", result);
		// 게시글 정보 데이터베이스에 저장
		int boardResult = boardMapper.modifyBoard(dto);
		
		log.info("boardServiceImpl -> modifyBoard() = {}", boardResult);
		
		String boardFolderPath = fileManager.createFolder(path, boardId);
		
		// 다시 파일 저장 
		fileManager.saveFiles(dto, boardFolderPath);
		
		return boardResult;
	}

	/**
	 * 게시글 삭제 메서드
	 * @throws UnsupportedEncodingException 
	 */
	@Override
	@Transactional
	public int deleteBoard(Long boardId)  {
		
		// 1. 게시글 삭제 (blur 처리) 
		int result = boardMapper.deleteBoard(boardId);
		List<Long> id = new ArrayList<>();
		id.add(boardId);
		
		
		// 2. 파일 삭제 (blur 처리) : null 값 처리를 위해 service 로직 호출
		fileServiceImpl.deleteAllByIds(id);
				
		// 3. 파일 서버 폴더에서 물리 삭제 
		
		// 3-1. 삭제할 파일의 id구하기
		List<Long> fileId = fileMapper.getFileIdByBoardId(boardId);
				
		// 3-2. deleteFile() 메서드 호출하기
		try {
			Boolean delResult = fileServiceImpl.deleteFile(boardId, fileId);
			
			log.info("delResult  ={} ", delResult);
			
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		
		log.info("deleteBoard service result ={}", result);
	
		return result;
	}

	
	
}
