package com.example.demo.vo;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class BoardVO {
	private Long boardId;
	private String title;
	private String content;
	private LocalDateTime createdDate;
	private LocalDateTime modifidDate;
	private String uploadFileUrl;
	private int commentCnt;

	// blur 처리하기
	private String isDeleted;
	private Long userId;
	
	private String username;

	@Builder
	public BoardVO(String title, String content, String uploadFileUrl, int commentCnt) {
		super();
		this.title = title;
		this.content = content;
		this.uploadFileUrl = uploadFileUrl;
		this.commentCnt = commentCnt;
	}

	
	
	
}
