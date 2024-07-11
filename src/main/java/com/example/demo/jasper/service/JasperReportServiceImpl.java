package com.example.demo.jasper.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import com.example.demo.board.vo.BoardVO;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.util.JRLoader;
import net.sf.jasperreports.engine.util.JRSaver;

@Service
public class JasperReportServiceImpl implements JasperReportService {

	@Override
	public byte[] getItemReport(List<BoardVO> boardList, String format) {

		JasperReport jasperReport;

		try {
			jasperReport = (JasperReport) JRLoader.loadObject(ResourceUtils.getFile("Test02.jasper"));

		} catch (FileNotFoundException | JRException e) {
			try {
				File file = ResourceUtils.getFile("classpath:Test02.jrxml");
				jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
				JRSaver.saveObject(jasperReport, "Test02.jasper");

			} catch (FileNotFoundException | JRException ex) {
				throw new RuntimeException(e);
			}
		}

		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(boardList);
		Map<String, Object> parameters = new HashMap<>();
		parameters.put("title", "Item Report");

		JasperPrint jasperPrint = null;

		byte[] reportContent;

		try {
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
		} catch (JRException  e) {
			throw new RuntimeException(e);
		}

		return reportContent;
	}

}
