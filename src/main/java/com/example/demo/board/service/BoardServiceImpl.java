package com.example.demo.board.service;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.board.dto.BoardListDto;
import com.example.demo.board.dto.RequestList;
import com.example.demo.board.mapper.BoardMapper;
import com.example.demo.board.vo.BoardVO;
import com.example.demo.board.vo.BoardVO2;
import com.example.demo.comment.service.CommentService;
import com.example.demo.file.service.FileManager;
import com.example.demo.file.service.FileService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

	private final FileService fileService;
	private final FileManager fileManager;
	private final BoardMapper boardMapper;
	private final CommentService commentService;

	@Value("${file.path}")
	private String path;

	/**
	 * 게시글 목록 조회
	 */
	@Override
	@Transactional
	public Page<BoardVO> getBoardList(Pageable pageable) {

		// builder 패컨으로 data, pageable 파라미터에 데이터 주입
		RequestList<?> requestList = RequestList.builder().data(null).pageable(pageable).build();

		List<BoardVO> content = boardMapper.getBoardList(requestList);
		// log.info("requestList = {} ", requestList);

		int total = boardMapper.getListBoardCount();

		log.info("데이터 총 개수 total = {}", total);
		log.info("content = {}", content);
		log.info("pageable = {}", pageable);
		
		System.out.println("offset = " + pageable.getOffset() + ", pageSize = " + pageable.getPageSize());

		return new PageImpl<BoardVO>(content, pageable, total);
	}

	/**
	 * 게시글 저장
	 */
	@Override
	@Transactional
	public int insertBoard(BoardListDto dto) throws Exception {

		log.info("serviceImpl dto = {}", dto);

		// board title, content save 
		int result = boardMapper.insertBoard(dto);

		log.info("board.getBoardId() = {}", dto.getBoardId());
		log.info("board dto = {}", dto);

		String boardFolderPath = fileManager.createFolder(path, dto.getBoardId());

		// file save
		if(dto.getFiles() != null) {
			fileManager.saveFiles(dto, boardFolderPath);
		}

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
	 * 
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
		fileService.deleteAllByIds(deletedFilesId);

		// 서버에서 해당 파일 삭제 -> 물리 삭제
		Boolean result = fileService.deleteFile(boardId, deletedFilesId);
		
		log.info("파일 삭제 결과 : result = {}", result);
		dto.setBoardId(boardId);
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
	 * 
	 * @throws UnsupportedEncodingException
	 */
	@Override
	@Transactional
	public int deleteBoard(Long boardId) {

		// 1. 게시글 삭제 (blur 처리)
		int result = boardMapper.deleteBoard(boardId);
		List<Long> id = new ArrayList<>();
		id.add(boardId);

		// 2. 파일 삭제 (blur 처리) : null 값 처리를 위해 service 로직 호출
		fileService.deleteAllByIds(id);

		// 3. 파일 서버 폴더에서 물리 삭제
		String projectPath = path + "/" + boardId;
		fileService.deleteFolder(projectPath);

		// 4. 관련 댓글 삭제 처리
		commentService.commentDeleteAll(boardId);

		log.info("deleteBoard service result ={}", result);

		return result;
	}

	@Override
	public List<BoardVO2> getAllListForJasper() {
		List<BoardVO2> content = boardMapper.getAllListForJasper();
		log.info("forJasper content = {}", content); 
		return content;
	}

}
