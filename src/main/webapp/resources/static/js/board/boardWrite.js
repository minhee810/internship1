/**
 * boardWrite.js 
 */


function maxlengthCheck() {
	var content = $('textarea#content').val();

	if (content.length > 100000) {
		alert("본문 내용은 100,000자 이내여야 합니다.");
		return false;
	}
}

$(document).ready(function() {
	$('#insertBtn').click(function(event) {

		event.preventDefault();

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
		if (!confirm("저장하시겠습니까?")) {
			return;
		}

		var form = $('#writeForm')[0];
		var data = new FormData(form);

		$.ajax({
			type: 'POST',
			enctype: 'multipart/form-data',
			url: "/board/write",
			data: data,
			processData: false,
			contentType: false,
			cache: false,
			timeout: 600000,
			success: function(data) {
				console.log(data);
				location.href = "/";
				alert("저장되었습니다.");
				console.log('SUCCESS : ', data);
			},
			error: function(error) {
				console.log(error.code);
				let msg = error.msg;
				console.log("error : ", error);
				console.log('ERROR : ', msg);
				alert("저장에 실패하였습니다.", msg);
			}
		});

	});
});



// file 목록 수정
let selectedFiles = [];

function test(files) {

	console.log(files);
	const fileList = document.getElementById('file-list');

	for (let i = 0; i < files.length; i++) {
		selectedFiles.push(files[i]);
		const item = document.createElement('div');
		const fileName = document.createTextNode(files[i].name);
		const deleteButton = document.createElement('button');

		deleteButton.addEventListener('click', (event) => {
			item.remove();
			event.preventDefault();
			deleteFile(files[i]);
		});
		deleteButton.innerText = "X";
		item.appendChild(fileName);
		item.appendChild(deleteButton);
		fileList.appendChild(item);
	}
}

function deleteFile(deleteFile) {
	const inputFile = document.querySelector('input[name="files"]');
	const dataTransfer = new DataTransfer();
	// file을 filter를 통해 제외하여 변경 
	selectedFiles = selectedFiles.filter(file => file !== deleteFile);
	selectedFiles.forEach(file => {
		dataTransfer.items.add(file);
	})
	inputFile.files = dataTransfer.files;
}
