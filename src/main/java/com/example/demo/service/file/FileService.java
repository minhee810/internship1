package com.example.demo.service.file;

import java.io.UnsupportedEncodingException;
import java.util.List;

import com.example.demo.vo.UploadFileVO;

public interface FileService {

	List<UploadFileVO> findAllFileByBoardId(Long boardId);

	void deleteAllByIds(List<Long> ids);


	/**
	 * 파일 삭제
	 */
	boolean deleteFile(Long boardId, List<Long> deletedFilesId) throws UnsupportedEncodingException;

}
