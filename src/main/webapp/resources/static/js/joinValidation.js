
// 아이디 중복확인 + 유효성 검사 
$('#username').keyup(function() {
	let username = $('#username').val();

	$.ajax({
		url: "/auth/idCheck",
		type: "post",
		data: { username: username },
		dataType: "json",
		success: function(result) {
			if (username == '') {
				alert("아이디를 입력해주세요.");
			}
			else if (result == 1) {
				$("#id_feedback").html('이미 사용중인 아이디입니다.');
				$("#id_feedback").attr('color', '#dc3545');
			} else {
				$("#id_feedback").html('사용 가능한 아이디입니다.');
				$("#id_feedback").attr('color', '#2fb380');
			}
		},
		error: function() {
			alert("서버 요청에 실패했습니다.");
		}
	})
});


// 이메일 중복확인 
function fn_emailCheck() {

	var email = $('#email').val().trim();
	var pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

	$.ajax({
		url: "/auth/emailCheck",
		type: "post",
		data: { email: email },
		dataType: "json",
		success: function(result) {
			if (email == '') {
				alert("이메일을 입력해주세요.")
			} else if (!pattern.test($('#email').val())) {
				alert("이메일 형식으로 입력해주세요.");
				$("#email").val("");
				$("#email").focus();
			} else if (result == 1) {
				alert("이미 가입된 이메일입니다.");
				$("#email").focus();
			} else if (result == 0) {
				$('#emailCheck').attr("value", "Y");
				alert("사용가능한 이메일입니다.");
			}

		},
		error: function(error) {
			console.log(error);
			alert("이메일을 다시 입력해주세요.");
		}
	});
};



// 아이디 중복확인 + 유효성 검사 
$('#joinForm').keyup(function() {
	$('#username').blur(function() {
		validateUsername();
	})

	$('#password').blur(function() {
		validatePassword();
	});

	$('#email').blur(function() {
		validateEmail();
	});

	$('#phone').blur(function() {
		validatePhone();
	});


	$('#joinForm').submit(function(event) {
		if (!validateUsername() || !validatePassword() || !validateEmail() | !validatePhone() | !validateAddress) {
			event.preventDefault();  // form 제출 방지 
			alert('모든 필드를 올바르게 입력해주세요.');
		}
	});

});




// 아이디 유효성 검사 
function validateUsername() {
	var username = $('#username').val().trim();
	var usernameReg = /^[a-zA-Z]*$/; // 함수 안에서만 사용하기 때문에 상수로 선언

	if (username == '') {
		alert("아이디를 입력해주세요.");
		return false;

	} else if (!usernameReg.test(username)) {
		alert("아이디는 10글자 이하 영어로 작성해야합니다.");
		$("#username").val('').focus();
		return false;
	} else {
		return true;
	}
}

// 비밀번호 유효성 검사 
function validatePassword() {

	var pw = $("#password").val().trim();
	var pw_confirm = $("#password_confirm").val().trim();
	var passwordReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

	if (!passwordReg.test(pw)) {
		alert("비밀번호는 8 ~ 15자 영문 대 소문자, 특수문자를 사용하세요.");
		$('#password').val("");
		$('#password').focus();
		return false;

	} else if (pw != pw_confirm) {
		if (pw_confirm != '') {
			alert("비밀번호가 일치하지 않습니다.");
			$('#password_confirm').val('').focus();
			return false;
		}
	}
}

// 이메일 유효성 검사 
function validateEmail() {
	var email = $('#email').val().trim();
	var emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

	// email 공백확인 
	if (email == "") {
		alert("이메일을 입력해주세요.");
		$("#email").focus();
		return false;

	} else if (!emailReg.test(email)) {
		console.log(emailCheck);
		alert("이메일 형식으로 입력해주세요.");
		$("#email").val("").focus();
		return false;
	}

}


// 휴대전화 유효성 검사
function validatePhone() {
	var phone = $('#phone').val().trim();
	var phoneReg = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;

	if (phone == '') {
		alert("휴대전화 번호를 입력해주세요.");
		$('#phone').focus();
		return false;

	} else if (phoneReg.test(phone)) {
		alert("휴대전화 형식이 아닙니다. ");
		$('#phone').val("").focus();
		return false;
	}
}

// 주소 빈칸 유효성 검사
function validateAddress() {
	var address = $('#address').val().trim();
	var detailAddress = $('#detailAddress').val().trim();
	var zipCode = $('#zipCode').val().trim();

	if (address == '') {
		alert("주소를 입력해주세요.");
		$('#address').focus();
		return false;

	} else if (detailAddress == '') {
		alert("상세 주소를 입력해주세요.");
		$('#detailAddress').focus();
		return false;

	} else if (zipCode == '') {
		alert("우편 번호를 입력해주세요.");
		$('#zipCode').focus();
		return false;
	}
}