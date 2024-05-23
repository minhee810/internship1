const commentContentEl = $('textarea#commentContent');
const boardIdEl = $('#boardId');
// 페이지 로딩 시 호출되는 함수
$(document).ready(function() {
	getCommentList();
	$('#deleteBtn').click(fn_boardDelete);
	$('#commentSaveBtn').click(commentSubmit);
})

// 게시글 삭제
function fn_boardDelete() {
	let boardId = boardIdEl.text();

	if (!confirm(makeMessage(boardIdEl, messageEx.delete.pre))) {
		return false;
	}
	ajaxCall("POST", "/board/delete/" + boardId, false, deleteResp, handleError);
}

function deleteResp(response) {
	if (response.code == 1) {
		alert(makeMessage(boardIdEl, messageEx.delete.post));
		location.href = "/";
	}
}

// 댓글 조회 get
function getCommentList() {
	var boardId = boardIdEl.text();
	ajaxCall("GET", '/comment/' + boardId, false, function(response) { createTable(response); }, handleError);
}


// 댓글 전체 리스트를 화면에 동적으로 그려주는 함수
function createTable(data) {

	let list = data.data;
	let element = document.querySelector('#replyForm ul');

	$('#replyForm ul').html('');
	if (list.length > 0) {
		for (var i = 0; i < list.length; i++) {
			let result = list[i];
			let dateTime = getFormattedDate(result.createdDate);
			let fmtCommentresult = result.commentContent.replace(keyword.textarea, '<br>');
			// template 변수에 li 안의 값을 문자열로 더해준다. (+=) 
			let template = `<li class="commentData" data-no="${result.commentId}" 
													data-boardId="${result.boardId}"	
													data-title="댓글"
													data-depth="${result.depth}"
													>
						<div class="commentDiv" data-depth=${result.depth} style="padding-left: ${result.depth}rem;">`;
			template += `<div class="commentHead">`;
			template += `<div class="commentHead1">`;

			// 대댓글일 경우 'ㄴ' 붙이고 싶다. 
			if (result.isDeleted == 0) {
				template += `<div class="commentName"><p>@${result.username}</p></div>`;
				template += `<div class="commentDate"><p>${dateTime}</p></div>`;
				template += `</div>`;
				template += `<div class="commentHead2">`;

				if (result.principal == 0) {
					template += `<a href="#" class="commentReply" onclick="commentCreateView('${result.username}', ${result.commentId},'reply')">답글</a>`;// check 

				} else if (result.principal == 1) {
					template += `<a onclick ="commentCreateView('${result.username}', ${result.commentId}, 'modify')" class="commentModify">수정</a>`; // check 
					template += `<a class="commentReply" onclick="commentCreateView('${result.username}', ${result.commentId}, 'reply')">답글</a>`; // check  
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
					ㄴ <em class="txt-mention"> @${result.parentUsername} </em><div id="commentContent"><p>${fmtCommentresult}</div></p>
				</div>`;
				} else {
					template += `<div id="commentContent"><p> ${fmtCommentresult}</p></div>`;
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
	var commentContent = commentContentEl.val().trim();

	let data = $('#commentForm').serialize();

	// form data -> serialize = string -> stringify =string 
	if (!isRequired(commentContent)) {
		alert(makeMessage(commentContentEl, messageEx.fail.null));
		$('textarea#commentContent').focus;
		return false;
	}

	ajaxCall("POST", "/comment", data,
		function(response) {
			alert(makeMessage(commentContentEl, messageEx.save.post));
			$('textarea#commentContent').val(""); // 댓글 입력 창 비우기
			getCommentList();
		}, handleError);
}

// 댓글 작성 화면 생성
function commentCreateView(username, commentId, req) {

	var existingAddForm = document.querySelector('.commentForm');

	if (existingAddForm) {
		return;
	}
	var commentDiv = document.querySelector(`li[data-no="${commentId}"] .commentDiv`);
	var commentHead = document.querySelector(`li[data-no="${commentId}"] .commentHead`);
	var comment = document.querySelector(`li[data-no="${commentId}"] .comment`);

	// 템플릿 활용하기 위해 가져오기
	let template = document.querySelector('#modifyAddForm');
	// 템플릿요소의 콘텐츠를 복사해서 새로운노드로 가져오기 위함 (쉽게말해 비활성화 되어있는 template을 활성화하는 과정)
	let newContent = document.importNode(template.content, true);

	if (req == "reply") {
		let usernameDiv = newContent.querySelector('#id');
		usernameDiv.textContent = "ㄴ To.  @ " + username;
	}

	if (req == "modify") {
		var commentContent = commentDiv.querySelector('#commentContent p').innerText;
		var commentTextArea = newContent.querySelector('#commentContent');
		commentTextArea.textContent = commentContent;
		commentTextArea.setAttribute('data-title', "댓글 내용");
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

// 댓글 수정, 대댓글 저장 기능
function commentAdd(commentId, str) {

	let parentId = commentId;
	let depth = $(`li[data-no="${commentId}"]`).data('depth');
	let boardId = $(`li[data-no="${commentId}"]`).data('boardid');
	let commentContentEl = $('textarea#commentContent');

	// input 태그의 name 속성이 boardId 인 것의 값을 가져옴.
	var commentContent = commentContentEl.val().trim();
	let data = $('#modifyAddForm').serialize();
	data += "&parentId=" + parentId;
	data += "&depth=" + depth;
	data += "&boardId=" + boardId;
	data += "&commentId=" + commentId;

	if (!isRequired(commentContent)) {
		alert(makeMessage(commentContentEl, messageEx.fail.null));
		$('textarea#commentContent').focus;
		return false;
	}

	if (str == 'reply') {
		ajaxCall('POST', '/comment/reply', data,
			function(response) {
				alert(makeMessage(commentContentEl, messageEx.save.post));
				$('textarea#commentContent').val(""); // 댓글 입력 창 비우기
				getCommentList();
			}, handleError);
	}
	if (str == 'modify') {
		ajaxCall("PUT", "/comment", data, modifyResp, handleError);
	}
}


// 댓글 작성 창 취소 
function cancelView() {
	// 수정 창 닫기
	var commentEditForm = document.querySelector('.commentForm');
	commentEditForm.parentElement.removeChild(commentEditForm);

	// 원래 댓글 보이도록 함
	var commentDiv = document.querySelector('.commentDiv');
	commentDiv.style.display = '';
	getCommentList();
}


function modifyResp(response) {
	alert("댓글을 수정했습니다.");
	getCommentList();
}

function commentDelete(commentId) {

	let boardId = $('input[name="boardId"]').val();
	let data = {
		commentId: commentId,
		boardId: boardId,
	}

	if (!confirm(makeMessage(commentContentEl, messageEx.delete.pre))) {
		return false;
	}

	ajaxCall('PUT', '/comment/delete', data,
		function(response) {
			alert(response.msg);
			getCommentList();
		}, handleError);
}