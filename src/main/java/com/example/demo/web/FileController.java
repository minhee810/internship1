package com.example.demo.web;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.exception.CustomException;
import com.example.demo.service.file.FileService;
import com.example.demo.vo.UploadFileVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class FileController {

	/**
	 * 파일 저장 경로
	 */
	@Value("${file.path}")
	private String path;

	private final FileService fileService;

	/**
	 * 게시글 아이디로 파일 리스트 불러오기
	 * 
	 * @param boardId
	 * @return
	 */
	@GetMapping("/board/files/{boardId}")
	public List<UploadFileVO> findAllFileByBoardId(@PathVariable final Long boardId) {
		return fileService.findAllFileByBoardId(boardId);
	}

	/**
	 * 파일 다운로드
	 * 
	 * @param boardId
	 * @param saveFileName
	 * @param orgFileName
	 * @param response
	 */
	@GetMapping("/fileDownload/{boardId}/{saveFileName}/{orgFileName}")
	public void fileDownload(@PathVariable String boardId, @PathVariable String saveFileName,
			@PathVariable String orgFileName, HttpServletResponse response) {

		try {
			// 게시글 별로 폴더를 생성하여 파일을 따로 저장해줬으므로 @PathVariable 로 받아온 게시글의 id(폴더 이름), 저장된 파일 이름을
			// 더해서 저장 경로를 수정한다.
			String folderPath = path + "/" + boardId;

			// 저장 경로와 불러올 파일의 이름을 파라미터로 넘겨 파일을 찾아온다.
			File f = new File(folderPath, saveFileName);

			log.info("folderPath = {}", folderPath);

			// file 다운로드 설정
			response.setContentType("application/download");
			response.setContentLength((int) f.length());

			String fileName = URLEncoder.encode(orgFileName, "UTF-8");

			response.setHeader("Content-disposition", String.format("attachment; filename=\"%s\";", fileName) + "\"");
			// response 객체를 통해서 서버로부터 파일 다운로드
			OutputStream os = response.getOutputStream();
			// 파일 입력 객체 생성
			FileInputStream fis = new FileInputStream(f);
			FileCopyUtils.copy(fis, os);
			fis.close();
			os.close();

		} catch (IOException e) {
			throw new CustomException(-1, "IOException 발생");
		}

	}

}
