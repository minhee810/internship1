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
			let template = `<li class="commentData" data-no="${result.commentId}" data-boardId="${result.boardId}" 
											data-writer="${result.writer}" data-no="${result.commentId}" data-name="${result.username}" 
											data-date="${result.createdDate}" data-parent="${result.parentId}"
											data-writer ="${result.writer}" >
							<div class="commentDiv" style="padding-left: ${result.depth}rem;">`;
			console.log(template);
			template += `<div class="commentHead">`;
			template += `<div class="commentHead1">`;

			if (result.isDeleted == 0) {
				template += `<div class="commentName"><p>@${result.username}</p></div>`;
				template += `<div class="commentDate"><p>${dateTime}</p></div>`;
				template += `</div>`;
				template += `<div class="commentHead2">`;

				console.log("작성자와 로그인한 사용자의 정보와 일치하는지 결과 : ", result.principal);

				// 로그인한 사용자일 경우
				if (result.principal == 0) {
					template += `<a class="commentReply" onclick="commentAddView(${result.commentId}, ${result.writer})">답글</a>`; // check 
					console.log("template : ", template);
				}

				// 글 작성자와 로그인 사용자의 정보가 일치할 때 수정, 삭제 가능하도록
				if (result.principal == 1) {

					template += `<a class="commentReply" onclick="commentAddView(${result.commentId}, ${result.writer})">답글</a>`; // check  
					console.log("template : ", template);
					console.log("result.username : ", result.username);

					template += `<a onclick ='modifyView( ` + result.commentId + `,` + result.writer + `)' class="commentModify">수정</a>`; // check 
					template += `<a onclick ='commentDelete(` + result.commentId + `, ` + result.writer + `)' class="commentRemove">삭제</a>`; // check
					template += `<a class="commentCancle" style="display:none;">취소</a>`;
				}

				template += `</div>	`;
				template += `</div>`;
				template += `<div class="comment">  `;
				template += `<div id="commentContent"><p>${result.commentContent}</p></div>`;
			} else if (result.isDeleted == 2) {
				template += `<div id="commentContent"><p>삭제된 댓글입니다.</p></div>`;
			} else if (result.isDeleted == 1) {
				template += `<div id="commentContent"><p>삭제된 댓글입니다.</p></div>`;
			}
			template += `</div>`;
			template += `</div>`;
			template += `<hr class="sidebar-divider d-none d-md-block">`;
			template += '</li>';

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
function commentSubmit() {

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
			createTable(res);

		},
		error: function(error) {
			alert("ERROR : ", error);
		}
	})
}


function modifyView(commentId, writer) {
	// 수정할 댓글의 ID를 사용하여 해당 댓글의 내용을 가져옴
	var commentDiv = document.querySelector(`li[data-no="${commentId}"] .commentDiv`);
	var commentContent = commentDiv.querySelector('#commentContent p').innerText;

	// 댓글 내용을 수정할 수 있는 입력 창 생성
	var editTemplate = `
        <div class="commentEditForm">
            <textarea id="editCommentContent"  cols="30" row="5" name="inputComment" class="form-control flex" style="width: 90%" placeholder="내용" maxlength="300">${commentContent}</textarea>
            <a class="commentAdd flex" style="width: 10%">
           
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
			getCommentList(res);
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
}


// 댓글 삭제
function commentDelete(commentId, writer) {

	let boardId = $('input[name=boardId]').val();


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
				let code = response.code;

				if (code == -1) {
					alert(response.msg);

				} else if (code == 1) {
					alert('댓글이 삭제되었습니다.');
					console.log("response : ", response);
					// 삭제된 댓글은 글씨를 출력하는 것이 아닌, is deleted 가 1이면 "삭제된 댓글입니다." 라고 출력하기 
					// 댓글 삭제 후 새로고침 
					location.href = "/board/detail/" + boardId;
				} else if (code == -99) {
					alert(response.msg);
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
/*function getJSPAndRender() {
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
*/

// 댓글 작성 후 화면에 그려주는 함수 
/*function createComment(res) {

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
*/

// 대댓글 작성 화면 작성 
function commentAddView(commentId, writer) {
	let username = $('.commentData').data('name');
	console.log("대댓글 작성 화면으로 넘어오는지 확인!!!!!!!!!")
	console.log("username : ", username);
	console.log("commentId : ", commentId);
	console.log("writer : ", writer);

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
				<input type="text" class="mini3" id=id name="id" value=" @${username}" readonly/>
				</label>
	            <button class="btn btn-primary btn float-right ml-1" onclick="cancelCommentAdd()">취소</button>
				<button class="btn btn-primary btn float-right ml-1" onclick="commentAdd(${commentId}, ${writer}, event)">완료</button>

			 </div>
			 <input type="hidden" name="boardId" value="">
            <textarea id="commentAddContent"  cols="30" row="5" name="inputComment" class="form-control flex" style="width: 90%" placeholder="대댓글 내용을 작성해주세요." maxlength="300"></textarea>
            <a class="commentAdd flex" style="width: 10%">
                   	</a>
                   	</div>
        </form>
        </div>
    `;

	// 수정할 댓글 위치에 입력 창 삽입
	commentDiv.insertAdjacentHTML('beforeend', commentAddTemplate); 
	
	//마지막 요소 뒤에 삽입 
	console.log("commentAddTemplate :  ", commentAddTemplate);

	// 입력창은 보이게 하고 기존의 창은 안보이도록 설정하기 
	//commentDiv.style.display = 'none';

}

function cancelCommentAdd() {
	// 수정 창 닫기
	var commentAddForm = document.querySelector('.commentAddForm');
	commentAddForm.parentElement.removeChild(commentAddForm);

	// 원래 댓글 보이도록 함
	var commentDiv = document.querySelector('.commentDiv');
	commentDiv.style.display = '';
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

