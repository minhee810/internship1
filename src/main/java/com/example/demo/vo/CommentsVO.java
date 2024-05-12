package com.example.demo.vo;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CommentsVO {
	private Long commentId; // 댓글 번호
 	private String commentContent; // 댓글 내용 
	private LocalDateTime createdDate; // 댓글 생성일 
	private LocalDateTime modifiedDate; // 댓글 수정일 
	private Long parentId; // 부모 댓글의 아이디 
	private int depth; // 깊이 = 레벨 
	private String isDeleted; // 삭제 여부 
	private Long writer;  // 댓글 작성자 
	
	// 추가 필드 
	private Long boardId;
	private String username;
	private int principal;  // 작성자와 로그인 사용자의 일치 정보
	
	@Builder
	public CommentsVO(Long commentId, String commentContent, LocalDateTime createdDate, LocalDateTime modifiedDate,
			Long parentId, int depth, String isDeleted, Long writer) {
		super();
		this.commentId = commentId;
		this.commentContent = commentContent;
		this.createdDate = createdDate;
		this.modifiedDate = modifiedDate;
		this.parentId = parentId;
		this.depth = depth;
		this.isDeleted = isDeleted;
		this.writer = writer;
	}


	
	
	
	
}
