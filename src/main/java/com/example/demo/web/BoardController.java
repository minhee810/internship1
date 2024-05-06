package com.example.demo.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

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

	/**
	 * 게시글 목록 조회
	 * 
	 * @param model
	 * @return
	 */
	@GetMapping("/")
	public String getBoardList(Model model) {
		// 게시글 목록 조회
		List<BoardVO> boardList = boardServiceImpl.getBoardList();

		log.info("boardList = {}", boardList);

		model.addAttribute("boardList", boardList);

		return "/board/boardMain";
	}

	/**
	 * 게시글 작성 페이지
	 * 
	 * @return
	 */
	@GetMapping("/board/write")
	public String insertPage() {
		log.info("board/write Controller ");
		return "/board/boardWrite";
	}

	/**
	 * 게시글 저장
	 * 
	 * @param dto
	 * @param model
	 * @param session
	 * @return
	 * @throws Exception
	 */
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

	/**
	 * 게시글 상세보기
	 * 
	 * @param boardId
	 * @param model
	 * @return
	 */
	@GetMapping("/board/detail/{boardId}")
	public String getDetail(@PathVariable Long boardId, Model model) {

		BoardVO detail = boardServiceImpl.getDetail(boardId);
		model.addAttribute("detail", detail);

		List<UploadFileVO> files = fileServiceImpl.findAllFileByBoardId(boardId);
		for (UploadFileVO file : files) {
			log.info("files = {}", file);
		}

		model.addAttribute("files", files);
		return "/board/boardDetail";
	}

	/**
	 * 게시글 수정 페이지 이동
	 * 
	 * @param boardId
	 * @param model
	 * @return
	 */
	@GetMapping("/board/modify/{boardId}")
	public String modifyPage(@PathVariable Long boardId, Model model) {

		BoardVO detail = boardServiceImpl.getDetail(boardId);
		model.addAttribute("detail", detail);
		List<UploadFileVO> files = fileServiceImpl.findAllFileByBoardId(boardId);
		for (UploadFileVO file : files) {
			log.info("files = {}", file);
		}
		model.addAttribute("files", files);
		log.info("=====[modifyPage() END]=====");
		return "/board/boardModify";
	}

	/**
	 * 게시글 수정 기능
	 * 
	 * @param boardId
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@PostMapping("/board/modify/{boardId}")
	public String modifyBoard(@PathVariable Long boardId, 
								@ModelAttribute("dto") BoardListDto dto,
								@RequestParam(required = false) List<Long> deletedFilesId, 
								HttpServletRequest request, Model model,
								Errors erros) throws Exception {

		log.info("=====[modifyBoard]=====");

		if (erros.hasErrors()) {
			return "/board/modify/" + boardId;
		}
		
		log.info("[modifyboard] service 호출 전 "); 
		boardServiceImpl.modifyBoard(boardId, dto, deletedFilesId);

		return "redirect:/board/detail/" + boardId;
	}

	/**
	 * 게시글 삭제
	 * 
	 * @param boardId
	 * @return
	 */
	@PostMapping("/board/delete/{boardId}")
	public ResponseEntity<?> deleteBoard(@PathVariable Long boardId) {
		log.info("boardId = {}", boardId);
		log.info("delete boardController");

		int result = boardServiceImpl.deleteBoard(boardId);

		log.info("result = {}", result);

		return new ResponseEntity<>(new ResponseDto<>(1, "게시글 삭제 성공", result), HttpStatus.OK);

	}

}
