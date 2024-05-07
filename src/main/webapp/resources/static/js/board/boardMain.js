/**
 * main.js 
 */

$(document).ready(function() {
	// 1. 글 목록 가져오기 
	//getBoardList(0);

	// 2. 글 작성하기 
	$('#writeBtn').click(writeBoard);

	// 3. 글 상세보기로 이동

});

function getBoardList(pageNo) {
console.log("getBoardList()")
	pageNo = pageNo || 0;
	/*const board = JSON.stringify({
		"title": $('#title').val(),
		"content": $('#content').val(),
		"uploadFileUrl": $('#uploadFileUrl'),
		"commentCount": $('#commentCount').val(),
		"page": pageNo
	});*/

	const page = JSON.stringify({
		"page": pageNo
	});

	$.ajax({
		url: `/?page=${pageNo}`,
		type: "get",
		dataType: "json",
		success: function(response) {
			let data = response.data;
			console.log("data 응답 성공 : ", data);
			// ✅ 페이징 처리
/*			PAGE.paging(data.totalPages, data.number, data.totalElements, "getBoardList");
			console.log("data.totalPages :", data.totalPages);
			console.log("data.number : ", data.number);
			console.log("data.totalElements :", data.totalElements);
			
			resultTable(data);*/
			location.href="/list?page="+ pageNo;

		},
		
		error: function(error) {
			console.log("ERROR : ", error);
			alert("error 가 발생했습니다. : ", error);
		}
	})

}

// 초기화
function resetList() {
	document.querySelector("#title").value = "";
	document.querySelector("#writer").value = "";
	document.querySelector("#fieldListBody").innerHTML = "";

	getBoardList();
}


// 조회 후 처리
/*function afterGetList(response) {

	// ✅ 페이징 처리
	PAGE.paging(response.totalPages, response.number, response.totalElements, "getList");

	// 결과 테이블 생성
	resultTable(response);
}
*/

// 동적으로 테이블 생성
function resultTable(response) {
	document.querySelector("#fieldListBody").innerHTML = "";
	
	if (response.size > 0) {
		const content = response.content;
		
		// ✅ 반복문 변경 (Pageable 결과값을 기준으로 값 가져오기 위함)
		for (var i = 0; i < content.length; i++) {
			let element = document.querySelector("#fieldListBody");
 // <td><p>${PAGE.pageRowNumber(response.number, response.size, i, response.totalElements)}</p></td>
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


/* 게시글 작성 */
function writeBoard() {

	const board = JSON.stringify({
		"title": $('#title').val().trim(),
		"content": $('#content').val().trim(),
		"uploadFileUrl": $('#uploadFileUrl').val().trim(),
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



