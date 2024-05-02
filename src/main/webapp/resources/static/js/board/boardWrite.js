/**
 * boardWrite.js 
 */

$('#insertBtn').on('click', function(event) {

	event.preventDefault();
	maxlengthCheck();
	
	var title = $('#title').val();
	var content = $('textarea#content').val();
	console.log("content : ", content);


	if (title.trim() === '') {
		alert('제목을 입력해주세요.');
		return false;
	}
	if (content.trim() === '') {
		alert('내용을 입력해주세요.');
		return false;
	}
	

	if (confirm("게시 글을 저장하시겠습니까?") == true) {
		document.writeForm.submit();
		
	} else {
		return false;
	}
})


function maxlengthCheck() {
	var content = $('textarea#content').val();
	
	if (content.length > 100000) {
		alert("본문 내용은 100,000자 이내여야 합니다.");
		return false;
	}
}

function uploadMultipleFiles(files){

}

