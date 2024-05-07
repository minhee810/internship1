package com.example.demo.service.comment;

import java.util.List;

import com.example.demo.vo.CommentsVO;

public interface CommentService {

	// 댓글 불러오기 
	public List<CommentsVO> getCommentList(Long boardId);
	
	// 댓글 작성하기 
	public CommentsVO saveComment(CommentsVO commentVO);
	
	// 댓글 삭제하기 
	public CommentsVO deleteComment(Long commentId);
	
	// 댓글 수정하기 
	public CommentsVO updateComment(CommentsVO commentVO);
}
