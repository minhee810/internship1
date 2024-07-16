package com.example.demo.board.vo;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class BoardVO2 {
	private Long boardId;
	private String title;
	private String content;
	private String createdDate;
	private String modifidDate;
	private String uploadFileUrl;
	private int commentCnt;
	private String isDeleted;
	private Long writer;
	private String username;
	private MultipartFile[] files;
	
	private int startBlockPage; 
	private int endBlockPage;
	


}
