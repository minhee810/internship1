/**
 * boardDetail.js 
 */


$(document).ready(function() {
	//dataSet();
	getCommentList();
	$('#deleteBtn').click(fn_boardDelete);
	$('#commentSaveBtn').click(commentSubmit);

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


// 댓글 작성
function commentSubmit() {
	console.log("commentSubmit 호출");

	var boardId = $('input[name="boardId"').val();
	var commentContent = $('textarea#commentContent').val();

	let data = {
		"boardId": boardId,
		"commentContent": commentContent
	}

	if (commentContent.trim() == "") {
		alert("댓글 내용을 작성해주세요");
		$('textarea#commentContent').focus;
		return false;
	}

	$.ajax({
		type: "post",
		url: "/comment",
		data: JSON.stringify(data),
		dataType: "json",
		contentType: "application/json; charset=utf-8", // 서버로 데이터를 보낼 떄에 어떤 타입으로 보낼 것인지 지정
		success: function(res) {
			alert('댓글이 작성되었습니다.');
			console.log("SUCCESS : ", res);
			getJSPAndRender();

			// 댓글이 저장된 후, 새로운 데이터를 가져오기 위해 GET 요청 보내기

			// createComment(res.data);
			// $('textarea#commentContent').val("");
		},
		error: function(error) {
			alert("ERROR : ", error);
		}

	})
}

// 댓글 조회 
function getCommentList() {
	var id = $('#id').val();
	var writer = $('.commentDate').data('writer');
	var boardId = $('#boardId').text();

	console.log(id, writer);

	$.ajax({
		type: "get",
		url: `/comment/`,
		data: { boardId: boardId },
		dataType: "json",
		contentType: "application/json; charset-utf-8",
		success: function(data) {
			console.log("댓글 불러오기 성공", data);

			createTable(data);

		},
		error: function() {
			alert('댓글 조회 통신 실패');
		}
	});
};


function createTable(data) {
	document.querySelector('#replyForm').innerHTML = ""; // html 요소 전부 초기화되고 대입해준 값으로 대체

	let list = data.data;

	let element = ``;
	element = document.querySelector('#replyForm');

	if (data.length > 0) {
		for (var i = 0; i < data.length; i++) {
			let result = list[i];
			
			let dateTime = getFormattedDate(result.createdDate);
				console.log("아 정말 지루해 ")
			let template = `<div class="commentDiv" style="padding-left: ${result.depth}rem;">`
			template += `<div class="commentHead">`;
			template += `<div class="commentHead1">`;
			template += `<div class="commentName"><p>@${result.username}</p></div>`;
			template += `<div class="commentDate"><p>${dateTime}</p></div>`;
			template += `</div>`;

			if (id == list.commentId) {
				template += `<div class="commentHead2">`;
				template += `<a href="#" class="commentReply">답글</a>`; // check 
				template += `<a onclick ='commentUpdateForm(${result.commentId})' class="commentModify">수정</a>`; // check 
				template += `<a onclick ='commentDelete(` + result.commentId + `)' class="commentRemove">삭제</a>`; // check


				template += `<a class="commentCancle" style="display:none;">취소</a>`;
				template += `</div>	`;
				template += `</div>`;

				template += `<div class="comment">  `;
				template += `<div id="commentContent"><p>${result.commentContent}</p></div>`;

				template += `</div>`;
				template += `</div>`;
				template += `<hr class="sidebar-divider d-none d-md-block">`;

				element.insertAdjacentHTML('beforeend', template);
			}
			template += '</li>';
		}

		element += '</ul>';
	} else {
		element += '--등록된 댓글이 없습니다.--';
	}
}



// 댓글 수정
function commentUpdateForm() {
	console.log("commentUpdateForm () 호출");
}

function commentUpdate(commentId) {

}

// 댓글 삭제
function commentDelete(commentId) {

	let boardId = $('input[name=boardId]').val();
	let writer = $('.commentData').data('writer');

	console.log("boardId : ", boardId);
	console.log("writer : ", writer);

	let data = { "boardId": boardId, "writer": writer };

	if (confirm("정말로 삭제하시겠습니까?")) {

		$.ajax({
			type: "put",
			url: "/comment/delete/" + commentId,
			data: JSON.stringify(data),
			contentType: "application/json; charset=utf-8",
			success: function(response) {
				alert('댓글이 삭제되었습니다.');

				$.ajax({
					type: "get",
					url: "/comment/" + boardId,
					dataType: "html",
					success: function(data) {
						$('.card-footer').html(data);
						console.log(data);
					},
					error: function(error) {
						console.log(error);
					}

				})

				console.log("response : ", response);

			}
			,
			error: function(error) {
				alert("ERROR :", error);
			}
		});

	}
}

// 대댓글 수정
$('#replySaveBtn').click(function() {
	let replyComment = $('#replyComment').val();
	let boardId = $('.commentData').data('boardId');
	let writer = $('.commentData').data('writer');

	let data = {
		"replyComment": replyComment,
		"boardId": boardId,
		"writer": writer
	}
	$.ajax({
		type: "put",
		url: "/board/comment/" + boardId,
		data: JSON.stringify(data),
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(res) {
			alert("댓글 수정이 완료되었습니다.");
			console.log("SUCCESS : ", res);
		},
		error: function(error) {
			alert("댓글 수정을 실패했습니다.");
			console.log("ERROR : ", error);
		}
	})
})


// 댓글 작성 후 댓글 목록을 가져와서 화면에 출력하는 함수
function getJSPAndRender() {
	var boardId = $('input[name="boardId"').val();

	$.ajax({
		type: "get",
		url: "/comment/" + boardId, // 댓글 목록을 가져올 JSP 엔드포인트
		dataType: "html",
		success: function(htmlData) {
			// 받아온 JSP 데이터를 화면에 적용하여 리로드
			$("body").html(htmlData);
		},
		error: function(error) {
			console.error("JSP를 불러오는 중 에러가 발생했습니다:", error);
		}
	});
}


function createComment(res) {
	``
	let element = document.querySelector('#commentDiv');

	console.log("res : ", res.createdDate);
	let dateTime = getFormattedDate(res.createdDate);

	let template = `<li class="commentData" data-boardId="${res.boardId}" data-writer="${res.writer}" data-no="${res.commentId}" data-name="${res.username}" data-date="${res.createdDate}" data-parent="${res.parentId}"
											 data-writer ="${res.writer}">`;

	template += `<div class="commentDiv" style="padding-left: ${res.depth}rem;">`
	template += `<div class="commentHead">`;
	template += `<div class="commentHead1">`;
	template += `<div class="commentName"><p>@ ${res.username}</p></div>`;
	template += `<div class="commentDate"><p>${dateTime}</p></div>`;
	template += `</div>`;
	template += `<div class="commentHead2">`;
	template += `<div class="commentReply">답글</div>`;
	template += `<div class="commentModify">수정</div>`;
	template += `<div class="commentRemove" onclick ="commentDelete(${res.commentId})" >삭제</div>`;
	template += `<div class="commentCancle" style="display:none;">취소</div>`;
	template += `</div>	`;
	template += `</div>`;

	template += `<div class="comment">  `;
	template += `<div id="commentContent"><p>${res.commentContent}</p></div>`;

	template += `</div>`;
	template += `</div>`;
	template += `<hr class="sidebar-divider d-none d-md-block">`;

	element.insertAdjacentHTML('beforeend', template);


}


// utils 로 옮기기
function dateFormat(date) {
	var year = date.substring(0, 4);
	var month = date.substring(5, 7);
	var day = date.substring(8, 10);
	var fmtDate = year + '-' + month + '-' + day;

	return fmtDate;
}

function padTwoDigits(num) {
	return num.toString().padStart(2, "0");
}


function getFormattedDate(org) {
	const date = new Date(org);

	return (
		[
			date.getFullYear(),
			padTwoDigits(date.getMonth() + 1),
			padTwoDigits(date.getDate()),
		].join("-") +
		" " +
		[
			padTwoDigits(date.getHours()),
			padTwoDigits(date.getMinutes()),
			padTwoDigits(date.getSeconds()),
		].join(":")
	);
}

getFormattedDate(); // '2024-03-27 15:02:08'


