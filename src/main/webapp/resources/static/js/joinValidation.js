const passwordReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;


// 아이디 중복확인 + 유효성 검사 
$('#username').keyup(function() {
	let username = $('#username').val().trim();

	$.ajax({
		url: "/auth/idCheck",
		type: "post",
		data: { username: username },
		dataType: "json",
		success: function(result) {

			if (!isRequired(username)) {
				$("#id_feedback").html('');
			} else if (result == 1) {
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


// 특수문자 입력 방지
function characterCheck(event) {
	let data = event.target;
	let regExp = /[^A-Za-z0-9]/g;  // 영문자와 숫자만 가능한 정규식
	
	if (regExp.test(data.value)) {
		data.value = data.value.replace(regExp, "");
	}
}

const isRequired = value => value === '' ? false : true;


const usernameReg = (username) => {
	const userPattern = /^[a-zA-Z]*$/;
	return userPattern.test(username);
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
			if (!isRequired(email)) {
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

// 비밀번호 유효성 검사 
function pwCheck() {

	// var passwordReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
	var password = $('#password').val();
	var password_confirm = $('#password_confirm').val();

	if (!passwordReg.test(password)) {
		$('#passwordCheck').text("비밀번호는 8 ~ 15자 영문 대 소문자, 특수문자를 사용하세요.").css('color', 'green');
	} else if (password == password_confirm) {
		$('#passwordCheck').text("비밀번호가 일치합니다.").css('color', 'green');
	} else {
		$('#passwordCheck').text("비밀번호가 일치하지 않습니다.").css('color', 'red');
	}
}

// 휴대전화 유효성 검사 
$(document).ready(function() {
	$("#phone").blur(function() {
		var phoneNumber = $("#phone").val();
		
		if (phoneNumber) {
			var regex = /^(01[0-9]{1}-?[0-9]{4}-?[0-9]{4}|01[0-9]{8})$/;

			if (regex.test(phoneNumber)) {
			
			} else {
				alert("잘못된 형식의 전화번호 입니다.");
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
	});
});

/**
 * 폼 데이터 전송 전에 전체 필드 확인
 */
function joinForm_check() {

	var username = document.getElementById("username");
	var password = document.getElementById("password");
	var password_confirm = document.getElementById("password_confirm");
	var email = document.getElementById("email");
	var phone = document.getElementById("phone");
	var address = document.getElementById("address");
	var detailAddress = document.getElementById("detailAddress");
	
	

	if (username.value == "") {
		alert("아이디를 입력하세요");
		username.focus();
		return false;
	};

	if (email.value == "") {
		alert("이메일을 입력하세요");
		email.focus();
		return false;
	};
	if (password.value == "") {
		alert("비밀번호를 입력하세요");
		password.focus();
		return false;
	};
	if (password_confirm.value !== password.value) {
		alert("비밀번호가 일치하지 않습니다.");
		password_confirm.focus();
		return false;
	};

	if (phone.value == "") {
		alert("휴대폰번호를 입력하세요");
		phone.focus();
		return false;
	};

	if (address.value == "") {
		alert("주소를 입력하세요");
		phone.focus();
		return false;
	};

	if (detailAddress.value == "") {
		alert("상세주소를 입력하세요");
		phone.focus();
		return false;
	};

	document.joinForm.submit();

}




