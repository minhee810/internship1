// 페이지 로딩 시 호출되는 함수
$(document).ready(function() {
	getCommentList();
	$('#deleteBtn').click(fn_boardDelete);
	$('#commentSaveBtn').click(commentSubmit);
})

// 게시글 삭제
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

// 1. 댓글 조회 
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

// 댓글 전체 리스트를 화면에 동적으로 그려주는 함수
function createTable(data) {
	let list = data.data;
	let element = document.querySelector('#replyForm ul');
	$('#replyForm ul').html('');
	if (list.length > 0) {
		for (var i = 0; i < list.length; i++) {
			let result = list[i];
			let dateTime = getFormattedDate(result.createdDate);
			// template 변수에 li 안의 값을 문자열로 더해준다. (+=) 
			let template = `<li class="commentData" data-no="${result.commentId}" 
													data-boardId="${result.boardId}" 
													data-writer="${result.writer}" 
													data-no="${result.commentId}" 
													data-depth="${result.depth}"
													data-name="${result.username}"  
													data-date="${result.createdDate}" 
													data-parent="${result.parentId}"
													data-parentName="${result.parentUsername}">
											
							<div class="commentDiv" data-depth="${result.depth}" style="padding-left: ${result.depth}rem;">`;

			template += `<div class="commentHead">`;
			template += `<div class="commentHead1">`;

			// 대댓글일 경우 'ㄴ' 붙이고 싶다. 
			if (result.isDeleted == 0) {


				template += `<div class="commentName"><p>@${result.username}</p></div>`;
				template += `<div class="commentDate"><p>${dateTime}</p></div>`;
				template += `</div>`;
				template += `<div class="commentHead2">`;

				if (result.principal == 0) {
					template += `<a href="#" class="commentReply" onclick="commentAddView('${result.username}' ,${result.commentId}, ${result.writer})">답글</a>`; // check 

				} else if (result.principal == 1) {
					template += `<a onclick ="commentCreateView('${result.username}', ${result.commentId} ,${result.writer}, 'modify')" class="commentModify">수정</a>`; // check 
					template += `<a class="commentReply" onclick="commentCreateView('${result.username}', ${result.commentId}, ${result.writer}, 'reply')">답글</a>`; // check  
					template += `<a onclick ='commentDelete(` + result.commentId + `, ` + result.writer + `)' class="commentRemove">삭제</a>`; // check
					template += `<a class="commentCancle" style="display:none;">취소</a>`;

				} else if (result.principal == 2) {
				}
				template += `</div>	`;
				template += `</div>`;
				template += `<div class="comment">  `;

				// 깊이가 0이 아닌 경우 
				if (result.depth != 0) {
					template += `
					ㄴ <em class="txt-mention"> @${result.parentUsername} </em><div id="commentContent"><p>${result.commentContent}</div></p>
				</div>`;
				} else {
					template += `<div id="commentContent"><p> ${result.commentContent}</p></div>`;
				}

			} else if (result.isDeleted == 2) {
				template += `<div id="commentContent"><p>삭제된 댓글입니다.</p></div>`;
			} else if (result.isDeleted == 1) {
				template += `<div id="commentContent"><p>삭제된 댓글입니다.</p></div>`;
			}
			template += `</div>`;
			template += `</div>`;
			template += '</li>';
			template += `<hr class="sidebar-divider d-none d-md-block">`;

			element.insertAdjacentHTML('beforeend', template);
		}
	}
}

// 댓글 작성
function commentSubmit(e) {
	e.preventDefault();

	console.log("commentSubmit 호출");

	// input 태그의 name 속성이 boardId 인 것의 값을 가져옴.
	var boardId = $('input[name="boardId"]').val();
	var commentContent = $('textarea#inputComment').val().trim();

	let data = {
		"boardId": boardId,
		"commentContent": commentContent
	}

	if (commentContent == "") {
		alert("댓글 내용을 작성해주세요");
		$('textarea#inputComment').focus;
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

			$('textarea#inputComment').val(""); // 댓글 입력 창 비우기
			getCommentList()

		},
		error: function(error) {
			alert("ERROR : ", error);
		}
	})
}

function commentCreateView(username, commentId, writer, req) {

	var existingAddForm = document.querySelector('.commentForm');

	if (existingAddForm) {
		return;
	}
	var commentDiv = document.querySelector(`li[data-no="${commentId}"] .commentDiv`);
	var commentHead = document.querySelector(`li[data-no="${commentId}"] .commentHead`);
	var comment = document.querySelector(`li[data-no="${commentId}"] .comment`);

	let template = document.querySelector('#modifyAddForm');
	let newContent = document.importNode(template.content, true);

	if (req == "reply") {
		let usernameDiv = newContent.querySelector('#id');
		usernameDiv.textContent = "ㄴ To.  @ " + username;
	}

	if (req == "modify") {
		var commentContent = commentDiv.querySelector('#commentContent p').innerText;
		var commentTextArea = newContent.querySelector('#commentContent');
		commentTextArea.textContent = commentContent;
		console.log("commentTextArea : ", commentTextArea);
	}
	let submitButton = newContent.querySelector('#submitButton');
	submitButton.setAttribute('onclick', `commentAdd(` + commentId + `, '` + req + `')`);

	if (req == "reply") {
		commentDiv.appendChild(newContent);
	}
	if (req == "modify") {
		commentDiv.appendChild(newContent);
		comment.style.display = 'none';
		commentHead.style.display = 'none';
	}

}

function cancelView() {
	// 수정 창 닫기
	var commentEditForm = document.querySelector('.commentForm');
	commentEditForm.parentElement.removeChild(commentEditForm);

	// 원래 댓글 보이도록 함
	var commentDiv = document.querySelector('.commentDiv');
	commentDiv.style.display = '';
	getCommentList();
}


// 대댓글 저장 기능
function commentAdd(commentId, str) {
	event.preventDefault();
	let parentId = commentId;
	let depth = $(`li[data-no="${commentId}"]`).data('depth');
	let boardId = $(`li[data-no="${commentId}"]`).data('boardid');

  	console.log("boardId : ", boardId);
	// input 태그의 name 속성이 boardId 인 것의 값을 가져옴.
	var commentContent = $('textarea#commentContent').val().trim();

	let formData = $('#modifyAddForm').serialize();
	formData += "&parentId=" + parentId;
	formData += "&depth=" + depth;
	formData += "&boardId=" + boardId;
	formData += "&commentId=" + commentId;

	if (commentContent == "") {
		alert("내용을 작성해주세요");
		$('textarea#commentContent').focus;
		return false;
	}

	if (str == 'reply') {
		ajaxCall('POST', '/comment/reply', formData, "json", function(response) {
			alert('댓글이 작성되었습니다.');
			$('textarea#commentContent').val(""); // 댓글 입력 창 비우기
			getCommentList();
		}, function(error) {
			alert("ERROR : ", error);
		});
	}

	if (str == 'modify') {
		ajaxCall('PUT', '/comment', formData, "json", function(response) {
			if (response.code == -1) {
				alert("FAIL : 댓글 작성에 실패하였습니다.");
			} else if (response.code == -99) {
				alert("EXCEPTION :댓글 작성 중 예외가 발생했습니다.");
			} else if (response.code == 1) {
				alert("댓글을 수정했습니다.");
			}
			cancelView();
			getCommentList();
		}, function(error) {
			alert("ERROR : ", error);
		})
	}
}


