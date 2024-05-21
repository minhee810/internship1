$(document).ready(function() {
	fileList();
})

function fileList() {
	ajaxCall(ajaxType.url.get, fileUrl, false, false,
		function(files) {
			console.log("file 요청 성공");
			console.log("files", files);
			loadFiles(files)
		},
		function(error) {
			handleError(error)
		});
}

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