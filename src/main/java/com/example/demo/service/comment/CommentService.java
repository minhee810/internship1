package com.example.demo.service.comment;

import java.util.List;

import com.example.demo.vo.CommentsVO;
import com.example.demo.web.dto.comment.CommentDto;

public interface CommentService {

	// 댓글 불러오기
	public List<CommentsVO> getCommentList(Long boardId, Long userId);

	// 댓글 작성하기
	public CommentDto saveComment(CommentDto commentVO);

	// 댓글 삭제하기
	public int deleteComment(Long commentId, Long boardId, Long writer, int status);

	// 댓글 수정하기
	public int updateComment(CommentDto commentVO);

	// 댓글 개수
	public int count(Long boardId);

	// 댓글 하나 조회
	public CommentDto selectOne(Long commentId);

	// 대댓글 존재하는지 확인 
	public int hasReplies(Long commentId);
	
}
