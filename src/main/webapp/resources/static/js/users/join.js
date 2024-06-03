const emailEl = $('#email');
const passwordEl = $('#password');
var usernameCheck = false;
var targetEl = false;
var emailCheck = false;
var pwCheckStatus = false;

window.addEventListener('load', () => $('#username').focus());

$(document).ready(function() {

	// 글자 replace 
	$("#username, #phone, #email").keyup(function() {
		replaceChar($(this));
	});

	// 작성 후 포커스 이벤트에서 정규식 체크 후 alert 함수 
	$('#password, #phone').change(function() {
		alertRegTestResult($(this));
	});

	// 비밀번호 확인 작성 시 비밀번호 비교 
	$('#password_confirm').change(passwordConfirm);

	// 사용자 이름 작성 시 중복 체크 
	$("#username").change(function() {
		duplicateCheck($(this));
	});

	// 사용자 이메일 중복 체크 버튼 클릭 시 중복 체크 
	$('#emailCheck').click(function() {
		let emailEl = $('#email');
		duplicateCheck(emailEl)
	});

	// 회원 가입 버큰 클릭 시 정규식 체크 요소 : regEl, input 공백 체크 : elements -> 각각 다른 요소를 전송 
	$('#joinBtn').on('click', function() {
		let regEl = $('#phone, #email, #password');
		let elements = $('#joinForm').find(':input').not(':input[type="button"]');
		checkAll(regEl, elements);
	});
});


// 필드 포커스 변경 시 알림
function alertRegTestResult(element) {
	let newEL = $(element);

	let fieldId = newEL.attr('id');
	// 정규식 확인 후 실패 시 조건 사용자에게 보여주고 return false 해서 멈추기 
	if (!regExpFields(newEL)) {
		showMessage((fieldId == 'username') ? $("#id_feedback") : "", makeMessage(newEL, hintMsg[fieldId]), 1);
		element.focus();
		return false;
	}
	if (fieldId != "email") {
		showMessage((fieldId == 'username') ? $("#id_feedback") : "", makeMessage(newEL, messageEx.success.avail), 0);
	}
	if (fieldId == 'phone') {
		let fmtPhone = phoneFormat(newEL.val());
		$("#phone").val(fmtPhone);
	}
	return true;
}


// 아이디, 이메일 중복 검사 
function duplicateCheck(element) {
	let fieldId = element.attr('id');
	let value = element.val();
	let url = "/member/" + fieldId + "/" + value + "/check";

	if (!alertRegTestResult(element)) {
		return false;
	}
	ajaxCall("GET", url, form,
		function(response) {
			if (response == 1) {
				showMessage((fieldId == 'username') ? $("#id_feedback") : "", makeMessage(element, messageEx.dupe[fieldId]), response);
				if (fieldId == 'username') usernameCheck = false;
				if (fieldId == 'email') emailCheck = false;
				return false;
			}
			if (response == 0) {
				showMessage((fieldId == 'username') ? $("#id_feedback") : "", makeMessage(element, messageEx.success.avail), response);
				if (fieldId == 'username') usernameCheck = true;
				if (fieldId == 'email') emailCheck = true;
				return true;
			}

		});
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

// 회원가입 전 각 필드 체크 (유효성 + 공백)
function checkAll(regEls, elements) {

	if (!checkAndAlert(elements, "isRequired")) {
		return false;
	}

	if (!checkAndAlert(regEls, "regExpFields")) {
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

	joinMemebership();
}

// 회원가입 완료
function joinMemebership() {
	var data = $('#joinForm').serialize();
	if (!confirm("회원가입을 진행하시겠습니까?")) {
		return false;
	}
	ajaxCall("POST", "/member/join", data,
		function(response) {
			alert("회원가입이 완료 되었습니다.");
			location.href = "/member/login";
		});
}




