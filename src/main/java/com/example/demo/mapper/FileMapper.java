package com.example.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.vo.UploadFileVO;

@Mapper
public interface FileMapper {
	

	// 첨부파일 업로드
	int insertFile(UploadFileVO fileVO) throws Exception;
	
	
	int deleteFile(Long boardId);
	
	/**
	 * 하나의 게시글에 해당하는 파일 리스트 조회 
	 * @param boardId
	 * @return
	 */
	List<UploadFileVO> findAllByBoardId(Long boardId);

	
	/**
	 * 삭제할 파일 리스트 조회
	 * @param ids
	 */
	void deleteAllByIds(List<Long> ids);
	

	String selectFileNameByIds(Long ids);

	// boardId로 fileId 
	List<Long> getFileIdByBoardId(Long boardId);
}



