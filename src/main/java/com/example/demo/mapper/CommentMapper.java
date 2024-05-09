package com.example.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.vo.CommentsVO;
import com.example.demo.web.dto.comment.CommentDto;

@Mapper
public interface CommentMapper {

	// 댓글 불러오기
	public List<CommentsVO> getCommentList(Long boardId);

	// 댓글 작성하기
	public int saveComment(CommentDto commentDto);

	// 댓글 삭제하기
	public int deleteComment(Long commentId, Long writer);

	// 댓글 수정하기
	public int updateComment(CommentDto commentVO);

	// 댓글 개수
	public int count(Long boardId);
	
	// 댓글 한개 조회 (리턴 받을 용도) 
	public CommentDto selectOneComment(Long commentId);
}
