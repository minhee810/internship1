package com.example.demo.web.dto.board;

import java.time.LocalDateTime;

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
	private String uploadFileUrl;
	private int commentCnt;
	
	// UserVO 타입으로 해야하는지 고민이 됨.
	private Long userId;
	
	@Builder
	public BoardListDto(String title, String content, String uploadFileUrl, int commentCnt, Long userId) {
		super();
		this.title = title;
		this.content = content;
		this.uploadFileUrl = uploadFileUrl;
		this.commentCnt = commentCnt;
		this.userId = userId;
	}

}
