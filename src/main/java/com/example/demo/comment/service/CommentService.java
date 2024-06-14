package com.example.demo.comment.service;

import java.util.List;

import com.example.demo.comment.dto.CommentDto;
import com.example.demo.comment.vo.CommentsVO;

public interface CommentService {

	// 댓글 불러오기
	public List<CommentsVO> getCommentList(Long boardId, Long userId);

	// 댓글 작성하기
	public CommentDto saveComment(CommentDto commentVO);

	// 댓글 삭제하기
	public int deleteComment(Long commentId, Long boardId);

	// 댓글 수정하기
	public int updateComment(CommentDto dto);

	// 댓글 개수
	public int count(Long boardId);

	// 댓글 하나 조회
	public CommentDto selectOne(Long commentId);

	// 대댓글 존재하는지 확인
	public int hasReplies(Long commentId);

	// 대댓글 작성하기
	public int commentAdd(CommentDto commentDto);

	// 댓글 일괄 삭제 처리
	public int commentDeleteAll(Long boardId);

	// apiController 댓글 수정
	public CommentDto apiUpdateComment(CommentDto dto);

}
