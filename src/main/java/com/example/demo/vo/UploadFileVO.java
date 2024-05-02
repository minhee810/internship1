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

	private Long uploadFileId;
	private String orgFileName;
	private String saveFileName;
	private String savePath;
	private Long fileSize;
	private String createdDate;
	private String modifiedDate;
	private String isDeleted;

	private Long boardId;

	@Builder
	public UploadFileVO(Long uploadFileId, String orgFileName, String saveFileName, String savePath, Long fileSize,
			Long boardId) {

		this.uploadFileId = uploadFileId;
		this.orgFileName = orgFileName;
		this.saveFileName = saveFileName;
		this.savePath = savePath;
		this.fileSize = fileSize;
		this.boardId = boardId;
	}

}
