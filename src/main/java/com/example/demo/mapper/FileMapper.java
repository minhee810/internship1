package com.example.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.vo.UploadFileVO;

@Mapper
public interface FileMapper {
	/**
	 * 하나의 게시글에 해당하는 파일 리스트 조회 
	 * @param boardId
	 * @return
	 */
	UploadFileVO findAllByBoardId(Long boardId);

	/**
	 * 파일 리스트 조회 
	 * @param ids
	 * @return
	 */
	List<UploadFileVO> findAllByIds(List<Long> ids);
	
	/**
	 * 파일 삭제 
	 * @param ids
	 */
	void deleteAllByIds(List<Long> ids);
}
