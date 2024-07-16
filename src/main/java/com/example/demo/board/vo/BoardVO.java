package com.example.demo.board.vo;

import java.time.LocalDateTime;

import org.springframework.web.multipart.MultipartFile;

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
	private String isDeleted;
	private Long writer;
	private String username;
	private MultipartFile[] files;
	
	private int startBlockPage; 
	private int endBlockPage;
	

	@Builder
	public BoardVO(String title, String content, LocalDateTime modifidDate, MultipartFile[] files) {
		super();
		this.title = title;
		this.content = content;
		this.modifidDate = modifidDate;
		this.files = files;
	}

	@Builder
	public BoardVO(String title, String content, int commentCnt) {
		super();
		this.title = title;
		this.content = content;
		this.commentCnt = commentCnt;
	}

}
