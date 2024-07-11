package com.example.demo.jasper.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.board.service.BoardService;
import com.example.demo.board.vo.BoardVO;
import com.example.demo.jasper.service.JasperReportService;

import net.sf.jasperreports.engine.JRException;

@RestController
@RequestMapping("/api/reports")
public class JasperReportController {

	@Autowired
	private BoardService boardService;
	
	@Autowired
	private JasperReportService jasperReportService;

	@GetMapping("/item-report/{format}")
	public ResponseEntity<?> downloadUserReport(@PathVariable String format) throws JRException, IOException {
	
		List<BoardVO> boardList = boardService.getAllListForJasper();
		
		// JasperReports 를 사용하여 생성된 보고서의 바이트 배열 
		byte[] reportContent = jasperReportService.getItemReport(boardList, format);
		

		// reportContent 를 리소스로 변환, 이 리소스는 바이트 배열을 기반으로 하는 Spring 의 추상화된 리소스임
	    ByteArrayResource resource = new ByteArrayResource(reportContent);
	    
	    
	    return ResponseEntity.ok()
	    		.contentType(MediaType.APPLICATION_OCTET_STREAM)
	    		.contentLength(resource.contentLength())
	    		.header(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.attachment().filename("Test02." + format)
	    				.build().toString()).body(resource);
	    
		/*
		 * // 데이터 소스로 사용될 JRBeanCollectionDataSource 생성 JRBeanCollectionDataSource
		 * dataSource = new JRBeanCollectionDataSource(boardList);
		 * 
		 * // 보고서 매개변수 설정 Map<String, Object> parameter = new HashMap<>();
		 * parameter.put("title", "testlist");
		 * 
		 * // Fill the report JasperPrint jasperPrint =
		 * JasperFillManager.fillReport(jasper, parameter, null);
		 */
	}
}
