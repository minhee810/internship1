package com.example.demo.comment.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.comment.dto.CommentDto;
import com.example.demo.comment.service.CommentService;
import com.example.demo.comment.vo.CommentsVO;
import com.example.demo.common.dto.ResponseDto;
import com.example.demo.common.exception.CustomException;
import com.example.demo.users.consts.SessionConst;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ApiCommentController {

	private final CommentService commentService;

	/**
	 * 댓글 불러오기
	 * 
	 * @return
	 */
	@GetMapping("/comments/{boardId}")
	public ResponseEntity<?> getCommentList(@PathVariable("boardId") Long boardId, HttpSession session) {
		Long userId = (Long) session.getAttribute(SessionConst.USER_ID);

		log.info("userId = {}", userId);
		List<CommentsVO> commentList = commentService.getCommentList(boardId, userId);
		log.info("commentList = {}", commentList);
		return new ResponseEntity<>(new ResponseDto<>(2, "댓글 불러오기 성공", commentList), HttpStatus.OK);
	}

	// 댓글 작성
	@PostMapping("/api/comments")
	public ResponseEntity<?> saveComment(@RequestBody CommentDto dto, HttpSession session) {
		log.info("saveComment() 로직 실행");
		log.info("dto = {}", dto);
		Long userId = (Long) session.getAttribute(SessionConst.USER_ID);
		if (userId == null) {
			throw new CustomException(-1, "로그인하지 않은 사용자의 접근입니다.");
		}
		dto.setWriter(userId);
		// 댓글 작성 시 boardService 호출 한 뒤 댓글 개수 +1 업데이트
		CommentDto saveComment = commentService.saveComment(dto);
		log.info("saveComment = {}", saveComment);
		if (saveComment != null) {
			return new ResponseEntity<>(new ResponseDto<>(1, "댓글이 작성되었습니다.", saveComment), HttpStatus.CREATED);
		}
		return new ResponseEntity<>(new ResponseDto<>(-1, "댓글작성에 실패하였습니다. ", saveComment), HttpStatus.BAD_REQUEST);

	}

	// 댓글 삭제
	@PutMapping("/api/comments/delete")
	public ResponseEntity<?> delete(@RequestBody Map<String, String> map) {
		log.info("====comment delete ====");
		Long boardId = Long.valueOf(map.get("boardId"));
		Long commentId = Long.valueOf(map.get("commentId"));

		log.info("boardId ={} ", boardId);
		log.info("commentId ={} ", commentId);

		int result = commentService.deleteComment(commentId, boardId);

		if (result > 0) {
			return new ResponseEntity<>(new ResponseDto<>(1, "댓글이 삭제되었습니다.", result), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(new ResponseDto<>(-99, "댓글 삭제에 실패했습니다.", result), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// 업데이트 시 input 창에 기존의 데이터 출력
	@GetMapping("/api/comment/update/{boardId}/{commentId}")
	public String updatePage(Long boardId, Long commentId, Model model) {

		CommentDto comment = commentService.selectOne(boardId);
		model.addAttribute("comment", comment);
		return "/board/detail/" + boardId;
	}

	// 업데이트 시 성공한 행의 개수 반환 vs 삭제한 결과 0/1 반환
	@PutMapping("/api/comments")
	public ResponseEntity<?> update(@RequestBody CommentDto dto) {
		log.info("api 댓글 수정 로직 실행");

		try {
			CommentDto savedComment = commentService.apiUpdateComment(dto);

			if (savedComment != null) {

				return new ResponseEntity<>(new ResponseDto<>(1, "댓글을 수정했습니다.", savedComment), HttpStatus.OK);

			} else {
				return new ResponseEntity<>(new ResponseDto<>(-1, "서버에 오류가 발생했습니다. ", savedComment),
						HttpStatus.INTERNAL_SERVER_ERROR);
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(new ResponseDto<>(-99, "댓글 수정 중 예외가 발생했습니다.", e.getMessage()),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	// 대댓글 작성
	@PostMapping("/api/comments/reply")
	public ResponseEntity<?> commentAdd(@RequestBody CommentDto commentDto, HttpSession session) {
		log.info("commentDto = {}", commentDto);
		Long userId = (Long) session.getAttribute(SessionConst.USER_ID);
		commentDto.setWriter(userId);
		CommentDto savedComment = commentService.apiCommentAdd(commentDto);
		
		log.info("savedComment ={}", savedComment);
		if(savedComment == null) {
			return new ResponseEntity<>(new ResponseDto<>(-1, "대댓글 작성에 실패했습니다.", savedComment), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(new ResponseDto<>(1, "대댓글을 작성했습니다. ", savedComment), HttpStatus.OK);
	}
}
