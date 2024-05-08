/**
 * boardDetail.js 
 */


$(document).ready(function() {
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

function getCommentList() {

	console.log("getCommentList");

	let boardId = $('#boardId').text();

	$.ajax({
		type: "get",
		url: `/comment/`,
		data: { boardId: boardId },
		dataType: "json",
		contentType: "application/json; charset-utf-8",
		success: function(list) {
			console.log("댓글 불러오기 성공", list);

			createTable(list);

		},
		error: function(error) {
			console.log("댓글 불러오기를 실패하였습니다. ", error);
		}
	});

}

function createTable(list) {
	document.querySelector('#replyForm').innerHTML = ""; // html 요소 전부 초기화되고 대입해준 값으로 대체

	let data = list.data;

	console.log(data.length);

	let element = `
    <input type="hidden" id="boardId" name="boardId" value="">
    <input type="hidden" name="parentCommentNo" value="0">
    <input type="hidden" name="commentNo" value="0">
	<ul id="commentDiv" style="max-height: 500px; overflow-y: scroll;overflow-x: hidden;">
	`;
	element = document.querySelector('#replyForm');

	if (data.length > 0) {
		for (var i = 0; i < data.length; i++) {
			let result = data[i];
			let dateTime = getFormattedDate(result.createdDate);

			let template = `<div class="commentDiv" style="padding-left: ${result.depth}rem;">`
			template += `<div class="commentHead">`;
			template += `<div class="commentHead1">`;
			template += `<div class="commentName"><p>@${result.username}</p></div>`;
			template += `<div class="commentDate"><p>${dateTime}</p></div>`;
			template += `</div>`;
			template += `<div class="commentHead2">`;
			template += `<a href="#" class="commentReply">답글</a>`;


			template += `<a onclick ='commentUpdateForm(${result.commentId})' class="commentModify">수정</a>`;

			template += `<a onclick ='commentDelete(` + result.commentId + `)' class="commentRemove">삭제</a>`;
			console.log("댓글 아이디 : ", result.commentId);
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

		element += '</ul>';
	}
}

/*$('#commentForm').submit(function(event) {
	event.preventDefault();
	commentSubmit();
	// ajax

	
	// fetchNewComment();
});*/

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


function commentUpdateForm() {
	console.log("commentUpdateForm () 호출");
}

function commentUpdate(id) {

	{

		$.ajax({
			type: "PUT",
			url: "/comment/" + commentId,
			data: JSON.stringify({
				"commentId": commentId,
				"content": comment,
			}),
			contentType: "application/json; charset=utf-8",
			success: function(data) {
				alert(data);
				getComment();
				$('.' + id + 'ucommentContentCheck').text('');
			},
			error: function(status) {
				$(status.responseJSON).each(function() {
					$('.' + id + 'ucommentContentCheck').text(this.message);
				})
			}
		});
	}
}



function commentDelete(commentId) {
	console.log(" delete commentId === > ", commentId);

	if (confirm("정말로 삭제하시겠습니까?")) {

		$.ajax({
			type: "put",
			url: "/comment/delete/" + commentId,
			contentType: "application/json; charset=utf-8",
			success: function(response) {
				alert('댓글이 삭제되었습니다.');
				console.log("response : ", response);
				getCommentList();
			}
			,
			error: function(error) {
				alert("ERROR :", error);
			}
		});

	}
}

function commentSubmit() {
	console.log("commentSubmit 호출");

	let data = $('#commentForm').serialize();

	console.log("data : ", data);

	$.ajax({
		type: "post",
		url: "/comment",
		data: data,
		dataType: "json",
		contentType: "application/json; charset=utf-8", // 서버로 데이터를 보낼 떄에 어떤 타입으로 보낼 것인지 지정
		success: function(response) {
			alert('댓글이 작성되었습니다.');
			console.log("SUCCESS : ", response);
			getCommentList();
		},
		error: function(error) {
			alert("ERROR : ", error);
		}

	})
}



