function maxlengthCheck(element, maxLength) {
	var content = element.value();
	if (content.length > maxLength) {
		alert("본문 내용은 100,000자 이내여야 합니다.");
		return false;
	}
}

$(document).ready(function() {
	$('#insertBtn').click(writeBoard);
});

function writeBoard(event) {
	event.preventDefault();

	var title = $('#title');
	var element = $('#board');
	var content = $('textarea#content');
	const fields = [title, content];

	console.log(title.val(), content.val());

	if (!validateFields(fields)) {
		return false;
	}

	if (!confirm(makeMessage(element, messageEx.save.pre))) {
		return false;
	}
	
	var data = new FormData($('#writeForm')[0]);
	
 	let data1 = $('#writeForm');
 	
	console.log("data1 : ", data1);
	console.log("data : ", data);

	ajaxCall("POST", "/board/write", data,
		function(response) { saveSuccess(response, "/") },
		handleError,
		false,
		false,
		600000);
}

// file 목록 수정
let selectedFiles = [];

function test(files) {

	console.log(files);
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
