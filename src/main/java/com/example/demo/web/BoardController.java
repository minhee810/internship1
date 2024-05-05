package com.example.demo.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.exception.CustomException;
import com.example.demo.service.board.BoardServiceImpl;
import com.example.demo.service.file.FileServiceImpl;
import com.example.demo.vo.BoardVO;
import com.example.demo.vo.UploadFileVO;
import com.example.demo.web.dto.ResponseDto;
import com.example.demo.web.dto.board.BoardListDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
public class BoardController {

	private final BoardServiceImpl boardServiceImpl;
	private final FileServiceImpl fileServiceImpl;

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
		log.info("board/write Controller ");
		return "/board/boardWrite";
	}

	@PostMapping("/board/write")
	public String insertBoard(BoardListDto dto, Model model, HttpSession session) throws Exception {

		Long userId = (Long) session.getAttribute(SessionConst.USER_ID);

		if (userId == null) {
			throw new CustomException(-1, "로그인 정보가 없습니다.");
		}

		dto.setUserId(userId);

		boardServiceImpl.insertBoard(dto);

		return "redirect:/";
	}

	@GetMapping("/board/detail/{boardId}")
	public String getDetail(@PathVariable Long boardId, Model model) {

		BoardVO detail = boardServiceImpl.getDetail(boardId);
		model.addAttribute("detail", detail);
		

		List<UploadFileVO> files = fileServiceImpl.findAllFileByBoardId(boardId);
		for(UploadFileVO file : files) {
			log.info("files = {}", file);
		}
		
		model.addAttribute("files", files);
		return "/board/boardDetail";
	}

	@GetMapping("/board/modify/{boardId}")
	public String modifyPage(@PathVariable Long boardId, Model model) {

		BoardVO detail = boardServiceImpl.getDetail(boardId);
		
		model.addAttribute("detail", detail);

		List<UploadFileVO> files = fileServiceImpl.findAllFileByBoardId(boardId);
		for(UploadFileVO file : files) {
			log.info("files = {}", file);
		}
		
		model.addAttribute("files", files);

		return "/board/boardModify";
	}

	@PostMapping("/board/modify/{boardId}")
	public String modifyBoard(@PathVariable Long boardId, HttpServletRequest request, Model model) {
		log.info("=====[modifyBoard]=====");
		BoardVO board = new BoardVO();
		board.setBoardId(boardId);
		board.setTitle(request.getParameter("title"));
		board.setContent(request.getParameter("content"));
		boardServiceImpl.modifyBoard(board);
		
		request.getParameter("files");

		return "redirect:/board/detail/" + boardId;
	}

	@PostMapping("/board/delete/{boardId}")
	public ResponseEntity<?> deleteBoard(@PathVariable Long boardId) {
		log.info("boardId = {}", boardId);
		log.info("delete boardController");

		int result = boardServiceImpl.deleteBoard(boardId);

		log.info("result = {}", result);

		return new ResponseEntity<>(new ResponseDto<>(1, "게시글 삭제 성공", result), HttpStatus.OK);

	}

}
