package com.example.demo.service.file;

import java.io.File;
import java.util.UUID;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileManager {

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
	
	
}
