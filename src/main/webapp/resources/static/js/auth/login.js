import { validator } from "./joinValidation.js";


// enter 이벤트 
var input = document.getElementById("loginBtn");

input.addEventListener("keyup", function(event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		document.getElementById("loginBtn").click();
	}
})


$('#loginBtn').click(function() {

	var email = $('#email').val();
	var password = $('password').val();

	if (email == "") {
		alert("이메일을 입력하세요");
		email.focus();
		return false;
	}

	if (!validator.emailRegExp) {
		alert("이메일 형석으로 작성해주세요.");
		email.focus();
	}
	if (password == "") {
		alert("비밀번호를 입력하세요");
		password.focus();
		return false;
	}

});



/**
 * 비동기로 사용자 입력 후 keyup 이벤트로 유효성 검사 하기 
 */
$(document).ready(function(e) {

	$('#email').change(function() {
		var email = $('#email').val();

		if (!validator.emailRegExp.test(email)) {
			alert("이메일 형식으로 작성해주세요.");
			email.focus();
			return false;
		}
	})

	if (localStorage.checkbox && localStorage.checkbox !== "") {
		$('#rememberId').attr('checked', 'checked');
		document.getElementById("email").value = localStorage.email;
		// email = localStorage.email;

	} else {
		$('#rememberId').removeAttr('checked');
		$('#email').val('');
	}

	$('#rememberId').click(function() {

		if ($('#rememberId').is(':checked')) {
			localStorage.email = $('#email').val();
			localStorage.checkbox = $('#rememberId').val();

		} else {
			localStorage.email = '';
		}
	})

})


/**
 * 로그인 버튼 클릭시
 * 1. post 요청 login return 사용자 정보 받기 
 * 2. return 받는 값이 false일 경우 alert 잘못된 비밀번호, 이메일 
 */

$('#loginBtn').click(function() {

	const user = JSON.stringify({
		"email": $('#email').val().trim(),
		"password": $('#password').val().trim(),
	});

	$.ajax({

		url: "/auth/login",
		type: "post",
		data: user,
		dataType: "json",
		contentType: "application/json; charset-utf-8",
		//	context: document.body,
		success: function(data) {

			let code = data.code;
			console.log(data);
			console.log(code);
			if (code == 1) {
				alert("로그인 되었습니다.");
				location.href = "/";
				//location.reload(url);
			} else if (code == -1) {
				console.log(code);
				alert("이메일 혹은 비밀번호가 실패하였습니다.");
			}
		},

		error: function() {
			alert("서버 요청에 실패했습니다.");
		}
	})
})


function fn_isRememberId() {

	if (localStorage.checkbox && localStorage.checkbox !== "") {
		$('#rememberId').attr('checked', 'checked');
		$('#email').val('') = localStorage.email;

	} else {
		$('#rememberId').removeAttr('checked');
		$('#email').val('');
	}
}
