package com.example.demo.jasper.service;

import java.util.List;

import com.example.demo.board.vo.BoardVO;

public interface JasperReportService {

	byte[] getItemReport(List<BoardVO> boardList, String format);

}
