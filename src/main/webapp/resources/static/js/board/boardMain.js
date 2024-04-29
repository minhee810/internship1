/**
 * main.js 
 */

$(document).ready(function(){
	// 1. 글 목록 가져오기 
	
	
	// 2. 글 작성하기 
	
	
	// 3. 글 상세보기로 이동
	
});

$('#writeBtn').click(writePost);


function writePost() {

	const board = JSON.stringify({
		"title": $('#title').val().trim(),
		"content": $('#content').val().trim(),
		"uploadFileUrl": $('#uploadFileUrl').val().trim(),
		"commentCount": $('#commentCount').val().trim()
	});

	$.ajax({
		url: "/board",
		type: "post",
		data: board,
		dataType: "json",
		contentType: "application/json; charset-utf-8",
		success: function(data) {
			let code = data.code;
			if (code == 1) {
				alert("sucess!");
			} else if (code == -1) {
				alert("fail");
			}
		},
		error: function(error) {
			alert("error! : ", error);
		}
	})
}

