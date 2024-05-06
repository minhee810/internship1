package com.example.demo.service.file;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.demo.mapper.FileMapper;
import com.example.demo.vo.UploadFileVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

	@Value("${file.path}")
	private String path;

	private final FileMapper fileMapper;

	@Override
	public List<UploadFileVO> findAllFileByBoardId(Long boardId) {
		List<UploadFileVO> files = fileMapper.findAllByBoardId(boardId);
		log.info("files = {}", files);
		return fileMapper.findAllByBoardId(boardId);
	}

	@Override
	public void deleteAllByIds(List<Long> ids) {
		log.info("[deleteAllByIds]");

		if (ids == null || ids.isEmpty()) {
			log.info("ids 가 null 입니다. ");
			return;
		}
		fileMapper.deleteAllByIds(ids);
	}

	/**
	 * 파일 삭제
	 */
	@Override
	public boolean deleteFile(Long boardId, List<Long> deletedFilesId) throws UnsupportedEncodingException {
		// 경로 지정

		// 파일 이름을 알아와야 한다.

		// 파일 경로와 이름으로 해당 파일을 찾아서 삭제 로직 수행.

		// 동시에 파일 이름 디코딩을 실시해서 문제 없이 삭제할 수 잇도록 구현.
		String projectPath = path + "/" + boardId;
		boolean allDeleted = true;

		log.info("deleteFile 지우러 왔습니다. ");
		
		if (deletedFilesId == null || deletedFilesId.isEmpty()) {
			log.info("deletedFilesId 가 null 입니다. ");
			return false;
		}

		for (Long fileId : deletedFilesId) {

			String fileName = fileMapper.selectFileNameByIds(fileId);

			log.info("fileName = {}", fileName);

			if (fileName != null) {

				try {
					String decodedFileName = URLDecoder.decode(fileName, "UTF-8");
					File file = new File(projectPath + File.separator + decodedFileName);
					if (file.exists()) {
						if (!file.delete()) {
							allDeleted = false; // 파일 삭제에 실패한 경우
						}
					}
				} catch (UnsupportedEncodingException e) {
					e.printStackTrace();
					allDeleted = false; // 파일 디코딩에 실패한 경우
				}
			} else {
				allDeleted = false; // 파일 이름을 찾을 수 없는 경우
			}
		}
		return allDeleted;

	}

}
