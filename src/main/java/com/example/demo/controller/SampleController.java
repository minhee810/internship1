package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class SampleController {
	

	@GetMapping("/")
	public ModelAndView sample(Model model) {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("main");
		return mv;
	}
		
	@GetMapping("/errorPage")
	public String errorPage() {
		return "errorPage";
	}
	
	@GetMapping("/mainPage")
	public String mainPage() {
		return "main"; 
	}
	
	@GetMapping("/board-detail")
	public String boardDetail() {
		return "boardDetail"; 
	}
	
	@GetMapping("/board-modify")
	public String boardModify() {
		return "boardModify"; 
	}
	
	
}
