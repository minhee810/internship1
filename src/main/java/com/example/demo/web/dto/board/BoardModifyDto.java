package com.example.demo.web.dto.board;

import java.time.LocalDateTime;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BoardModifyDto {
	
	private Long boardId;
	private String title;
	private String content;
	private MultipartFile[] files; 
	private LocalDateTime modifiedDate;
	
	@Builder
	public BoardModifyDto(String title, String content, MultipartFile[] files) {
		super();
		
		this.title = title;
		this.content = content;
		this.files = files;
	}

	
}




