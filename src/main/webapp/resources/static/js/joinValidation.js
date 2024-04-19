

// 아이디 중복확인 
$('#username').keyup(function() {
	let username = $('#username').val();
	console.log(username)

	$.ajax({
		url: "/auth/idCheck",
		type: "post",
		data: { username: username },
		dataType: "json",
		success: function(result) {
			if (result == 1) {
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
	
	let email = $('#email').val();

	console.log(email);

	$.ajax({
		url: "/auth/emailCheck",
		type: "post",
		data: { email: email },
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(result) {
			if (result == 1) {
				alert("사용할 수 없는 이메일입니다.");
			} else if (result == 0) {
				$('#emailCheck').attr("value", "Y");
				alert("사용가능한 이메일입니다.");
			} else {
				alert("이메일을 입력해주세요.")
			}
		},
		error: function(error) {
			console.log(error);
			alert("아이디를 다시 입력해주세요.");
		}
	});
};

