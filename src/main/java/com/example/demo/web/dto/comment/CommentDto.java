package com.example.demo.web.dto.comment;

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
public class CommentDto {
	
	private Long commentId; // 댓글 번호
	private String commentContent; // 댓글 내용
	private Long parentId; // 부모 댓글의 아이디
	private int depth; // 깊이 = 레벨
	private String isDeleted; // 삭제 여부
	private Long writer; // 댓글 작성자
	private LocalDateTime createdDate;
	private LocalDateTime modifiedDate;
	

	// 추가 필드
	private Long boardId;
	private String username;
	private int principal; // 작성자와 로그인 사용자의 일치 정보
	private String parentUsername;
	
	
	@Builder // 댓글 작성 dto 생성자
	public CommentDto(Long commentId, String commentContent, Long parentId, int depth, Long writer,
			Long boardId) {
		super();
		this.commentId = commentId;
		this.commentContent = commentContent;
		this.parentId = parentId;
		this.depth = depth;
		this.writer = writer;
		this.boardId = boardId;
	}
	
	@Builder
	public CommentDto(Long commentId, String commentContent, Long writer) {
		super();
		this.commentId = commentId;
		this.commentContent = commentContent;
		this.writer = writer;
	}

}
