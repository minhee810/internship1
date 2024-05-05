package com.example.demo.service.file;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.mapper.FileMapper;
import com.example.demo.vo.UploadFileVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
@Slf4j
@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService{

	private final FileMapper fileMapper;
	
	@Override
	public List<UploadFileVO> findAllFileByBoardId(Long boardId) {
		List<UploadFileVO> files = fileMapper.findAllByBoardId(boardId);
		log.info("files = {}", files);
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
