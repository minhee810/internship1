package com.example.demo.service.comment;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.mapper.CommentMapper;
import com.example.demo.vo.CommentsVO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

	private final CommentMapper commentMapper; 
	
	@Override
	public List<CommentsVO> getCommentList(Long boardId) {
		List<CommentsVO> commentList = commentMapper.getCommentList(boardId);
		return commentList;
	}

	@Override
	public CommentsVO saveComment(CommentsVO commentVO) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CommentsVO deleteComment(Long commentId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CommentsVO updateComment(CommentsVO commentVO) {
		// TODO Auto-generated method stub
		return null;
	}

	
}
