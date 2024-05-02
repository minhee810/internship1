package com.example.demo.service.file;

import java.util.List;

import com.example.demo.mapper.FileMapper;
import com.example.demo.vo.UploadFileVO;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class FileServiceImpl implements FileService{

	private final FileMapper fileMapper;
	
	@Override
	public List<UploadFileVO> findAllFileByBoardId(Long boardId) {
		
		return fileMapper.findAllByBoardId(boardId);
	}

	@Override
	public List<UploadFileVO> findAllByIds(List<Long> ids) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteAllByIds(List<Long> ids) {
		// TODO Auto-generated method stub
		
	}

	

}
