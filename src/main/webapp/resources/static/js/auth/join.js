let usernameCheck = false;
let emailCheck = false;

window.addEventListener('load', () => $('#username').focus());

$(document).ready(function() {

	// 입력값 replace 함수 호출
	$("#username, #phone, #email").keyup((e) => regTest(e));

	// 사용자 아이디 유효성, 중복 검사 
	$("#username").change(checkDuplicateUsername);

	// 비밀번호 입력 확인 
	$("#password").change(pwCheck);

	// 비밀번호 확인 칸 바뀔때마다 확인
	$('#password_confirm').change(fn_passwordConfirm);

	// 휴대전화 번호 정규식 + '-' 형식
	$('#phone').change(fn_phoneCheck);

	// 이메일 중복 버튼 클릭시 중복 검사
	$('#emailCheck').click(fn_emailCheck);

});

// 아이디 유효성 검사 
function usernameRegTest(usernameEl, username) {

	usernameCheck = false;

	if (!isRequired(username)) {
		$("#id_feedback").html('');
		return false;
	}

	if (!ckeckRegExp("username", username)) {
		$("#id_feedback").html(makeMessage(usernameEl, hintMsg.username));
		$("#id_feedback").attr('color', '#dc3545');
		usernameCheck = false;
		return false;
	}
	return true;
}

// 아이디 중복 검사 
function checkDuplicateUsername() {
	let usernameEl = $('#username');
	let username = usernameEl.val();
	usernameCheck = false;

	if (!usernameRegTest(usernameEl, username)) {
		return false;
	}

	$.ajax({
		url: "/member/idCheck",
		type: "post",
		data: { username: username },
		dataType: "json",
		success: function(result) {

			if (result == 1) {
				$("#id_feedback").html(makeMessage(usernameEl, messageEx.dupe.username));
				$("#id_feedback").attr('color', '#dc3545');
				usernameCheck = false;

			} else {
				$("#id_feedback").html(makeMessage(usernameEl, messageEx.success.avail));
				$("#id_feedback").attr('color', '#2fb380');
				usernameCheck = true;
			}
		},
		error: function() {
			alert(messageEx.error);
		}
	})


}

// 이메일 중복확인 
function fn_emailCheck() {
	let emailEl = $('#email');
	let email = emailEl.val();

	$.ajax({
		url: "/member/emailCheck",
		type: "post",
		data: { email: email },
		dataType: "json",
		success: function(result) {

			fn_emailCheck = false;

			if (!isRequired(email)) {
				alert(makeMessage(emailEl, messageEx.fail.null));

			} else if (!ckeckRegExp("email", value)) {
				alert(makeMessage(emailEl, messageEx.fail.valid));
				emailEl.val(email);
				emailEl.focus();
				return false;

			} else if (result == 1) {
				alert(makeMessage(emailEl, messageEx.dupe.email));
				emailEl.focus();
				return false;

			} else if (result == 0) {
				alert(makeMessage(emailEl, messageEx.success.avail));
				emailCheck = true;
				return true;
			}
		},
		error: function(error) {
			console.log(error);
			alert(messageEx.error);

		}
	});
};


// 비밀번호 입력 확인
function pwCheck() {
	let passwordEl = $('#password');
	let password = $('#password').val().trim();

	// 정규식 체크 
	if (!ckeckRegExp("password", password)) {
		alert(makeMessage(passwordEl, hintMsg.password));
		passwordEl.focus();
		return false;
	}
	alert(makeMessage(passwordEl, messageEx.success.avail));
}

// 비밀번호 확인 입력란 입력 후 이벤트 발생하는 함수 
function fn_passwordConfirm() {

	var pwCheckStatus = false;
	let passwordEl = $('#password');
	let password = passwordEl.val().trim();
	let password_confirm = $('#password_confirm').val();

	if (ckeckRegExp("password", password_confirm) && isMatch(password, password_confirm)) {
		alert("비밀번호가 일치합니다.");
		pwCheckStatus = true;

	} else if (!isMatch(password, password_confirm)) {
		alert("비밀번호가 일치하지 않습니다.");
		$('#password_confirm').focus();
		pwCheckStatus = false;
		return false;
	}
	return pwCheckStatus;
}

// 전화번호 형식 체크
function fn_phoneCheck() {
	var phoneEl = $("#phone");
	var phone = phoneEl.val();


	if (!ckeckRegExp("phone", phone)) {
		alert(makeMessage(phoneEl, hintMsg.common));
		phoneEl.focus();
		return false;
	} else {
		alert(makeMessage(phoneEl, messageEx.success.avail));
	}

	// 포맷팅 함수 
	let fmtPhone = phoneFormat(phone);

	$("#phone").val(fmtPhone);

}


// 폼 데이터 전송 전에 전체 필드 유효성 검사
$('#joinBtn').on('click change', function() {

	var password = $("#password").val();
	var password_confirm = $("#password_confirm").val();
	var username = $('#username').val();
	var email = $("#email").val();
	var phone = $("#phone").val();
	var address = $("#address").val();
	var detailAddress = $("#detailAddress").val();
	var zipCode = $("#zipCode").val();

	// 아이디 공백 확인 
	if (!isRequired(username)) {
		alert("아이디를 입력하세요");
		$('username').focus();
		return false;
	};

	// 이메일 중복 체크 여부 
	if (usernameCheck == false) {
		alert('이미 사용중인 아이디입니다.');
		$('username').focus();
		return false;
	}

	// 이메일 공백 확인 
	if (!isRequired(email)) {
		alert("이메일을 입력해주세요.");
		$('email').focus();
		return false;
	};

	// 이메일 중복 체크 여부 
	if (emailCheck == false) {
		alert("이메일 중복여부를 확인해주세요.");
		$('email').focus();
		return false;
	}

	// 이메일 유효성 검사 
	if (!ckeckRegExp("email", email)) {
		alert("이메일 형식으로 입력해주세요.");
		$('email').focus();
		return false;
	}

	if (pwCheckStatus = false) {
		pwCheck();
	}

	// 비밀번호 공백 확인 
	if (!isRequired(password) && !isRequired(password_confirm)) {
		alert("비밀번호를 입력하세요")
		$('password').focus();
		return false;
	};

	// 비밀번호 유효성 검사 
	if (!checkeckRegExp("password", password) && !checkeckRegExp("password", password_confirm)) {
		alert("비밀번호는 8 ~ 15자 영문 대 소문자, 특수문자를 사용하세요.");
		$('password').focus();
		return false;
	}

	// 비밀번호 확인 
	if (!isMatch(password, password_confirm)) {
		alert("비밀번호가 일치하지 않습니다.");
		$('password_confirm').focus();
		return false;
	};

	// 휴대전화번호 공백 확인 
	if (!isRequired(phone)) {
		alert("휴대폰번호를 입력하세요");
		$('phone').focus();
		return false;
	};

	// 휴대전화 번호 유효성 검사 
	if (!ckeckRegExp("phone", phone)) {
		alert("전화번호 형식이 올바르지 않습니다.");
		$('phone').focus();
		return false;
	}

	// 주소 공백 확인 
	if (!isRequired(address)) {
		alert("주소를 입력하세요");
		$('address').focus();
		return false;
	};

	if (!isRequired(detailAddress)) {
		alert("상세주소를 입력하세요");
		$('detailAddress').focus();
		return false;
	};


	if (!isRequired(zipCode)) {
		alert("우편번호를 입력하세요");
		$('zipCode').focus();
		return false;
	};

	joinMemebership();
})



// 회원가입 완료
function joinMemebership() {

	var username = $("#username").val();
	var password = $("#password").val();
	var email = $("#email").val();
	var phone = $("#phone").val();
	var address = $("#address").val();
	var detailAddress = $("#detailAddress").val();
	var zipCode = $("#zipCode").val();
	var note = $('#note').val();

	// var fomData = $('#joinForm').serializeObject()

	if (confirm("회원가입을 진행하시겠습니까?") == true) {

		$.ajax({
			url: "/member/join",
			type: "post",
			data: JSON.stringify({
				username: username,
				email: email,
				password: password,
				phone: phone,
				address: address,
				detailAddress: detailAddress,
				zipCode: zipCode,
				note: note
			}),
			dataType: "json",
			contentType: "application/json; charset-utf-8",
			success: function(response) {
				let code = response.code
				if (code = 1) {
					console.log("SUCCESS : ", response);
					alert("회원가입이 완료 되었습니다.");
					location.href = "/member/login";
				} else {
					console.log("ERROR : ", error);
					alert("회원가입에 실패하였습니다.");
				}
			},
			error: function(error) {
				console.log("ERROR : ", error);
				alert("회원가입에 실패하였습니다.");
			}

		})
	}

}



