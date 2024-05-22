let emailEl = $('#email');
var usernameCheck = false;
var emailCheck = false;
var pwCheckStatus = false;

window.addEventListener('load', () => $('#username').focus());

$(document).ready(function() {
	$("#username, #phone, #email").keyup((e) => regTest(e));
	$("#password").change(pwCheck);
	$('#password_confirm').change(passwordConfirm);
	$('#phone').change(fn_phoneCheck);
	$("#username").change(function() {
		duplicateCheck($(this));
	});
	$('#emailCheck').click(function() {
		let emailEl = $('#email');
		duplicateCheck(emailEl);
	});
});


function duplicateCheck(element) {
	let fieldId = element.attr('id');
	let value = element.val();

	let data = { [fieldId]: value };
	if (fieldId == 'email') {
		if (!emailRegTest(element, value)) {
			return false;
		}

	} else if (fieldId == 'username') {
		if (!usernameRegTest(element, value)) {
			return false;
		}
	}
	ajaxCall("POST", "/member/" + fieldId + "/check", data, function(response) {
		if (fieldId == 'username') {
			if (response == 1) {
				$("#id_feedback").html(makeMessage(element, messageEx.dupe.username));
				$("#id_feedback").attr('color', '#dc3545');
				usernameCheck = false;

			} else {
				$("#id_feedback").html(makeMessage(element, messageEx.success.avail));
				$("#id_feedback").attr('color', '#2fb380');
				usernameCheck = true;
			}
		} else if (fieldId == 'email') {

			if (response == 1) {
				alert(makeMessage(element, messageEx.dupe.email));
				element.focus();
				return false;

			} else if (response == 0) {
				alert(makeMessage(element, messageEx.success.avail));
				emailCheck = true;
				return true;
			}
		}
	}, function(error) { handleError(error) });
}


// 비밀번호 일치 검사 
function passwordConfirm() {
	let passwordEl = $('#password');
	let password = $('#password').val();
	let passwordCnf = $('#password_confirm').val();

	if (isMatch(password, passwordCnf)) {
		alert("비밀번호가 일치합니다.");
		pwCheckStatus = true;
	} else {
		alert("비밀번호가 일치하지않습니다.");
		showError(passwordEl, "메롱입니다.")
		$('#password_confirm').focus();
		pwCheckStatus = false;
		return false;
	}
	return pwCheckStatus;
}

// 정규식 검사 후 alert 띄우기
function checkRegFields() {
	// 정규식 체크 대상 : 아이디, 이메일, 비밀번호, 휵대전화
	var checkTarget = ['username', 'email', 'password', 'phone'];
	var fieldCheck = true;
	var failEl = []

	for (var i = 0; i < checkTarget.length; i++) {
		var element = $('#' + checkTarget[i]);
		if (!checkRegExp(checkTarget[i], $('#' + checkTarget[i]).val())) {
			failEl.push(element);
			fieldCheck = false;
		}
	}
	return fieldCheck ? true : failEl;
}

// 폼 데이터 전송 전에 전체 필드 유효성 검사
$('#joinBtn').on('click change', function() {
	var requiredCheckResult = checkRequiredFields();
	var requriedRegResult = checkRegFields();

	// 공백 검사 
	if (requiredCheckResult !== true) {
		alert(makeMessage(requiredCheckResult[0], messageEx.fail.null));
		// alert(requiredCheckResult[0] + '을(를) 입력해주세요');
		requiredCheckResult[0].focus();
		return false;
	}

	// 유효성 검사 
	if (requriedRegResult !== true) {
		console.log("형식 체크 실패 필드들 : ", requriedRegResult);
		alert(makeMessage(requriedRegResult[0], messageEx.fail.valid));
		requriedRegResult[0].focus();
		return false;
	}

	// 이메일 중복 체크 여부 
	if (usernameCheck == false) {
		duplicateCheck($('#username'));
		return false;
	}

	// 이메일 중복 체크 여부 
	if (emailCheck == false) {
		alert("이메일 중복 검사를 실시해주세요.");
		// duplicateCheck(emailEl);
		return false;
	}

	if (pwCheckStatus = false) {
		pwCheck();
		return false;
	}

	// 비밀번호 확인 
	if (!isMatch($("#password").val(), $("#password_confirm").val())) {
		passwordConfirm();
		return false;
	};

	joinMemebership();
})

// 회원가입 완료
function joinMemebership() {
	var data = $('#joinForm').serialize();
	if (!confirm("회원가입을 진행하시겠습니까?")) {
		return false;
	}
	ajaxCall("POST", "/member/join", data, joinMembershipResp, function(error) { handleError(error) });
}

function joinMembershipResp(response) {
	let code = response.code
	if (code = 1) {
		console.log("SUCCESS : ", response);
		alert("회원가입이 완료 되었습니다.");
		location.href = "/member/login";
	} else {
		console.log("ERROR : ", error);
		alert("회원가입에 실패하였습니다.");
	}
}



