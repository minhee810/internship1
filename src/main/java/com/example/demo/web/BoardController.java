package com.example.demo.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.service.board.BoardServiceImpl;
import com.example.demo.vo.BoardVO;
import com.example.demo.web.dto.board.BoardListDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
public class BoardController {

	private final BoardServiceImpl boardServiceImpl;

//	@GetMapping("/")
	public String mainPage(HttpServletRequest request) {
		return "/board/boardMain";
	}

	/*
	 * @GetMapping("/list") public ResponseEntity<?> getBoardList(HttpServletRequest
	 * request, BoardVO boardVo) { // 게시글 목록 조회 List<BoardVO> boardList =
	 * boardServiceImpl.getBoardList();
	 * 
	 * log.info("boardList = {}", boardList);
	 * 
	 * return new ResponseEntity<>(new ResponseDto<>(1, "게시글 목록 조회 성공", boardList),
	 * HttpStatus.OK); }
	 */

	@GetMapping("/")
	public String getBoardList(Model model) {
		// 게시글 목록 조회
		List<BoardVO> boardList = boardServiceImpl.getBoardList();

		log.info("boardList = {}", boardList);

		model.addAttribute("boardList", boardList);

		return "/board/boardMain";
	}

	@GetMapping("/board/write")
	public String insertPage() {
		return "/board/boardWrite";
	}

	@PostMapping("/board/write")
	public String insertBoard(@ModelAttribute BoardListDto dto, Model model, HttpSession session) throws Exception {

		log.info("session userId = {} ", session.getAttribute(SessionConst.USER_ID));

		log.info("session username = {} ", session.getAttribute(SessionConst.USERNAME));

		log.info("dto = {}", dto);

		Long userId = (Long) session.getAttribute(SessionConst.USER_ID);
		String username = (String) session.getAttribute(SessionConst.USERNAME);

		log.info("userId = {} ", userId);
		log.info("username = {} ", username);

		// 작성자로 user 의 id 를 넣어야할지, username 을 넣어야 할지 ?

		BoardListDto board = BoardListDto.builder().title(dto.getTitle()).content(dto.getContent()).uploadFileUrl("url")
				.commentCnt(0).userId(userId) // 로그인한 사용자의 이름 저장
				.build();

		log.info("board = {}", board);

		boardServiceImpl.insertBoard(board);

		return "redirect:/";
	}

	@GetMapping("/board/detail/{boardId}")
	public String getDetail(@PathVariable Long boardId, Model model) {
		
		List<BoardVO> detail = boardServiceImpl.getDetail(boardId);
		
		model.addAttribute("detail", detail);
		log.info("boardController --> detail = {} ", detail);
		
		return "/board/boardDetail";
	}

}
