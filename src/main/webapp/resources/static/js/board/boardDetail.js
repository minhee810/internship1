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
	let list = data.data

	// replyForm 을 선택하고, ul태그 까지 잡아서 element 화 시킴.
	let element = document.querySelector('#replyForm ul');

	// 그리고 html 요소 전부 초기화
	// element.insertAdjacentHTML(""); // element 초기화 
	$('#replyForm ul').html('');
	// innerHTML, innerText : 단순한 텍스트만 다룰 경우에는 차이가 없고 다루는 속성에 따라서 다름. 속도가 느리고 외부 공격에 취약
	// innerHTML : 대상이 element 일 경우 사용 
	// insertAdjacentElement : 가독성 확보, 월등한 성능을 지님. 사용 권장
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

				// 로그인한 사용자일 경우 TRUE가 아닐 경우 FALSE 경우 로그인 사용자와 글 작성자 정보가 다를 경우  
				if (result.principal == 0) {
					// 해당 글의 작성자 정보를 넘김
					template += `<a href="#" class="commentReply" onclick="commentAddView('${result.username}' ,${result.commentId}, ${result.writer})">답글</a>`; // check 

					// 작성자와 로그인 한 사람의 정보가 다르면 답글 기능은 보여주기 
					// 로그인 하지 않은 사용자라면 답글 버튼도 안보이게 
					// 글 작성자와 로그인 사용자의 정보가 일치할 때 수정, 삭제 가능하도록
				} else if (result.principal == 1) {
					template += `<a class="commentReply" onclick="commentAddView('${result.username}', ${result.commentId}, ${result.writer})">답글</a>`; // check  
					template += `<a onclick ='modifyView( ` + result.commentId + `,` + result.writer + `)' class="commentModify">수정</a>`; // check 
					template += `<a onclick ='commentDelete(` + result.commentId + `, ` + result.writer + `)' class="commentRemove">삭제</a>`; // check
					template += `<a class="commentCancle" style="display:none;">취소</a>`;

				} else if(result.principal == 2) {

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

			// append : 가장 마지막 요소에 추가됨.
			// insertAdjacentHTML : 다양한 위치에 요소를 삽입할 수 있다.  
			// tamplate 를 element화 시켜서 element 에 추가시켜준다. 
			// beforebegin : targetElement 외부 앞 (트리요소의 부모가 있는 경우에만 작용)
			// afterbegin : targetElement 내부의 첫번째 자식 
			// beforeend : targetElement 외부의 마지막 자식 뒤 
			// afteremd : targetElment 외부 뒤 (트리 요소의 부모가 있는 경우에만 작동) 
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


function modifyView(commentId, writer) {

	var existingEditForm = document.querySelector('.commentEditForm');

	if (existingEditForm) {
		return;
	}
	// 수정할 댓글의 ID를 사용하여 해당 댓글의 내용을 가져옴
	var commentDiv = document.querySelector(`li[data-no="${commentId}"] .commentDiv`);
	var commentContent = commentDiv.querySelector('#commentContent p').innerText;

	// 댓글 내용을 수정할 수 있는 입력 창 생성
	var editTemplate = `
        <div class="commentEditForm">
            <textarea id="editCommentContent"  cols="30" row="5" name="inputComment" class="form-control flex" style="width: 90%" placeholder="내용" maxlength="300">${commentContent}</textarea>
            <a href="#" class="commentAdd flex" style="width: 10%">
            <button class="btn btn-primary btn float-right ml-1" onclick="updateComment(${commentId}, ${writer}, event)">수정 완료</button>
            <button class="btn btn-primary btn float-right ml-1" onclick="cancelEdit()">취소</button>
        	</a>
        </div>
    `;

	// 수정할 댓글 위치에 입력 창 삽입
	commentDiv.insertAdjacentHTML('afterend', editTemplate);

	// 입력창은 보이게 하고 기존의 창은 안보이도록 설정하기 
	commentDiv.style.display = 'none';
}

// 댓글 수정 
function updateComment(commentId, writer, event) {

	var boardId = $('input[name="boardId"]').val();
	event.preventDefault();
	// 수정된 댓글 내용을 가져오기
	var commentContent = document.getElementById('editCommentContent').value;


	let data = {
		commentContent: commentContent,
		commentId: commentId,
		writer: writer,
		boardId: boardId
	}
	// 수정한 정보 서버로 보내는 ajax 
	$.ajax({
		type: "put",
		url: "/comment",
		data: JSON.stringify(data),
		dataType: "json",
		contentType: "application/json; charset=utf-8", // 서버로 데이터를 보낼 떄에 어떤 타입으로 보낼 것인지 지정
		success: function(res) {
			if (res.code == -1) {
				alert("FAIL : 댓글 작성에 실패하였습니다.");
			} else if (res.code == -99) {
				alert("EXCEPTION :댓글 작성 중 예외가 발생했습니다.");
			} else if (res.code == 1) {
				alert("댓글을 수정했습니다.");
				console.log("댓글 내용 : ", res);

			}
			// 수정 데이터를 받아와서 다시 뿌려라~ 
			// 성공적으로 업데이트되면 화면에 반영
			// 엘리먼트화 시킨 commentDiv 
			var commentDiv = document.querySelector(`li[data-no="${commentId}"] .commentDiv`);
			commentDiv.querySelector('#commentContent p').innerText = res.data.commentContent;

			// 수정 창 닫기
			cancelEdit();
			// 댓들 목록 불러오기
			getCommentList();
		},
		error: function(error) {
			alert("ERROR : ", error);
		}
	})
}

function cancelEdit() {
	// 수정 창 닫기
	var commentEditForm = document.querySelector('.commentEditForm');
	commentEditForm.parentElement.removeChild(commentEditForm);

	// 원래 댓글 보이도록 함
	var commentDiv = document.querySelector('.commentDiv');
	commentDiv.style.display = '';
	getCommentList();
}


// 댓글 삭제
function commentDelete(commentId, writer) {

	let boardId = $('input[name=boardId]').val();
	let data = { "boardId": boardId, "writer": writer };

	if (confirm("정말로 삭제하시겠습니까?")) {

		$.ajax({
			type: "put",
			url: "/comment/delete/" + commentId,
			data: JSON.stringify(data),
			contentType: "application/json; charset=utf-8",
			success: function(response) {
				let code = response.code;

				if (code == -1) {
					alert(response.msg);
					getCommentList();
				} else if (code == 1) {
					alert('댓글이 삭제되었습니다.');
					console.log("response : ", response);
					// 삭제된 댓글은 글씨를 출력하는 것이 아닌, is deleted 가 1이면 "삭제된 댓글입니다." 라고 출력하기 
					// 댓글 삭제 후 새로고침 
					// location.href = "/board/detail/" + boardId; -> 주소 줄에 데이터가 출력되는 문제가 발생
					getCommentList();
				} else if (code == -99) {
					alert(response.msg);
					getCommentList();

				} else {
					alert("댓글 삭제 중 예외가 발생했습니다.");
				}
			}
			,
			error: function(error) {
				alert("ERROR :", error);
			}
		});

	}
}

// 대댓글 작성 화면 작성 
function commentAddView(username, commentId, writer) {

	var existingAddForm = document.querySelector('.commentAddForm');

	if (existingAddForm) {
		return;
	}

	let boardId = $('.commentData').data('boardid');
	// 1. 해당 댓글 밑에 댓글 작성 칸 생성 
	// 2. 해당 댓글 작성자의 username 을 작성 칸 앞에 입력하여 사용자가 명시적으로 어떤 댓글에 답글 작성하고 있는지 보여주기 
	// 3. 답글 작성 완료 버튼 클릭 시 해당 부모의 댓글 아이디를 서버로 함께 전송하여 대댓글 정보 저장
	// 대댓글 정보 저장시 필요한 정보 1. parentId, 2. depth, 3. writer, 4.boardId, 5. commentConetent,  

	var commentDiv = document.querySelector(`li[data-no="${commentId}"] .commentDiv`);
	//var commentContent = commentDiv.querySelector('#commentContent p').innerText;

	// 댓글 내용을 수정할 수 있는 입력 창 생성
	var commentAddTemplate = `
        <div class="commentAddForm">
        <form action="" class="flex">
        <hr/>
			<div>
	         <div>
		        <label> ㄴ To. 
		        <input type="hidden" id="boardId" name="boardId" value="${boardId}">
				<input type="text" class="mini3" id=id name="id" value="@${username}" readonly/>
				</label>
	            <button class="btn btn-primary btn float-right ml-1" onclick="cancelCommentAdd()">취소</button>
				<button class="btn btn-primary btn float-right ml-1" onclick="commentAdd(${commentId}, ${writer}, event)">완료</button></div>
			 <input type="hidden" name="boardId" value="">
            <textarea id="commentAddContent"  cols="30" row="5" name="commentAddContent" class="form-control flex" style="width: 90%" placeholder="대댓글 내용을 작성해주세요." maxlength="300"></textarea>
            <a href="#" class="commentAdd flex" style="width: 10%">
             </a>
           </div>
        </form>
        </div>
    `;

	// 수정할 댓글 위치에 입력 창 삽입
	commentDiv.insertAdjacentHTML('beforeend', commentAddTemplate);

	// 입력창은 보이게 하고 기존의 창은 안보이도록 설정하기 
	//commentDiv.style.display = 'none';

}


function cancelCommentAdd(e) {
	e.preventDefault();
	var commentAddForm = document.querySelector('.commentAddForm');
	commentAddForm.parentElement.removeChild(commentAddForm);

	// 원래 댓글 보이도록 함
	var commentDiv = document.querySelector('.commentDiv');
	commentDiv.style.display = '';
}


// 대댓글 저장 기능
function commentAdd(commentId, writer, event) {
	event.preventDefault();
	// 댓글을 작성한 사람의 이름이 들어와야 해 그래야 
	console.log("======comment Add ========");
	// 필요한 정보 : 댓글 아이디 (ParentId) , 글번호, 대댓글 작성자 정보
	let parentId = commentId;
	let depth = $(`li[data-no="${commentId}"]`).data('depth');
	let boardId = $(`li[data-no="${commentId}"]`).data('boardid');

	// input 태그의 name 속성이 boardId 인 것의 값을 가져옴.
	var commentAddContent = $('textarea#commentAddContent').val().trim();

	let data = {
		"boardId": boardId,
		"commentContent": commentAddContent,
		"parentId": parentId,
		"depth": depth
	}

	if (commentAddContent == "") {
		alert("대댓글 내용을 작성해주세요");
		$('textarea#commentAddContent').focus;
		return false;
	}

	$.ajax({
		type: "post",
		url: "/comment/reply",
		data: JSON.stringify(data),
		dataType: "json",
		contentType: "application/json; charset=utf-8", // 서버로 데이터를 보낼 떄에 어떤 타입으로 보낼 것인지 지정
		success: function(res) {
			alert('댓글이 작성되었습니다.');
			console.log("SUCCESS : ", res);

			$('textarea#commentAddContent').val(""); // 댓글 입력 창 비우기
			getCommentList();
			// createTable(res);

		},
		error: function(error) {
			alert("ERROR : ", error);
		}
	})

}

// utils 로 옮기기 - 날짜 포맷팅 함수 
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

