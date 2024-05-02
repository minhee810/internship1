package com.example.demo.service.board;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.mapper.BoardMapper;
import com.example.demo.vo.BoardVO;
import com.example.demo.vo.UploadFileVO;
import com.example.demo.web.dto.board.BoardListDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

	
	private final FileManager fileManager;

	private final BoardMapper boardMapper;

	@Value("${file.path}")
	private String path;

	@Override
	public List<BoardVO> getBoardList() {
		log.info("boardMapper.getBoardList() = {} ", boardMapper.getBoardList());

		// localDateTime --> date
		return boardMapper.getBoardList();

	}

	@Override
	public int insertBoard(BoardListDto dto) throws Exception {

		log.info("serviceImpl dto = {}", dto);
		
		BoardListDto board = BoardListDto.builder()
				.title(dto.getTitle())
				.content(dto.getContent())
				.files(dto.getFiles())
				.uploadFileUrl(dto.getUploadFileUrl())
				.commentCnt(dto.getCommentCnt())
				.userId(dto.getUserId()) // 로그인한																					// 이름 저장
				.build();

		log.info("serviceImple -> board = {}", board);
		
		int result = boardMapper.insertBoard(board);

		File file = new File(path);

		if (!file.exists()) {
			boolean check = file.mkdirs();
		}

		for (MultipartFile f : board.getFiles()) {
			if (!f.isEmpty()) {
				log.info("file => {}", f.getOriginalFilename());
				// HDD SAVE
				String fileName = fileManager.saveFile(f, path);

				// DB SAVE
				UploadFileVO uploadFileVO = UploadFileVO.builder()
						.orgFileName(f.getOriginalFilename())
						.saveFileName(fileName)
						.savePath(path + f)
						.fileSize(f.getSize())
						.boardId(dto.getBoardId())
						.build();
				log.info("** fileSize = {}", uploadFileVO.getFileSize() );
				
				boardMapper.insertFile(uploadFileVO);
			}
		}

		return result;
	}

	@Override
	public List<BoardVO> getDetail(Long boardId) {
		log.info("boardServiceImpl -> getDetail() = {} ", boardMapper.getDetail(boardId));
		return boardMapper.getDetail(boardId);
	}

	@Override
	public int modifyBoard(BoardVO board) {
		int result = boardMapper.modifyBoard(board);
		log.info("serviceImpL MODIFY");
		log.info("boardServiceImpl -> modifyBoard() = {}", result);
		return result;
	}

	@Override
	public int deleteBoard(Long boardId) {
		log.info("ServiceImpl -> boardId = {}", boardId);
		int result = boardMapper.deleteBoard(boardId);
		log.info("deleteBoard service result ={}", result);
		return result;
	}

	@Override
	public int insertFile(UploadFileVO fileVO) throws Exception {

		int result = boardMapper.insertFile(fileVO);
		return result;
	}

}
