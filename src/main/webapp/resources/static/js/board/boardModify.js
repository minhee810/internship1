$(document).ready(function() {
	fileList();
})

// 게시글 수정 시 기존의 게시글 파일 리스트 불러오기 
function fileList() {
	let boardId = $('#boardId').val();
	let url = "/board/files/" + boardId
	ajaxCall("GET", url, false,
		function(files) {
			loadFiles(files)
		},
		handleError);
}

// 게시글 수정 시 파일 목록 로드 
function loadFiles(files) {
	const fileList = document.getElementById('file-list');

	for (let i = 0; i < files.length; i++) {

		const item = document.createElement('div');
		item.classList.add('file-item');
		const fileName = document.createTextNode(files[i].orgFileName);

		const deleteButton = document.createElement('button');

		deleteButton.classList.add('delete-button');
		deleteButton.innerText = "X";

		deleteButton.addEventListener('click', (event) => {
			item.remove();
			event.preventDefault();

			const deleteItem = document.createElement('input');
			deleteItem.setAttribute("name", "deletedFilesId");
			deleteItem.setAttribute("value", files[i].uploadFileId);
			deleteItem.setAttribute("type", "hidden");

			fileList.appendChild(deleteItem);

			console.log("files[i].uploadFileId => :", files[i].uploadFileId);
		});

		item.appendChild(fileName);
		item.appendChild(deleteButton);
		fileList.appendChild(item);
	}
}