package com.example.demo.web;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.exception.CustomException;
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
	 * 
	 * @return
	 */
	@GetMapping("/comment")
	public ResponseEntity<?> getCommentList(@RequestParam("boardId") Long boardId, Model model) {
		log.info("getCommentList()");

		List<CommentsVO> commentList = commentServiceImpl.getCommentList(boardId);
		log.info("commentList = {}", commentList);
		
		model.addAttribute("commentList", commentList);
		
		return new ResponseEntity<>(new ResponseDto<>(1, "댓글 불러오기 성공", commentList), HttpStatus.OK);
	}
	

	/**
	 * 댓글 작성하기
	 */
	@PostMapping("/comment")
	public ResponseEntity<?> saveComment(CommentsVO commentVO, HttpSession session) {
		log.info("saveController");
		if (session.getAttribute(SessionConst.USER_ID) == null) {
			throw new CustomException(-1, "로그인하지 않은 사용자의 접근입니다.");
		}
		
		log.info("saveComment");
		
		commentVO.setUsername((String) session.getAttribute(SessionConst.USERNAME));
		
		log.info("username = {}", commentVO.getUsername());
		
		CommentsVO savedComment = commentServiceImpl.saveComment(commentVO);
		
		
		log.info("savedComment = {}", savedComment);
		return new ResponseEntity<>(new ResponseDto<>(1, "댓글 작성 성공", savedComment), HttpStatus.CREATED);
	}

	@PutMapping("/comment/delete/{commentId}")
	public ResponseEntity<?> delete(@PathVariable Long commentId) {
		log.info("commentId = {}", commentId);

		int result = commentServiceImpl.deleteComment(commentId);

		if (result > 0) {
			return new ResponseEntity<>(new ResponseDto<>(1, "댓글 삭제 성공", result), HttpStatus.OK);

		} else {
			return new ResponseEntity<>(new ResponseDto<>(-1, "댓글 삭제 실패", result), HttpStatus.OK);

		}

	}

	// 업데이트 시 성공한 행의 개수 반환 vs 삭제한 결과 0/1 반환
	@PutMapping("/comment")
	public ResponseEntity<?> update(@RequestBody CommentsVO commentsVO) {
		int result = commentServiceImpl.updateComment(commentsVO);

		if (result > 0) {
			return new ResponseEntity<>(new ResponseDto<>(1, "댓글 수정 성공", null), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(new ResponseDto<>(-1, "댓글 수정 실패", null), HttpStatus.OK);
		}

	}
}
