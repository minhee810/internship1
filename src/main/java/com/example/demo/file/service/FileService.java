package com.example.demo.file.service;

import java.io.UnsupportedEncodingException;
import java.util.List;

import com.example.demo.file.vo.UploadFileVO;

public interface FileService {

	public List<UploadFileVO> findAllFileByBoardId(Long boardId);

	public void deleteAllByIds(List<Long> ids);

	public boolean deleteFile(Long boardId, List<Long> deletedFilesId) throws UnsupportedEncodingException;

	public List<Long> getFileIdByBoardId(Long boardId);
	
	public void deleteFolder(String path);
}
