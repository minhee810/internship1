/**
 * 
 */


// file 정보 요청 및 html 에 뿌리기
$.ajax({
	type: "GET",
	url: fileUrl,
	success: function(files) {
		console.log("file 요청 ");
		console.log("files", files);
		loadFiles(files);
	},
	error: function(error){
		console.log("ERROR : ", error);
	}
})

function loadFiles(files) {
	const fileList = document.getElementById('file-list');
	for (let i = 0; i < files.length; i++) {
		const item = document.createElement('div');
		const fileName = document.createTextNode(files[i].orgFileName);
		const deleteButton = document.createElement('button');
		deleteButton.addEventListener('click', (event) => {
			item.remove();
			event.preventDefault();
			const deleteItem = document.createElement('input');
			deleteItem.setAttribute("name", "deletedFilesId");
			deleteItem.setAttribute("value", files[i].uploadFileId);
			
			console.log("files[i].uploadFileId => :", files[i].uploadFileId);
			
			deleteItem.setAttribute("type", "hidden");
			fileList.appendChild(deleteItem);
		});
		deleteButton.innerText = "X";
		item.appendChild(fileName);
		item.appendChild(deleteButton);
		fileList.appendChild(item);
	}
}
