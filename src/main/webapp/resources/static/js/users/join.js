const emailEl = $('#email');
const passwordEl = $('#password');
var usernameCheck = false;
var targetEl = false;
var emailCheck = false;
var pwCheckStatus = false;

window.addEventListener('load', () => $('#username').focus());

$(document).ready(function() {
	$("#username, #phone, #email").keyup(function() {
		replaceChar($(this));
	});

	$('#email, #password, #phone').change(function() {
		alertRegTestResult($(this));
	});

	$('#password_confirm').change(passwordConfirm);

	$("#username").change(function() {
		duplicateCheck($(this));
	});
	$('#emailCheck').click(function() {
		let emailEl = $('#email');
		duplicateCheck(emailEl)
	});
});


function alertRegTestResult(element) {
	let fieldId = element.attr('id');
	// 정규식 확인 후 실패 시 조건 사용자에게 보여주고 return false 해서 멈추기 
	if (!regExpFields(element)) {
		showMessage((fieldId == 'username') ? $("#id_feedback") : "", makeMessage(element, hintMsg[fieldId]), 1);
		element.focus();
		return false;
	}
}


// 아이디, 이메일 중복 검사 
function duplicateCheck(element) {
	let fieldId = element.attr('id');
	let value = element.val();
	let url = "/member/" + fieldId + "/" + value + "/check";

	// 정규식 확인 후 실패 시 조건 사용자에게 보여주고 return false 해서 멈추기 
	if (!regExpFields(element)) {
		showMessage((fieldId == 'username') ? $("#id_feedback") : "", makeMessage(element, hintMsg[fieldId]), 1);
		element.focus();
		return false;
	}

	console.log("정규식 테스트 통과")
	ajaxCall("GET", url, false,

		function(response) {
			if (response == 1) {
				showMessage((fieldId == 'username') ? targetEl : "", makeMessage(element, messageEx.dupe[fieldId]), response);
				if (fieldId == 'username') usernameCheck = false;
				if (fieldId == 'email') emailCheck = false;
				return false;
			}
			if (response == 0) {
				showMessage((fieldId == 'username') ? targetEl : "", makeMessage(element, messageEx.success.avail), response);
				if (fieldId == 'username') usernameCheck = true;
				if (fieldId == 'email') emailCheck = true;
				return true;
			}

		}, handleError);
}

// 비밀번호 일치 검사 
function passwordConfirm() {
	let password = $('#password').val();
	let passwordCnf = $('#password_confirm').val();

	if (!isMatch(password, passwordCnf)) {
		alert("비밀번호가 일치하지않습니다.");
		$('#password_confirm').focus();
		pwCheckStatus = false;
		return false;
	}
	alert("비밀번호가 일치합니다.");
	pwCheckStatus = true;
}

// 정규식 검사 후 alert 띄우기
function checkRegFields() {
	// 정규식 체크 대상 : 아이디, 이메일, 비밀번호, 휵대전화
	var checkTarget = ['username', 'email', 'password', 'phone'];
	var fieldCheck = true;
	var failEl = []

	for (var i = 0; i < checkTarget.length; i++) {
		var element = $('#' + checkTarget[i]);
		if (!regExpFields(element)) {
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



