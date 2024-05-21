let emailEl = $('#email');
const passwordEl = $('#password');

$(document).ready(function() {
	rememberId();
	// 이메일 필드 입력 이벤트 핸들러
	$('#email').on('input', function() {
		if ($('#rememberId').is(':checked')) {
			localStorage.email = $('#email').val();
		}
	});
})

// rememberID 기능 
function rememberId() {

	if (localStorage.email !== "") {
		//$('#rememberId').attr('checked', 'checked');
	
	// if (localStorage.checkbox && localStorage.checkbox !== "") {
		$('#rememberId').attr('checked', 'checked');
		document.getElementById("email").value = localStorage.email;
		email = localStorage.email;

	} else {
		$('#rememberId').removeAttr('checked');
		$('#email').val('');
	}
	
	$('#rememberId').click(function() {
		if ($('#rememberId').is(':checked')) {

			if ($('#email').val() === '') {
				alert('이메일을 입력해주세요.');
				$('#rememberId').prop('checked', false); // 체크박스 해제
			} else {
				localStorage.email = $('#email').val();
				//localStorage.checkbox = 'checked'; // 체크 상태 저장
			}
		} else {
			localStorage.email = "";
			//localStorage.checkbox = "";
		}
	})
}

// 로그인 기능 
$('#loginBtn').click(function() {
	var requiredCheckResult = checkRequiredFields();
	if (requiredCheckResult !== true) {
		alert(makeMessage(requiredCheckResult[0], messageEx.fail.null));
		requiredCheckResult[0].focus();
		return false;
	}
	login();
})

// 로그인
function login() {
	const data = JSON.stringify({
		"email": emailEl.val().trim(),
		"password": $('#password').val().trim(),
	});

	ajaxCall(ajaxType.url.post, "/member/login", data, ajaxType.contentType.json, loginResp, loginError);
}

function loginResp(response) {
	let code = response.code;
	if (code == 1) {
		alert("로그인 되었습니다.");
		location.href = "/";
	} else if (code == -1) {
		console.log(code);
		alert("이메일 혹은 비밀번호가 실패하였습니다.");
	}
}

function loginError(error) {
	let res = error.responseJSON;
	console.log(res);
	let msg = res.msg
	alert(msg);
}