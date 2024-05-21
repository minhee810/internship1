package com.example.demo.comment.controller;

import java.util.List;
import java.util.Map;

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

import com.example.demo.comment.dto.CommentDto;
import com.example.demo.comment.service.CommentService;
import com.example.demo.comment.vo.CommentsVO;
import com.example.demo.common.dto.ResponseDto;
import com.example.demo.common.exception.CustomException;
import com.example.demo.users.consts.SessionConst;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
public class CommentController {

	private final CommentService commentService;

	/**
	 * 댓글 불러오기
	 * 
	 * @return
	 */
	@GetMapping("/comment")
	public ResponseEntity<?> getCommentList(@RequestParam("boardId") Long boardId, Model model, HttpSession session) {
		Long userId = (Long) session.getAttribute(SessionConst.USER_ID);

		log.info("userId = {}", userId);
		List<CommentsVO> commentList = commentService.getCommentList(boardId, userId);
		log.info("commentList = {}", commentList);
		return new ResponseEntity<>(new ResponseDto<>(1, "댓글 불러오기 성공", commentList), HttpStatus.OK);
	}

	// 댓글 작성
	@PostMapping("/comment")
	public ResponseEntity<?> saveComment(@RequestBody CommentDto dto, HttpSession session, Model model) {
		Long userId = (Long) session.getAttribute(SessionConst.USER_ID);
		if (userId == null) {
			throw new CustomException(-1, "로그인하지 않은 사용자의 접근입니다.");
		}
		dto.setWriter(userId);
		// 댓글 작성 시 boardService 호출 한 뒤 댓글 개수 +1 업데이트
		CommentDto saveComment = commentService.saveComment(dto);
		return new ResponseEntity<>(new ResponseDto<>(1, "댓글 작성 성공", saveComment), HttpStatus.CREATED);
	}

	// 댓글 삭제
	@PutMapping("/comment/delete/{commentId}")
	public ResponseEntity<?> delete(@PathVariable Long commentId, @RequestBody Map<String, Long> requestParam) {
		log.info("commentId = {}", commentId);
		log.info("requestParam = {}", requestParam);

		Long boardId = Long.valueOf(requestParam.get("boardId"));
		Long writer = Long.valueOf(requestParam.get("writer"));

		int result = commentService.deleteComment(commentId, boardId, writer);

		if (result > 0) {
			return new ResponseEntity<>(new ResponseDto<>(1, "댓글 삭제 성공", result), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(new ResponseDto<>(-99, "댓글 삭제 실패", result), HttpStatus.OK);

		}

	}

	// 업데이트 시 input 창에 기존의 데이터 출력
	@GetMapping("/comment/update/{boardId}/{commentId}")
	public String updatePage(Long boardId, Long commentId, Model model) {

		CommentDto comment = commentService.selectOne(boardId);
		model.addAttribute("comment", comment);
		return "/board/detail/" + boardId;
	}

	// 업데이트 시 성공한 행의 개수 반환 vs 삭제한 결과 0/1 반환
	@PutMapping("/comment")
	public ResponseEntity<?> update(CommentDto dto) {
		log.info("댓글 수정 로직 실행");

		try {

			int result = commentService.updateComment(dto);

			if (result > 0) {

				return new ResponseEntity<>(new ResponseDto<>(1, "댓글 수정 성공", result), HttpStatus.OK);

			} else {
				return new ResponseEntity<>(new ResponseDto<>(-1, "댓글 수정 실패", result), HttpStatus.OK);
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(new ResponseDto<>(-99, "댓글 수정 중 예외가 발생했습니다.", e.getMessage()), HttpStatus.OK);
		}

	}

	// 대댓글 작성
	@PostMapping("/comment/reply")
	public ResponseEntity<?> commentAdd(CommentDto commentDto, HttpSession session, Model model) {
		Long userId = (Long) session.getAttribute(SessionConst.USER_ID);
		commentDto.setWriter(userId);
		int result = commentService.commentAdd(commentDto);
		return new ResponseEntity<>(new ResponseDto<>(1, "대댓글 작성 성공", result), HttpStatus.OK);
	}
}
