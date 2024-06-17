package com.example.demo.comment.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.board.mapper.BoardMapper;
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
		if (userId == null) {
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

		CommentDto newComment = CommentDto.builder().boardId(dto.getBoardId()).commentContent(dto.getCommentContent())
				.parentId(parentId) // 기본 0으로 설정
				.depth(depth).writer(dto.getWriter()).build();

		log.info("dto = {}", dto);
		int result = commentMapper.saveComment(newComment);

		if (result > 0) {
			CommentDto saveComment = commentMapper.selectOneComment(newComment.getCommentId());
			// 댓글의 경우 작성자가 본인이므로 작성 시에는 임의로 principal 값을 1로 설정하여 return 해주기 
			// front 에서 화면에 표시할 때 필요한 데이터이므로
			saveComment.setPrincipal(1);
			return saveComment;
		}

		return null;
	}

	@Transactional(rollbackFor = Exception.class) // 쿼리 두개 실행되므로 트랜잭션 처리, 예외 발생시 롤백 실행
	@Override
	public int deleteComment(Long commentId, Long boardId) {
		int rowCnt = boardMapper.updateCommentCnt(boardId, -1); // 댓글 수 -1
		int result = commentMapper.deleteComment(commentId); // 댓글 삭제
		log.info("rowCnt = {} ", rowCnt);
		log.info("result = {} ", result);
		return result; // 결
	}

	@Transactional
	@Override
	public int updateComment(CommentDto dto) {
		int result = commentMapper.updateComment(dto);
		log.info("서비스까지만 와줘라 제발 result = {}", result);
		log.info("dto = {}", dto);
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

	// 게시물 삭제시 댓글 일괄 삭제
	@Override
	public int commentDeleteAll(Long boardId) {
		return commentMapper.commentDeleteAll(boardId);
	}

	@Override
	public CommentDto apiUpdateComment(CommentDto dto) {
		int result = commentMapper.apiUpdateComment(dto);
		log.info("result ={}", result);

		CommentDto saveComment = commentMapper.selectOneComment(dto.getCommentId());
		log.info("saveComment = {}", saveComment);
		saveComment.setPrincipal(1);
		return saveComment;
	}
	
	// 대댓글 작성
	@Override
	public CommentDto apiCommentAdd(CommentDto commentDto) {

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
		
		if (result > 0) {
			CommentDto saveComment = commentMapper.selectOneComment(commentDto.getCommentId());
			// 댓글의 경우 작성자가 본인이므로 작성 시에는 임의로 principal 값을 1로 설정하여 return 해주기 
			// front 에서 화면에 표시할 때 필요한 데이터이므로
			saveComment.setPrincipal(1);
			log.info("selectOneComment 후 saveComment = {}", saveComment);
			return saveComment;
		}

		return null;
	}

}
