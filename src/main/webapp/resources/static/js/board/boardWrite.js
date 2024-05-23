$(document).ready(function() {
	$('#insertBtn').click(writeBoard);
});

// 게시글 작성
function writeBoard(event) {
	event.preventDefault();
	var element = $('#board');
	let elements = $('#title, textarea#content');
	var requiredCheck = checkFields(elements, "isRequired");
	if (requiredCheck !== true) {
		alert(makeMessage(requiredCheck[0], messageEx.fail.null));
		requiredCheck[0].focus();
		return false;
	}
	if (!confirm(makeMessage(element, messageEx.save.pre))) {
		return false;
	}
	var data = new FormData($('#writeForm')[0]);
	ajaxCall("POST", "/board/write", data,
		function(response) {
			alert(makeMessage(element, messageEx.save.post))
			location.href = "/"
		},
		handleError,
		false,
		false,
		600000);
}



// 파일 목록 화면에 불러오기
let selectedFiles = [];

function createFile(files) {

	const fileList = document.getElementById('file-list');

	for (let i = 0; i < files.length; i++) {
		selectedFiles.push(files[i]);
		const item = document.createElement('div');
		item.classList.add('file-item');
		const fileName = document.createTextNode(files[i].name);
		const deleteButton = document.createElement('button');
		deleteButton.classList.add('delete-button');
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

// 파일 목록에서 삭제 버튼 클릭시 
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
