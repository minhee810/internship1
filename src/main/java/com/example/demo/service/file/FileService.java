package com.example.demo.service.file;

import java.util.List;

import com.example.demo.vo.UploadFileVO;


public interface FileService {
	

	UploadFileVO findAllFileByBoardId(Long boardId);


	List<UploadFileVO> findAllByIds(List<Long> ids);


	void deleteAllByIds(List<Long> ids);
	
}
