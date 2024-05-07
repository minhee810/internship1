package com.example.demo.web.dto.board;

import java.time.LocalDateTime;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class BoardListDto {
	
	private Long boardId;
	private String title;
	private String content;
	private MultipartFile file; 
	private LocalDateTime createdDate;
	private LocalDateTime modifiedDate;
	
	private int commentCnt;
	
	// UserVO 타입으로 해야하는지 고민이 됨.
	private Long userId;
	private MultipartFile[] files;
	
	@Builder
	public BoardListDto(String title, MultipartFile[] files, LocalDateTime createdDate, LocalDateTime modifiedDate, String content, int commentCnt, Long userId) {
		super();
		this.title = title;
		this.files = files;
		this.createdDate = createdDate;
		this.modifiedDate = modifiedDate;
		this.content = content;
		this.commentCnt = commentCnt;
		this.userId = userId;
	}

}
