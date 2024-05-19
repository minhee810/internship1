
var usernameCheck = false;
var emailCheck = false;
var pwCheckStatus = false;

window.addEventListener('load', () => $('#username').focus());

$(document).ready(function() {

	// 입력값 replace 함수 호출
	$("#username, #phone, #email").keyup((e) => regTest(e));

	$("#username").change(function() {
		duplicateCheck($(this));
	});

	// 이메일 중복 버튼 클릭시 중복 검사
	$('#emailCheck').click(function() {
		let emailEl = $('#email');
		duplicateCheck(emailEl);
	});

	// 비밀번호 입력 확인 
	$("#password").change(pwCheck);

	$('#password_confirm').change(passwordConfirm);

	// 휴대전화 번호 정규식 + '-' 형식
	$('#phone').change(fn_phoneCheck);


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

function emailRegTest(emailEl, email) {

	emailCheck = false;

	if (!isRequired(email)) {
		alert(makeMessage(emailEl, messageEx.fail.null));
		return false;

	} else if (!ckeckRegExp("email", email)) {
		alert(makeMessage(emailEl, messageEx.fail.valid));
		emailEl.val(email);
		emailEl.focus();
		return false;

	}
	return true;
}

function duplicateCheck(element) {

	let fieldId = element.attr('id');
	let value = $('#' + fieldId).val();

	if (fieldId == 'email') {
		if (!emailRegTest(element, value)) {
			return false;
		}

	} else if (fieldId == 'username') {
		if (!usernameRegTest(element, value)) {
			return false;
		}
	}

	$.ajax({
		url: "/member/" + fieldId + "/check",
		type: "post",
		data: { [fieldId]: value },
		dataType: "json",
		success: function(result) {
			if (fieldId == 'username') {

				if (result == 1) {
					$("#id_feedback").html(makeMessage(element, messageEx.dupe.username));
					$("#id_feedback").attr('color', '#dc3545');
					usernameCheck = false;

				} else {
					$("#id_feedback").html(makeMessage(element, messageEx.success.avail));
					$("#id_feedback").attr('color', '#2fb380');
					usernameCheck = true;
				}
			} else if (fieldId == 'email') {

				if (result == 1) {
					alert(makeMessage(element, messageEx.dupe.email));
					emailEl.focus();
					return false;

				} else if (result == 0) {
					alert(makeMessage(element, messageEx.success.avail));
					emailCheck = true;
					return true;
				}
			}

		},
		error: function() {
			alert(messageEx.error);
		}
	})

}
// 비밀번호 일치 검사 
function passwordConfirm() {
	let password = $('#password').val();
	let passwordCnf = $('#password_confirm').val();

	if (isMatch(password, passwordCnf)) {
		alert("비밀번호가 일치합니다.");
		pwCheckStatus = true;
	} else {
		alert("비밀번호가 일치하지않습니다.");
		$('#password_confirm').focus();
		pwCheckStatus = false;
		return false;
	}
	return pwCheckStatus;
}

// 비밀번호 입력 확인
function pwCheck() {
	let passwordEl = $('#password');
	let password = passwordEl.val();

	// 정규식 체크 
	if (!ckeckRegExp("password", password)) {
		alert(makeMessage(passwordEl, hintMsg.password));
		passwordEl.focus();
		return false;
	}
	// 사용가능한 비밀번호입니다. 알림
	alert(makeMessage(passwordEl, messageEx.success.avail));
}

// 전화번호 형식 체크
function fn_phoneCheck() {
	var phoneEl = $("#phone");
	var phone = phoneEl.val();

	if (!ckeckRegExp("phone", phone)) {
		alert(makeMessage(phoneEl, hintMsg.common));
		phoneEl.focus();
		return false;
	}
	alert(makeMessage(phoneEl, messageEx.success.avail));
	// 포맷팅 함수 
	let fmtPhone = phoneFormat(phone);

	console.log("fmtPhone : ", fmtPhone);

	$("#phone").val(fmtPhone);
}


function checkRequiredFields() {
	var allFilled = true;
	var emptyFields = [];

	$('input').each(function() {
		var value = $(this).val();
		var title = $(this).data('title');

		if (!isRequired(value)) {
			emptyFields.push(title);
			allFilled = false;
		}
	});

	return allFilled ? true : emptyFields;
}

function checkRegFields() {
	var alllFilled = true;
	var failFields = [];

	$('input').each(function() {
		var element = $(this);
		var value = $(this).val();
		var type = $(this).attr('id');

		if (!ckeckRegExp(type, value)) {
			//makeMessage(element)
		}
	});
	return alllFilled ? true : failFields;

}
// 폼 데이터 전송 전에 전체 필드 유효성 검사
$('#joinBtn').on('click change', function() {
	var requiredCheckResult = checkRequiredFields();
	var requriedRegResult = checkRegFields();
	var password = $("#password").val();
	var password_confirm = $("#password_confirm").val();
	var emailEl = $("#email");
	var phone = $("#phone").val();
	var usernameEl = $('#username');

	if (requiredCheckResult !== true) {
		alert(requiredCheckResult.join(', ') + ' 필드를 입력하세요');
		$('#' + requiredCheckResult[0]).focus();
		return false;
	}

	if (checkRegFields !== true) {
		alert(requriedRegResult[0] + "이(가) 형식에 맞지 않습니다.");
		$('#' + requriedRegResult[0]).focus();
	}

	// 이메일 중복 체크 여부 
	if (usernameCheck == false) {
		duplicateCheck(usernameEl);
		return false;
	}

	// 이메일 중복 체크 여부 
	if (emailCheck == false) {
		duplicateCheck(emailEl);
		return false;
	}

	if (pwCheckStatus = false) {
		pwCheck();
		return false;
	}

	// 비밀번호 확인 
	if (!isMatch(password, password_confirm)) {
		passwordConfirm();
		return false;
	};


	// 이메일 유효성 검사 
	if (!ckeckRegExp("email", emailEl.val())) {
		alert("이메일 형식으로 입력해주세요.");
		$('email').focus();
		return false;
	}

	// 비밀번호 유효성 검사 
	if (!ckeckRegExp("password", password) && !ckeckRegExp("password", password_confirm)) {
		alert("비밀번호는 8 ~ 15자 영문 대 소문자, 특수문자를 사용하세요.");
		$('password').focus();
		return false;
	}

	if (!ckeckRegExp("phone", phone)) {
		alert("전화번호 형식이 올바르지 않습니다.");
		$('phone').focus();
		return false;
	}

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



