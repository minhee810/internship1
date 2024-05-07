package com.example.demo.vo;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
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
	private Long commentId;
	private String content;
	private LocalDateTime createdDate;
	private LocalDateTime modifiedDate;
	private Long parentId;
	private int depth;
	private String isDeleted;
	private int orderNumber; 
	private Long writer; 
}
