package com.example.demo.file.service;

import java.io.File;
import java.util.UUID;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.board.dto.BoardListDto;
import com.example.demo.file.mapper.FileMapper;
import com.example.demo.file.vo.UploadFileVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class FileManager {

	private final FileMapper fileMapper;

	public String saveFile(MultipartFile multipartFile, String path) throws Exception {

		// 1. 중복되지 않는 파일명 생성
		String fileName = UUID.randomUUID().toString();

		// 2. 확장자
		StringBuffer buffer = new StringBuffer();

		buffer.append(fileName);
		buffer.append("_");
		buffer.append(multipartFile.getOriginalFilename());

		// 3. 새로운 파일 생성
		File newFile = new File(path, buffer.toString());

		multipartFile.transferTo(newFile);

		// fileName 리턴
		return buffer.toString();

	}

	// 파일 업로드 시 새로운 폴더 생성
	public String createFolder(String basePath, Long boardId) {
		String folderPath = basePath + "/" + boardId;
		File folder = new File(folderPath);
		if (!folder.exists()) {
			folder.mkdirs();
		}
		return folderPath;
	}

	public void saveFiles(BoardListDto board, String boardFolderPath) throws Exception {

		File file = new File(boardFolderPath);

		log.info("board = {}", board);

		// 경로가 없을 경우 파일을 생성
		if (!file.exists()) {
			file.mkdirs();
		}

		if (board.getFiles() != null) {
			for (MultipartFile f : board.getFiles()) {

				if (!f.isEmpty()) {

					log.info("file => {}", f.getOriginalFilename());

					// HDD SAVE
					String fileName = saveFile(f, boardFolderPath);

					// DB SAVE
					UploadFileVO uploadFileVO = UploadFileVO.builder().orgFileName(f.getOriginalFilename())
							.saveFileName(fileName).savePath(boardFolderPath).fileSize(f.getSize())
							.boardId(board.getBoardId()).build();

					log.info("uploadFileVO = {}", uploadFileVO);

					// file 정보를 db 에 insert
					int result = fileMapper.insertFile(uploadFileVO);
					log.info("result = {}", result);
				}
			}
		}

	}

}
