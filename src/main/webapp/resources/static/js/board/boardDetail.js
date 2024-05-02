/**
 * boardDetail.js 
 */


$(document).ready(function() {
	$('#deleteBtn').click(fn_boardDelete);

})

function fn_boardDelete() {
	let boardId = $('#boardId').text();

	$.ajax({
		type: "post",
		url: "/board/delete/" + boardId,
		dataType: "json",
		contentType: "application/json; charset-utf-8",
		success: function(data) {

			console.log(data);

			let code = data.code;

			if (code == 1) {
				alert("게시글이 삭제 완료되었습니다.");
				location.href = "/";
			}
		},
		
		error: function(data) {
			alert("게시글 삭제 실패");
			console.log(data);
		}
	});
}
