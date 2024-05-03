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
		
/*		data.append('customField', '추가필드');
		$('#insertBtn').prop('disabled', true);*/
		
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
				location.href = "/";
				alert("저장되었습니다.");
				console.log('SUCCESS : ', data);
			},
			error: function(e) {
				console.log('ERROR : ', e);
				alert("저장에 실패하였습니다.")
			}
		});

	});
});

function showFileName() {
	var input = document.getElementById('files');
	var label = document.getElementById('fileName');
	label.textContent = "";

	for (var i = 0; i < input.files.length; i++) {
		var fileName = input.files[i].name;
		var fileItem = document.createElement('div');
		fileItem.innerHTML = fileName + " <span style='color:red' onclick='removeFile(this)'> x </span>";	
		label.appendChild(fileItem); 
		}
}

// 파일 삭제 함수
function removeFile(button) {
	var fileName = button.parentElement.textContent.trim();
	button.parentElement.remove();

	var input = document.getElementById('files');
	
	for (var i = 0; i < input.files.length; i++) {
		if (input.files[i].name === fileName) {
			input.files.splice(i, 1);
			break;
		}
	}

}

    $(document).ready(function() {
        $("a[name='file-delete']").on("click", function(e) {
            e.preventDefault();
            deleteFile($(this));
        });
    })
 
    function addFile() {
        var str = "<div class='file-input'><input type='file' name='file'><a href='#this' name='file-delete'>삭제</a></div>";
        $("#file-list").append(str);
        $("a[name='file-delete']").on("click", function(e) {
            e.preventDefault();
            deleteFile($(this));
        });
    }
 
    function deleteFile(obj) {
        obj.parent().remove();
    }
