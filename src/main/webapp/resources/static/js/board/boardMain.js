/**
 * main.js 
 */

function loginPage() {
	if (confirm("로그인을 진행하시겠습니까?")) {
		location.href = "/member/login";
	};
}

function getBoardList(pageNo) {
	console.log("getBoardList()")
	pageNo = pageNo || 0;

	$.ajax({
		url: `/?page=${pageNo}`,
		type: "get",
		dataType: "json",
		success: function(response) {
			let data = response.data;
			console.log("data 응답 성공 : ", data);
			location.href = "/list?page=" + pageNo;
		},
		error: function(error) {
			console.log("ERROR : ", error);
			alert("error 가 발생했습니다. : ", error);
		}
	})

}
/*
// 초기화
function resetList() {
	document.querySelector("#title").value = "";
	document.querySelector("#writer").value = "";
	document.querySelector("#fieldListBody").innerHTML = "";

	getBoardList();
}
*/
/*
// 동적으로 테이블 생성
function resultTable(response) {
	document.querySelector("#fieldListBody").innerHTML = "";
	
	if (response.size > 0) {
		const content = response.content;
		
		// ✅ 반복문 변경 (Pageable 결과값을 기준으로 값 가져오기 위함)
		for (var i = 0; i < content.length; i++) {
			let element = document.querySelector("#fieldListBody");
			let result = content[i];
			let template = `
					<td><p>${result.username}</p></td>
					<td><a href="/board/detail/${result.boardId}">${result.title}</a></td>
					<td><p>${result.createdDate}</p></td>
					<td><p>${result.commentCnt}</p></td>
				`;
			element.insertAdjacentHTML('beforeend', template);
		}
	}
}
*/

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



