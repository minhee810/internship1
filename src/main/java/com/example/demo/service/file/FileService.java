package com.example.demo.service.file;

import java.io.UnsupportedEncodingException;
import java.util.List;

import com.example.demo.vo.UploadFileVO;

public interface FileService {

	public List<UploadFileVO> findAllFileByBoardId(Long boardId);

	public void deleteAllByIds(List<Long> ids);

	public boolean deleteFile(Long boardId, List<Long> deletedFilesId) throws UnsupportedEncodingException;

	public List<Long> getFileIdByBoardId(Long boardId);
}
