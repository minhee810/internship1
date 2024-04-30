/**
 * main.js 
 */

$(document).ready(function() {
	// 1. 글 목록 가져오기 
	getBoardList();
	// 2. 글 작성하기 
	$('#writeBtn').click(writeBoard);

	// 3. 글 상세보기로 이동

});

function getBoardList() {

	const board = JSON.stringify({
		"title": $('#title').val(),
		"content": $('#content').val(),
		"uploadFileUrl": $('#uploadFileUrl'),
		"commentCount": $('#commentCount').val().trim()
	});

	$.ajax({
		url: "/list",
		type: "get",
		/*			data: board,*/
		dataType: board,
		contentType: "application/json; charset-utf-8",

		success: function(result) {

			console.log("result", result);

			let code = result.code;
			if (code == 1) {
				alert("sucess!");
			} else if (code == -1) {
				alert("fail");
			}
		},
		error: function(error) {
			console.log(error.msg);
			alert(error);
		}
	})



}


/* 게시글 작성 */
function writeBoard() {

	const board = JSON.stringify({
		"title": $('#title').val().trim(),
		"content": $('#content').val().trim(),
		"uploadFileUrl": $('#uploadFileUrl').val().trim(),
		"commentCount": $('#commentCount').val().trim()
	});

	$.ajax({
		url: "/board/write",
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
			console.log(error.msg);
			alert(error);
		}
	})
}



