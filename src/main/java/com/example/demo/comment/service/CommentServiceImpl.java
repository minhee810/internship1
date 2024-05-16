package com.example.demo.comment.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.board.mapper.BoardMapper;
import com.example.demo.board.service.BoardServiceImpl;
import com.example.demo.comment.dto.CommentDto;
import com.example.demo.comment.mapper.CommentMapper;
import com.example.demo.comment.vo.CommentsVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

	private final CommentMapper commentMapper;
	private final BoardMapper boardMapper;

	@Transactional
	@Override
	public List<CommentsVO> getCommentList(Long boardId, Long userId) {
		Map<String, Long> map = new HashMap<>();
		
		// userId가 없을 경우 임의의 값을 넣어서 데이터베이스로 보냄. -> 로그인하지 않은 사용자의 상태를 관리하기 위함
		if(userId == null) {
			userId = (long) 2;
		}
		
		log.info("userId = {}", userId);
		
		map.put("userId", userId);
		map.put("boardId", boardId);
		
		List<CommentsVO> commentList = commentMapper.getCommentList(map);
		
		log.info(" service : commentList = {}", commentList); 
		
		return commentList;
	}

	@Transactional
	@Override
	public CommentDto saveComment(CommentDto dto) {
		log.info("commentServiceImpl");

		// 댓글 개수 추가
		int rowCnt = boardMapper.updateCommentCnt(dto.getBoardId(), 1);
		
		log.info("rowCnt = {} ", rowCnt);
		
	
		// 일반 댓글 작성 처리 
		int depth = 0;
		Long parentId = (long) 0;

		
			CommentDto newComment = CommentDto.builder()
					.boardId(dto.getBoardId())
					.commentContent(dto.getCommentContent())
					.parentId(parentId) // 기본 0으로 설정
					.depth(depth)
					.writer(dto.getWriter())
					.build();
	
		
		int result = commentMapper.saveComment(newComment);
		CommentDto saveComment = commentMapper.selectOneComment(newComment.getCommentId());

		return saveComment;
	}

	@Transactional(rollbackFor = Exception.class) // 쿼리 두개 실행되므로 트랜잭션 처리, 예외 발생시 롤백 실행
	@Override
	public int deleteComment(Long commentId, Long boardId, Long writer) {
		// 댓글을 작성한 사용자인지 확인하는 로직
		// 댓글 삭제 시 대댓글 존재하는지 확인 
		// 존재하면 블러처리 
		// 존재하지 않으면 논리 삭제 처리만 진행

		int rowCnt = boardMapper.updateCommentCnt(boardId, -1); // 댓글 수 -1
		int result = commentMapper.deleteComment(commentId, writer); // 댓글 삭제
		log.info("rowCnt = {} ", rowCnt);
		return rowCnt; // 댓글 수 반환
	}

	@Transactional
	@Override
	public int updateComment(CommentDto commentVO) {
		int result = commentMapper.updateComment(commentVO);
		return result;
	}

	@Override
	public int count(Long boardId) {
		return commentMapper.count(boardId);
	}
	
	@Override
	public CommentDto selectOne(Long commentId) {
		return commentMapper.selectOneComment(commentId);
	}

	@Override
	public int hasReplies(Long commentId) {
		return commentMapper.hasReplies(commentId);
	}

	// 대댓글 작성
	@Override
	public int commentAdd(CommentDto commentDto) {

		log.info("commentDto.getParentUsername() = {}", commentDto.getParentUsername());
	
		
		int rowCnt = boardMapper.updateCommentCnt(commentDto.getBoardId(), 1);
		// 부모 댓글의 아이디 저장 
		commentDto.setParentId(commentDto.getParentId());
		
		// 깊이 저장 대댓글 작성 시 해당 댓글의 깊이 +1 
		// 프론트에서 댓글깊이 전송하기 
		commentDto.setDepth(commentDto.getDepth() + 1);
		// 게시글 아이디 저장 
		commentDto.setBoardId(commentDto.getBoardId());
		
		// 댓글 작성자 아이디 저장 -> controller 에서 처리
		
		int result = commentMapper.saveComment(commentDto);
		
		return result;
	}
	
	
	// 사용자 이름 검색
	public String parentUsername(Long parentId) {
		return commentMapper.parentUsername(parentId);
	}
	

}
