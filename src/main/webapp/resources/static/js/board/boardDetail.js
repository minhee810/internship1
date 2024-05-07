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
	document.querySelector('#replyForm').innerHTML = "";

	let data = list.data;
	
	console.log(data.length);

	if (data.length > 0) {
		for (var i = 0; i < data.length; i++) {
			let element = document.querySelector('#replyForm');
			let result = data[i];
			console.log("result", result);
			let template = `
    <li data-no="2" data-name="test" data-date="2024-04-01 12:45:26" data-parent="0">
        <div class="commentDiv" style="padding-left: 2rem;">
            <div class="commentHead">
				<div class="commentHead1"> 
					<div class="commentName"><p>@${result.writer}</p></div>
					<div><p>${result.createdDate}</p></td>
				</div>	
				<div class="commentHead2>
					<div class="commentReply">답글</div>
					<div class="commentModify">수정</div>
					<div class="commentRemove">삭제</div>
					<div class="commentCancle" style="display:none;">취소</div>
				</div>	
			    <div class="comment">    
					<p id="commentContent"><p>${result.content}</p>
				</div>
	         </div>
	    <hr class="sidebar-divider d-none d-md-block">
	</li>
				`;
			element.insertAdjacentHTML('beforeend', template);
		}
	}
}

$('#commentForm').submit(function(event) {
    event.preventDefault(); 

    // ajax

    // fetchNewComment();
});

