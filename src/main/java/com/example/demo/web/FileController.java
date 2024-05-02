package com.example.demo.web;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.file.FileServiceImpl;
import com.example.demo.vo.UploadFileVO;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class FileController {
	
	private final FileServiceImpl fileServiceImpl;
	
	@GetMapping("/board/{boardId}/files")
	public List<UploadFileVO> findAllFileByBoardId(@PathVariable final Long boardId){
		return fileServiceImpl.findAllFileByBoardId(boardId);
	}
}
