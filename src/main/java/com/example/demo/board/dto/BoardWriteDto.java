package com.example.demo.board.dto;

import java.time.LocalDateTime;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class BoardWriteDto {
	private Long boardId;
	private String title;
	private String content;
	private LocalDateTime createdDate;
	private LocalDateTime modifiedDate;
	private Long userId;
	private MultipartFile[] files;
}
