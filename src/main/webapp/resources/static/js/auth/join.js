let usernameCheck = false;
let emailCheck = false;



$(document).ready(function() {

	// 사용자 아이디 작성 시, 영어만 허용 
	$("#username").keyup(fn_usernameChar);

	// 사용자 아이디 유효성, 중복 검사 
	$("#username").change(fn_usernameCheck);

	// 휴대전화 유효성 검사 
	$("#phone").change(fn_phoneCheck);

	// 비밀번호 입력 확인 
	$("#password").change(pwCheck);

	// 비밀번호 확인 칸 바뀔때마다 확인
	$('#password_confirm').change(fn_passwordConfirm);

	// 이메일 입력값 체크
	$('#email').keyup(fn_emailChar);

	// 휴대전화 번호 정규식 + '-' 형식
	$('#phone').on('keyup change', fn_phoneChar);

	// 이메일 중복 버튼 클릭시 중복 검사
	$('#emailCheck').click(fn_emailCheck);

});

// 아이디 중복확인 + 유효성 검사 
function fn_usernameCheck() {
	let username = $('#username').val().trim();


	$.ajax({
		url: "/member/idCheck",
		type: "post",
		data: { username: username },
		dataType: "json",
		success: function(result) {

			if (!isRequired(username)) {
				$("#id_feedback").html('');
				return false;

			} else if (username.length < 4 || username.length > 11) {
				$("#id_feedback").html('아이디는 최소 3자 이상 및 10자 이내입니다.');
				$("#id_feedback").attr('color', '#dc3545');
				usernameCheck = false;
				return false;
			}

			if (result == 1) {
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

// 이메일 중복확인 
function fn_emailCheck() {

	let email = $('#email').val().trim();

	$.ajax({
		url: "/member/emailCheck",
		type: "post",
		data: { email: email },
		dataType: "json",
		success: function(result) {

			fn_emailCheck = false;

			if (!isRequired(email)) {
				alert("이메일을 입력해주세요.");

			} else if (!checkEmail(email)) {
				alert("이메일 형식으로 입력해주세요.");
				$("#email").val(email);
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
	let password = $('#password').val().trim();

	// 정규식 체크 
	if (!pwValid(password)) {
		alert("비밀번호는 문자와 특수문자 조합 8 ~ 15 자리 이상이어야 합니다.");
		$('#password').focus();
		return false;
	}

	alert("사용 가능한 비밀번호입니다.");
}

// 비밀번호 확인 입력란 입력 후 이벤트 발생하는 함수 
function fn_passwordConfirm() {

	var pwCheckStatus = false;

	let password = $('#password').val().trim();
	let password_confirm = $('#password_confirm').val();

	if (pwValid(password_confirm) && isMatch(password, password_confirm)) {
		alert("비밀번호가 일치합니다.");
		pwCheckStatus = true;

	} else if (!isMatch(password, password_confirm)) {
		alert("비밀번호가 일치하지 않습니다.");
		pwCheckStatus = false;
		return false;
	}
	return pwCheckStatus;
}

// 전화번호 형식 체크 + '-' 형식 작성 
function fn_phoneCheck() {
	var phone = $("#phone").val();


	if (!checkPhone(phone)) {
		alert("전화번호 형식이 올바르지 않습니다.");
		$('#phone').focus();
		return false;
	} else {
		alert("사용가능한 전화번호입니다.");
	}

	if (phone.length === 10) {
		phone = phone.substring(0, 3) + '-' + phone.substring(3, 6) + '-' + phone.substring(6, 10);
	} else if (phone.length === 11) {
		phone = phone.substring(0, 3) + '-' + phone.substring(3, 7) + '-' + phone.substring(7, 11);
	}

	$("#phone").val(phone);

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

	/*	var strNameArr = ["아이디", "이메일", "비밀번호", "비밀번호 확인", "전화번호", "주소"];
		var strInputArr = ["username", "password", "password_confirm", "phone", "address"];
		if (!CV_checkNullInput(strNameArr, strInputArr, "joinForm")) return false;*/

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
	if (!checkEmail(email)) {
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
	if (!pwValid(password) && !pwValid(password_confirm)) {
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
	if (!checkPhone(phone)) {
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



