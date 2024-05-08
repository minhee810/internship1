package com.example.demo.service.comment;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.mapper.CommentMapper;
import com.example.demo.vo.CommentsVO;

import ch.qos.logback.classic.pattern.Util;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

	private final CommentMapper commentMapper;

	@Transactional
	@Override
	public List<CommentsVO> getCommentList(Long boardId) {
		List<CommentsVO> commentList = commentMapper.getCommentList(boardId);
		return commentList;
	}

	@Transactional
	@Override
	public CommentsVO saveComment(CommentsVO commentVO) {
		log.info("commentServiceImpl");
		
		// xxs 방지 
		// commentVO.setContent(Util.XXSHandling(commentVO.getContent()));
		
		CommentsVO savedComment = commentMapper.saveComment(commentVO);
		return savedComment;
	}

	@Transactional
	@Override
	public int deleteComment(Long commentId) {
		int result = commentMapper.deleteComment(commentId);
		return result;
	}

	@Transactional
	@Override
	public int updateComment(CommentsVO commentVO) {
		int result = commentMapper.updateComment(commentVO);
		return result;
	}

}
