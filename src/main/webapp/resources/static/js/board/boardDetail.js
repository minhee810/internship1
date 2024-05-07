/**
 * boardDetail.js 
 */


$(document).ready(function() {
	getCommentList();
	$('#deleteBtn').click(fn_boardDelete);

})


function fn_boardDelete() {
	let boardId = $('#boardId').text();

	if (confirm("게시글을 삭제하시겠습니까?")) {
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

}

function getCommentList() {
	console.log("getCommentList");
	
	let boardId = $('#boardId').text();
	
	$.ajax({
		type: "get",
		url: `/comment/` + boardId,
		dataType: "json",
		contentType: "application/json; charset-utf-8",
		success: function(list) {
			console.log("댓글 불러오기 성공", list);

		},
		error: function(error) {
			console.log("댓글 불러오기를 실패하였습니다. ", error);
		}
	});

}



