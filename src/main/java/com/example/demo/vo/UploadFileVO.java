package com.example.demo.vo;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@NoArgsConstructor
public class UploadFileVO {
	
	private Long boardId;

	private Long uploadFileId;
	private String orgFileName;
	private String saveFileName;
	private String savePath;
	private Long fileSize;
	private String isDeleted;

	@Builder
	public UploadFileVO(Long boardId, Long uploadFileId, String orgFileName, String saveFileName, String savePath, Long fileSize) {

		this.boardId = boardId;
		this.uploadFileId = uploadFileId;
		this.orgFileName = orgFileName;
		this.saveFileName = saveFileName;
		this.savePath = savePath;
		this.fileSize = fileSize;
	}

}
