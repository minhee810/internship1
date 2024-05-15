package com.example.demo.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.data.domain.Page;
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
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.exception.CustomException;
import com.example.demo.service.board.BoardService;
import com.example.demo.service.file.FileService;
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

	private final BoardService boardService;

	private final FileService fileService;

	public static final long MAX_FILE_SIZE = 200 * 1024 * 1024; // 200MB
	public static final long MAX_REQUEST_SIZE = 215 * 1024 * 1024; // 215MB

	// 게시글 목록 조회
	// get 방식으로 페이지 번호를 넘겨준다.
	// 받아서 해당 페이지 정보를 넘겨서 해당 페이지 데이터만 뽑아오기
	@GetMapping("/")
	public String getBoardList(@PageableDefault(size = 10, page = 0) Pageable page, Model model) {
		
		log.info("===getBoardList 로직실행===");
		// 게시글 목록 조회
		Page<BoardVO> boardList = boardService.getBoardList(page);
		
		int pageNumber = boardList.getPageable().getPageNumber(); // 현재 페이지
		int totalPages = boardList.getTotalPages(); // 총 페이지 개수
		int pageBlock = 10;
		int startBlockPage = ((pageNumber) / pageBlock) * pageBlock + 1; // 현재 페이지가 7이라면 1*5
		int endBlockPage = startBlockPage + pageBlock - 1;
		endBlockPage = totalPages < endBlockPage ? totalPages : endBlockPage;

		log.info("page = {}", page.toString());
		log.info("boardList = {}", boardList.toString());

		model.addAttribute("boardList", boardList);
		model.addAttribute("startBlockPage", startBlockPage);
		model.addAttribute("endBlockPage", endBlockPage);

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

	// 게시글 저장
	@PostMapping("/board/write")
	public ResponseEntity<?> insertBoard(BoardListDto dto, Model model, HttpSession session) throws Exception {

		try {
			Long userId = (Long) session.getAttribute(SessionConst.USER_ID);

			if (userId == null) {
				throw new CustomException(-1, "로그인 정보가 없습니다.");
			}

			for (MultipartFile file : dto.getFiles()) {

				// 업로드된 파일의 크기를 확인하고 제한을 초과하는지 검사
				if (file.getSize() > MAX_FILE_SIZE) {
					throw new MaxUploadSizeExceededException(MAX_FILE_SIZE);
				}
			}
			dto.setUserId(userId);

			boardService.insertBoard(dto);

			return new ResponseEntity<>(new ResponseDto<>(1, "게시글 작성 성공", null), HttpStatus.CREATED);

		} catch (MaxUploadSizeExceededException e) {
			
			return new ResponseEntity<>(new ResponseDto<>(-1, e.getMessage(), null), HttpStatus.BAD_REQUEST);
		}
	}

	// 게시글 상세보기
	@GetMapping("/board/detail/{boardId}")
	public String getDetail(@PathVariable Long boardId, Model model) {

		BoardVO detail = boardService.getDetail(boardId);
		model.addAttribute("detail", detail);

		List<UploadFileVO> files = fileService.findAllFileByBoardId(boardId);
		for (UploadFileVO file : files) {
			log.info("files = {}", file);
		}

		model.addAttribute("files", files);
		return "/board/boardDetail";
	}

	// 게시글 수정 페이지 이동
	@GetMapping("/board/modify/{boardId}")
	public String modifyPage(@PathVariable Long boardId, Model model) {

		BoardVO detail = boardService.getDetail(boardId);
		model.addAttribute("detail", detail);

		List<UploadFileVO> files = fileService.findAllFileByBoardId(boardId);

		for (UploadFileVO file : files) {
			log.info("files = {}", file);
		}

		model.addAttribute("files", files);
		log.info("=====[modifyPage() END]=====");
		return "/board/boardModify";
	}

	// 게시글 수정 기능
	@PostMapping("/board/modify/{boardId}")
	public String modifyBoard(@PathVariable Long boardId, @ModelAttribute("dto") BoardListDto dto,
			@RequestParam(required = false) List<Long> deletedFilesId, HttpServletRequest request, Model model,
			Errors erros) throws Exception {

		log.info("=====[modifyBoard]=====");

		if (erros.hasErrors()) {
			return "/board/modify/" + boardId;
		}

		log.info("[modifyboard] service 호출 전 ");
		boardService.modifyBoard(boardId, dto, deletedFilesId);

		return "redirect:/board/detail/" + boardId;
	}

	// 게시글 삭제
	@PostMapping("/board/delete/{boardId}")
	public ResponseEntity<?> deleteBoard(@PathVariable Long boardId) {
		log.info("boardId = {}", boardId);
		log.info("delete boardController");

		int result = boardService.deleteBoard(boardId);

		log.info("result = {}", result);

		return new ResponseEntity<>(new ResponseDto<>(1, "게시글 삭제 성공", result), HttpStatus.OK);

	}
}
