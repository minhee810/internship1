package com.example.demo.jasper.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import com.example.demo.board.vo.BoardVO2;

import lombok.extern.slf4j.Slf4j;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.util.JRSaver;
@Slf4j
@Service
public class JasperReportServiceImpl implements JasperReportService {

	@Override
	public byte[] getItemReport(List<BoardVO2> boardList, String format) {

		JasperReport jasperReport = null;

		try {

			File file = ResourceUtils.getFile("classpath:boardList.jrxml");
			jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
			JRSaver.saveObject(jasperReport, "boardList.jasper");
		} catch (JRException e) {
		    System.out.println("JRXML 파일 컴파일 중 오류가 발생했습니다.");
		    e.printStackTrace();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(boardList, false);
		Map<String, Object> parameters = new HashMap<>();

		JasperPrint jasperPrint = null;

		byte[] reportContent;

		try {
			// 레포팅 출력을 만든다. 
			jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
			
			switch (format) {
			case "pdf":
				reportContent = JasperExportManager.exportReportToPdf(jasperPrint);
				break; 
			case "xml":
				reportContent = JasperExportManager.exportReportToXml(jasperPrint).getBytes();
				break;
			default : 
				throw new RuntimeException("Unknown report format" + format);
			}
		} catch (JRException e) {
			throw new RuntimeException(e);
		}

		return reportContent;
	}
}
