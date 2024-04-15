package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class SampleController {
	

	@GetMapping("/")
	public ModelAndView sample() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("sample");
		return mv;
	}
		
	
	@GetMapping("/v1")
	public String sample2() {
		return "sample";	
	}
	
//	@GetMapping("/v3")
//	public String sample3(Model model) {
//		model.addAttribute("hello", "hello world");
//		return "sample";
//	}
}
