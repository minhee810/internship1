package com.example.demo.service.board;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.mapper.BoardMapper;
import com.example.demo.mapper.FileMapper;
import com.example.demo.service.file.FileManager;
import com.example.demo.service.file.FileServiceImpl;
import com.example.demo.vo.BoardVO;
import com.example.demo.vo.UploadFileVO;
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

	@Override
	public List<BoardVO> getBoardList() {
		return boardMapper.getBoardList();
	}

	@Override
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

		saveFiles(board, boardFolderPath);
		
		return result;
	}

	private void saveFiles(BoardListDto board, String boardFolderPath) throws Exception {
		File file = new File(boardFolderPath);
 
		log.info("board = {}", board);
		
		// 경로가 없을 경우 파일을 생성
		if (!file.exists()) {
			file.mkdirs();
		}

		for (MultipartFile f : board.getFiles()) {

			if (!f.isEmpty()) {

				log.info("file => {}", f.getOriginalFilename());
				
				// HDD SAVE
				String fileName = fileManager.saveFile(f, boardFolderPath);
 
				// DB SAVE
				UploadFileVO uploadFileVO = UploadFileVO.builder()
						.orgFileName(f.getOriginalFilename())
						.saveFileName(fileName)
						.savePath(boardFolderPath)
						.fileSize(f.getSize())
						.boardId(board.getBoardId())
						.build();

				log.info("uploadFileVO = {}", uploadFileVO);
				
				// file 정보를 db 에 insert
				int result = fileMapper.insertFile(uploadFileVO);
				log.info("result = {}",result);
			}
		}
		
	}

	@Override
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
		saveFiles(dto, boardFolderPath);
		
		return boardResult;
	}

	@Override
	public int deleteBoard(Long boardId) {
		log.info("ServiceImpl -> boardId = {}", boardId);
		int result = boardMapper.deleteBoard(boardId);
		log.info("deleteBoard service result ={}", result);
		return result;
	}

	
	
}
