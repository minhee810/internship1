
function loginPage() {
	if (confirm("로그인을 진행하시겠습니까?")) {
		location.href = "/member/login";
	};
}

function getBoardList(pageNo) {
	pageNo = pageNo || 0;

	$.ajax({
		url: `/?page=${pageNo}`,
		type: "get",
		dataType: "json",
		success: function(response) {
			let data = response.data;
			console.log("data 응답 성공 : ", data);
			location.href = "/?page=" + pageNo;
		},
		error: function(error) {
			console.log("ERROR : ", error);
			alert("error 가 발생했습니다. : ", error);
		}
	})

}

/* 게시글 작성 */
function writeBoard() {

	const board = JSON.stringify({
		"title": $('#title').val(),
		"content": $('#content').val(),
		"uploadFileUrl": $('#uploadFileUrl').val(),
		"commentCount": $('#commentCount').val(),
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



