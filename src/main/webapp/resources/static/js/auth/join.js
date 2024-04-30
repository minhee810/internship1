


/**
 * 전체 이벤트 
 */
$(document).ready(function() {

	// 사용자 아이디 작성 시, 영어만 허용 
	$("#username").on('keyup', fn_usernameChar);
	/*		event.stopImmediatePropagation()
			event.stopPropagation()
			event.preventDefault()
			fn_usernameChar(event)*/


	// 사용자 아이디 유효성, 중복 검사 
	$("#username").change(fn_usernameCheck);

	// 휴대전화 유효성 검사 
	$("#phone").blur(phoneCheck);

	// 비밀번호 입력 확인 
	$("#password_confirm").blur(pwCheck);

	// 이메일 입력값 체크
	$('#email').on('keyup', fn_emailChar);

	$('#phone').on('keyup change', fn_phoneChar);

	// 이메일 중복 버튼 클릭시 중복 검사
	$('#emailCheck').on('click', fn_emailCheck);

});



let usernameCheck = false;
let emailCheck = false;


// 아이디 중복확인 + 유효성 검사 
function fn_usernameCheck() {
	let username = $('#username').val().trim();

	$.ajax({
		url: "/auth/idCheck",
		type: "post",
		data: { username: username },
		dataType: "json",
		success: function(result) {

			if (!isRequired(username)) {
				$("#id_feedback").html('');
			} else if (username.length < 4 || username.length > 11) {
				$("#id_feedback").html('아이디는 최소 3자 이상 및 10자 이내입니다.');
				$("#id_feedback").attr('color', '#dc3545');
				usernameCheck = false;
			} else if (result == 1) {
				$("#id_feedback").html('이미 사용중인 아이디입니다.');
				$("#id_feedback").attr('color', '#dc3545');
				usernameCheck = false;

			} else {
				$("#id_feedback").html('사용 가능한 아이디입니다.');
				$("#id_feedback").attr('color', '#2fb380');
				usernameCheck = true;
			}
		},
		error: function() {
			alert("서버 요청에 실패했습니다.");
		}
	})
}

function fn_phoneChar() {
	let data = $('#phone').val().trim();
	let keyword = /^[^0-9]*$/;

	if (!validator.phoneRegExp.test(data)) {
		data = data.replace(keyword, '');
		$('#phone').val(data);
	}

}

// 아이디 유효성 검사
function fn_usernameChar(e) {
	let data = $('#username').val().trim();
	let keyword = /[^\w\d\s]/gi;
	console.log("replace 전 data : ", data);

	if (data.length > 3 || data.length < 11) {

		if (checkKor(data) || checkSpace(data) || checkSpecial(data)) {
			data = data.replace(keyword, '');

			console.log("replace 이후 data : ", data);

			$('#username').val(data);
		}
	} else {
		alert("아이디는 최소 3자 이상 최대 10자 이내여야 합니다. ");
		return false;
	}
}

function fn_emailChar() {
	let data = $('#email').val().trim();
	let nonEmailKeyword = /[^\w\d\s@.]/gi;

	emailCheck = false;

	// 한글 공백 검사 
	if (checkKor(data) || checkSpace(data)) {  // 한글이나 공백이 있을 경우 다음 문장 실행 
		data = data.replace(nonEmailKeyword, "");
		$('#email').val(data);
	}

	// 이메일 형식 대로 검사 
	if (!checkEmail(data)) {  // 이메일 형식이 아닌 경우 다음 문장 실행
		data = data.replace(nonEmailKeyword, "");
		console.log("replace 이후의 : ", data);
		$('#email').val(data);
	}
}


// 이메일 중복확인 
function fn_emailCheck() {

	let email = $('#email').val().trim();

	$.ajax({
		url: "/auth/emailCheck",
		type: "post",
		data: { email: email },
		dataType: "json",
		success: function(result) {

			fn_emailCheck = false;

			if (!isRequired(email)) {
				alert("이메일을 입력해주세요.");

			} else if (!validator.emailRegExp.test(email)) {
				alert("이메일 형식으로 입력해주세요.");
				$("#email").val("");
				$("#email").focus();
				return false;

			} else if (result == 1) {
				alert("이미 가입된 이메일입니다.");
				$("#email").focus();
				return false;

			} else if (result == 0) {
				$('#emailCheck').attr("value", "Y");
				alert("사용가능한 이메일입니다.");
				emailCheck = true;
				return true;
			}

		},
		error: function(error) {
			console.log(error);
			alert("이메일을 다시 입력해주세요.");
		}
	});
};



// 비밀번호 입력 확인
function pwCheck() {
	let password = $('#password').val();
	let password_confirm = $('#password_confirm').val();

	if (!pwValid(password) || !pwValid(password_confirm)) {
		$('#passwordCheck').text("비밀번호는 8 ~ 15자 영문, 특수문자를 사용하세요.").css('color', 'red');
		return false;
	}

	if (password == password_confirm) {
		$('#passwordCheck').text("비밀번호가 일치합니다.").css('color', 'green');
		return true;

	} else if (password != password_confirm) {
		$('#passwordCheck').text("비밀번호가 일치하지 않습니다.").css('color', 'red');
		return false;
	}
}

function phoneCheck() {
	var phoneNumber = $("#phone").val();

	if (phoneNumber) {
		if (validator.phoneRegExp.test(phoneNumber)) {

		} else {
			alert("전화번호 형식이 올바르지 않습니다.");
			$("#phone").val("");
			return false;
		}
		var phone = phoneNumber;
		var phone = phone.replace(/[^0-9]/g, '');

		if (phone.length === 10) {
			phone = phone.substring(0, 3) + '-' + phone.substring(3, 7) + '-' + phone.substring(7, 11);
		} else if (phone.length === 11) {
			phone = phone.substring(0, 3) + '-' + phone.substring(3, 7) + '-' + phone.substring(7, 11);
		}
		$("#phone").val(phone);
	}
}


/**
 * 폼 데이터 전송 전에 전체 필드 확인
 */
$('#joinBtn').on('click change', function() {

	var username = $("#username").val();
	var password = $("#password").val();
	var password_confirm = $("#password_confirm").val();
	var email = $("#email").val();
	var phone = $("#phone").val();
	var address = $("#address").val();
	var detailAddress = $("#detailAddress").val();

	// 아이디 공백 확인 
	if (username == "") {
		alert("아이디를 입력하세요");
		username.focus();
		return false;
	};

	// 아이디 유효성 검사 
	if (fn_usernameChar(username)) {
		alert("아이디는 영문 10글자 이내입니다.");
		username.focus();
		return false;
	}

	// 이메일 중복 체크 여부 
	if (usernameCheck == false) {
		alert('이미 사용중인 아이디입니다.');
		return false;
	}

	// 이메일 공백 확인 
	if (email == "") {
		alert("이메일을 입력해주세요.");
		email.focus();
		return false;
	};

	// 이메일 중복 체크 여부 
	if (emailCheck == false) {
		alert("이메일 중복여부를 확인해주세요.");
		return false;
	}

	// 이메일 유효성 검사 
	if (!validator.emailRegExp.test(email)) {
		alert("이메일 형식으로 입력해주세요.");
		return false;
	}

	// 비밀번호 공백 확인 
	if (password == "") {
		alert("비밀번호를 입력하세요");
		password.focus();
		return false;
	};

	// 비밀번호 확인 
	if (password_confirm !== password) {
		alert("비밀번호가 일치하지 않습니다.");
		password_confirm.focus();
		return false;
	};

	// 비밀번호 유효성 검사 
	if (!validator.passwordRegExp.test(password)) {
		alert("비밀번호는 8 ~ 15자 영문 대 소문자, 특수문자를 사용하세요.");
		return false;
	}

	// 비밀번호 확인 유효성 검사 
	if (!validator.passwordRegExp.test(password_confirm)) {
		alert("비밀번호는 8 ~ 15자 영문 대 소문자, 특수문자를 사용하세요.");
		return false;
	}

	// 휴대전화번호 공백 확인 
	if (phone == "") {
		alert("휴대폰번호를 입력하세요");
		phone.focus();
		return false;
	};

	// 휴대전화 번호 유효성 검사 
	if (!validator.phoneRegExp.test(phone)) {
		alert("전화번호 형식이 올바르지 않습니다.");
		return false;
	}

	// 주소 공백 확인 
	if (address == "") {
		alert("주소를 입력하세요");
		phone.focus();
		return false;
	};

	if (detailAddress == "") {
		alert("상세주소를 입력하세요");
		phone.focus();
		return false;
	};
	
console.log("phone : " , phone);


	if (confirm("회원가입을 진행하시겠습니까?") == true) {
		document.joinForm.submit();
		alert("회원가입이 완료되었습니다.");
	} else {
		return false;
	}



})






