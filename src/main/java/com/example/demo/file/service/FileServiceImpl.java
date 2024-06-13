package com.example.demo.file.service;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.file.mapper.FileMapper;
import com.example.demo.file.vo.UploadFileVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

	@Value("${file.path}")
	private String path;

	private final FileMapper fileMapper;

	/**
	 * file 이름 조회
	 */
	@Transactional
	@Override
	public List<UploadFileVO> findAllFileByBoardId(Long boardId) {
		List<UploadFileVO> files = fileMapper.findAllByBoardId(boardId);
		log.info("files = {}", files);
		return fileMapper.findAllByBoardId(boardId);
	}

	/**
	 * 삭제할 파일 아이디 값 받아와서 삭제하는 메서드
	 */
	@Transactional
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
	 * 파일 물리 삭제
	 */
	@Override
	@Transactional
	public boolean deleteFile(Long boardId, List<Long> deletedFilesId) throws UnsupportedEncodingException {
		log.info("파일 삭제 로직 수행");

		// 경로 지정
		String projectPath = path + "/" + boardId;
		log.info("projectPath ={}", projectPath);
		boolean allDeleted = true;

		// 파일 이름을 알아와야 한다. 파일 이름 목록이 없을 경우 파일 삭제 하지 않고 return false;
		if (deletedFilesId == null || deletedFilesId.isEmpty()) {
			log.info("deletedFilesId 가 null 입니다. ");
			return false;
		}

		// 파일 경로와 이름으로 해당 파일을 찾아서 삭제 로직 수행.
		for (Long fileId : deletedFilesId) {

			String fileName = fileMapper.selectFileNameByIds(fileId);

			log.info("삭제할 파일 이름들 : fileName = {}", fileName);

			if (fileName != null) { // 파일 아이디에 해당하는 파일 이름이 존재할 경우

				try {
					// 동시에 파일 이름 디코딩을 실시해서 문제 없이 삭제할 수 잇도록 구현.
					String decodedFileName = URLDecoder.decode(fileName, "UTF-8");
					File file = new File(projectPath + File.separator + decodedFileName); // 운영체제 영향 없도록
					log.info("file = {}", file);
					// 파일 삭제
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
		// deleteFolder(projectPath);
		return allDeleted;
	}

	/**
	 * 폴더 삭제 
	 * 
	 * @param path
	 */
	@Transactional
	@Override
	public void deleteFolder(String path) {
		log.info("폴더 삭제 로직 수행");
		log.info("path = {}", path);
		
		File folder = new File(path);
		try {
			if (folder.exists()) {
				File[] folder_list = folder.listFiles(); // 파일리스트 얻어오기

				for (int i = 0; i < folder_list.length; i++) {
					if (folder_list[i].isFile()) {
						folder_list[i].delete();
						System.out.println("파일이 삭제되었습니다.");
					} else {
						deleteFolder(folder_list[i].getPath()); // 재귀함수호출
						System.out.println("폴더가 삭제되었습니다.");
					}
					folder_list[i].delete();
				}
				folder.delete(); // 폴더 삭제
			}
		} catch (Exception e) {
			e.getStackTrace();
		}
	}

	/**
	 * file id 조회
	 */
	@Override
	@Transactional
	public List<Long> getFileIdByBoardId(Long boardId) {
		List<Long> fileIds = fileMapper.getFileIdByBoardId(boardId);
		log.info("fileIds = {}", fileIds);
		return fileIds;
	}

}
