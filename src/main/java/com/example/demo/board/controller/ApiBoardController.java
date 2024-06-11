package com.example.demo.board.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.board.dto.BoardListDto;
import com.example.demo.board.service.BoardService;
import com.example.demo.board.vo.BoardVO;
import com.example.demo.common.dto.ResponseDto;
import com.example.demo.common.exception.CustomException;
import com.example.demo.file.service.FileService;
import com.example.demo.file.vo.UploadFileVO;
import com.example.demo.users.consts.SessionConst;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ApiBoardController {

	private final BoardService boardService;
	private final FileService fileService;
	public static final long MAX_FILE_SIZE = 200 * 1024 * 1024; // 200MB
	public static final long MAX_REQUEST_SIZE = 215 * 1024 * 1024; // 215MB

	// 게시글 목록 조회
	// get 방식으로 페이지 번호를 넘겨준다.
	// 받아서 해당 페이지 정보를 넘겨서 해당 페이지 데이터만 뽑아오기
	@GetMapping("/board")
	public ResponseEntity<?> getBoardList(
			@PageableDefault(size = 10, page = 1, sort = "boardId", direction = Sort.Direction.DESC) Pageable pageable,
			Model model) {
		log.info("===getBoardList 로직실행===");

		System.out.println("page = " + pageable.getPageNumber());

		// 게시글 목록 조회
		Page<BoardVO> boardList = boardService.getBoardList(pageable);

		int pageNumber = boardList.getPageable().getPageNumber(); // 현재 페이지
		int totalPages = boardList.getTotalPages(); // 총 페이지 개수 ** 수정 '-1' 추가
		int pageBlock = 10;
		int startBlockPage = ((pageNumber) / pageBlock) * pageBlock + 1; // 현재 페이지가 7이라면 1*5

		int endBlockPage = startBlockPage + pageBlock - 1;

		endBlockPage = totalPages < endBlockPage ? totalPages : endBlockPage;

		log.info("page = {}", pageable.toString());
		log.info("boardList getNumber = {}", boardList.getNumber());
		log.info("endBlockPage = {}", endBlockPage);
		log.info("startBlockPage = {}", startBlockPage);
		log.info("page Size = {}", pageable.getPageSize());
		log.info("totalPages = {}", totalPages);

		model.addAttribute("boardList", boardList);
		model.addAttribute("startBlockPage", startBlockPage);
		model.addAttribute("endBlockPage", endBlockPage);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("boardList", boardList);
		map.put("startBlockPage", startBlockPage);
		map.put("endBlockPage", endBlockPage);
		return new ResponseEntity<>(new ResponseDto<>(2, "게시글 목록 조회 성공", map), HttpStatus.OK);
	}

	// 게시글 저장
	@PostMapping("/api/write")
	public ResponseEntity<?> insertBoard(@RequestPart("title") String title, @RequestPart("content") String content,
			@RequestPart(value = "files", required = false) MultipartFile[] files, Model model, HttpSession session) throws Exception {
		
		log.info("insertBoard() 로직 실행 ");

		try {
			Long userId = (Long) session.getAttribute(SessionConst.USER_ID);

			if (userId == null) {
				throw new CustomException(-1, "로그인 정보가 없습니다.");
			}
			BoardListDto dto = new BoardListDto();
			dto.setTitle(title);
			dto.setContent(content);
			dto.setUserId(userId);
			dto.setFiles(files);
			log.info("title = {}", title);
			log.info("content = {}", content);
			
			if (files != null) {
				for (MultipartFile file : files) {
					log.info("file = {}", file);
					
					// 업로드된 파일의 크기를 확인하고 제한을 초과하는지 검사
					if (file.getSize() > MAX_FILE_SIZE) {
						throw new MaxUploadSizeExceededException(MAX_FILE_SIZE);
					}
				}
			}
			
			boardService.insertBoard(dto);
			log.info("dto = {}", dto);
			return new ResponseEntity<>(new ResponseDto<>(1, "게시글 작성 성공", null), HttpStatus.CREATED);
			
		} catch (MaxUploadSizeExceededException e) {

			return new ResponseEntity<>(new ResponseDto<>(-1, e.getMessage(), null), HttpStatus.BAD_REQUEST);
		}
	}

	// 게시글 상세보기
	@GetMapping("/detail/{boardId}")
	public ResponseEntity<?> getDetail(@PathVariable String boardId, Model model) {
		log.info("getDetail() 로직 실행");
		Long LBoardId = Long.valueOf(boardId);

		log.info("detail 로직 실행");
		BoardVO detail = boardService.getDetail(LBoardId);

		List<UploadFileVO> files = fileService.findAllFileByBoardId(LBoardId);
		for (UploadFileVO file : files) {
			log.info("files = {}", file);
		}

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("detail", detail);
		map.put("files", files);
		return new ResponseEntity<>(new ResponseDto<>(2, "게시글 상세보기 성공", map), HttpStatus.OK);
	}

	// 게시글 수정 페이지 이동
	@GetMapping("/api/modify/{boardId}")
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
	@PostMapping("/api/modify/{boardId}")
	public String modifyBoard(@PathVariable Long boardId, @ModelAttribute("dto") BoardListDto dto,
			@RequestParam(required = false) List<Long> deletedFilesId, HttpServletRequest request, Model model,
			Errors erros) throws Exception {

		log.info("=====[modifyBoard]=====");

		if (erros.hasErrors()) {
			return "/board/modify/" + boardId;
		}

		boardService.modifyBoard(boardId, dto, deletedFilesId);

		return "redirect:/board/detail/" + boardId;
	}

	// 게시글 삭제
	@PostMapping("/api/delete/{boardId}")
	public ResponseEntity<?> deleteBoard(@PathVariable Long boardId) {
		log.info("=====게시글 삭제 로직 수행 =====");
		log.info("boardId = {}", boardId);
		log.info("delete boardController");

		int result = boardService.deleteBoard(boardId);

		log.info("result = {}", result);

		return new ResponseEntity<>(new ResponseDto<>(1, "게시글 삭제 성공", result), HttpStatus.OK);

	}
}
