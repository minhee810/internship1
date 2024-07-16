package com.example.demo.jasper.service;

import java.util.List;

import com.example.demo.board.vo.BoardVO2;

public interface JasperReportService {

	byte[] getItemReport(List<BoardVO2> boardList, String format);
}
