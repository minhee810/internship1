package com.example.demo.service.file;

import java.util.List;

import com.example.demo.vo.UploadFileVO;

public interface FileService {
	
	/**
	 * 하나의 게시글에 해당하는 파일 리스트 조회
	 * 
	 * @param boardId
	 * @return
	 */
	List<UploadFileVO> findAllFileByBoardId(Long boardId);

	/**
	 * 파일 리스트 조회
	 * 
	 * @param ids
	 * @return
	 */
	List<UploadFileVO> findAllByIds(List<Long> ids);

	/**
	 * 파일 삭제
	 * 
	 * @param ids
	 */
	void deleteAllByIds(List<Long> ids);
}
