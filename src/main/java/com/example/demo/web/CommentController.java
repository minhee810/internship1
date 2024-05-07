package com.example.demo.web;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.service.comment.CommentServiceImpl;
import com.example.demo.vo.CommentsVO;
import com.example.demo.web.dto.ResponseDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
@Slf4j
@Controller
@RequiredArgsConstructor
public class CommentController {
	
	private final CommentServiceImpl commentServiceImpl;
	
	/**
	 * 댓글 불러오기
	 * @return
	 */
	@GetMapping("/comment")
	public ResponseEntity<?> getCommentList(@RequestParam("boardId") Long boardId){
		log.info("getCommentList()");
		
		List<CommentsVO> commentList = commentServiceImpl.getCommentList(boardId);
		log.info("commentList = {}", commentList);
		return new ResponseEntity<>(new ResponseDto<>(1, "댓글 불러오기 성공", commentList), HttpStatus.OK);
	}

	/**
	 * 댓글 작성하기 
	 */
	@PostMapping("/comment")
	public ResponseEntity<?> saveComment(CommentsVO commentVO){
		log.info("saveComment"); 
		CommentsVO savedComment = commentServiceImpl.saveComment(commentVO);
		log.info("savedComment = {}", savedComment);
		return new ResponseEntity<>(new ResponseDto<>(1, "댓글 작성 성공", savedComment), HttpStatus.CREATED);
	}
}
