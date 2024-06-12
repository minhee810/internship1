package com.example.demo.file.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.common.dto.ResponseDto;
import com.example.demo.common.exception.CustomException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ApiFileController {

	/**
	 * 파일 저장 경로
	 */
	@Value("${file.path}")
	private String path;

	/**
	 * 파일 다운로드
	 * 
	 * @param boardId
	 * @param saveFileName
	 * @param orgFileName
	 * @param response
	 */
	@GetMapping("/api/fileDownload/{boardId}/{saveFileName}/{orgFileName}")
	public ResponseEntity<?> fileDownload(@PathVariable String boardId, @PathVariable String saveFileName,
			@PathVariable String orgFileName, HttpServletResponse response) {
		log.info("api fileDownload 로직 실행");

		try {
			// 게시글 별로 폴더를 생성하여 파일을 따로 저장해줬으므로 @PathVariable 로 받아온 게시글의 id(폴더 이름), 저장된 파일 이름을
			// 더해서 저장 경로를 수정한다.
			String folderPath = path + "/" + boardId;
			log.info("folderPath = {}", folderPath);
			
			// 저장 경로와 불러올 파일의 이름을 파라미터로 넘겨 파일을 찾아온다.
			File f = new File(folderPath, saveFileName);
			log.info("saveFileName = {}", saveFileName);
			log.info("f = {}", f);
			
			
			if(!f.exists()) {
				log.info("파일을 찾을 수 없음.");
				return new ResponseEntity<>(new ResponseDto<>(-1, "파일을 찾을 수 없습니다.", null), HttpStatus.NOT_FOUND);
			}
			
			String fileName = URLEncoder.encode(orgFileName, "UTF-8");
			log.info("fileName = {}", fileName);

			// 파일 입력 객체 생성
			FileInputStream fis = new FileInputStream(f);
			
			// 응답 헤더 설정 
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_OCTET_STREAM); // 파일 데이터를 바이너리 스트림으로 전송함을 나타냄. 
			headers.setContentDispositionFormData("attachment", fileName); // 파일 다운로드 대화상자가 뜨도록 설정 
			
			// inputStreamResource 를 생성하여 파일 데이터를 응답으로 반환 
			// 파일 데이터를 응답 본문으로 설정
			InputStreamResource resource = new InputStreamResource(fis);
			
			return new ResponseEntity<>(resource, headers, HttpStatus.OK);
			
		} catch (IOException e) {
			throw new CustomException(-1, "IOException 발생");
		}

	}

}
