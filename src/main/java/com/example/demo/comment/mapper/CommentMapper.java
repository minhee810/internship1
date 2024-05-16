package com.example.demo.comment.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.comment.dto.CommentDto;
import com.example.demo.comment.vo.CommentsVO;

@Mapper
public interface CommentMapper {

	// 댓글 불러오기
	public List<CommentsVO> getCommentList(Map<String, Long> map);

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

	// 댓글 존재하는지 확
	public int hasReplies(Long commentId);

	// 대댓글 저장
	public int commentAdd(CommentDto commentDto);
	
	// 댓글 작성자 이름 검색
	public String parentUsername(Long commentId);
}
