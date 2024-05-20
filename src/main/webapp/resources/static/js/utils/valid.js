const validator = {

	password: /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()-_=+])(?!.*\s).{8,15}$/,

	email: /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/,

	phone: /^(01[0|1|6|7|8|9]-?[0-9]{3,4}-?([0-9]{4}))$/,

	username: /^[a-zA-Z0-9]{3,10}$/
	///[a-zA-Z0-9]/g,

}

const hintMsg = {
	username: '{name}는 최소 3자 이상 및 10자 이내입니다.',
	password: "{name}는 문자와 특수문자 조합 8 ~ 15 자리 이상이어야 합니다.",
	common: "{name} 형식이 올바르지 않습니다.",
}

const commonValidator = {
	checkSpecial: /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g,
	checkKor: /[ㄱ-ㅎㅏ-ㅣ가-힣]/g,
	checkEngNum: /[a-zA-Z0-9]/g
}

const keyword = {
	username: /[^\w\d\s]/gi,
	phone: /[^\d\s]/g,
	email: /[^\w\d\s@.]/gi
}


// message 모음 객체
const messageEx = {

	success: {
		avail: "사용 가능한 {name}입니다."
	},
	fail: {
		valid: "{name}이(가) 형식에 맞지 않습니다.",
		null: "{name}을(를) 입력해주세요."
	},
	dupe: {
		username: "이미 사용중인 {name} 입니다.",
		email: "이미 가입된 {name} 입니다.",
	},
	error: "서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요."

}

// 아이디 유효성 검사 
function usernameRegTest(usernameEl, username) {

	usernameCheck = false;

	if (!isRequired(username)) {
		$("#id_feedback").html('');
		return false;
	}

	if (!checkRegExp("username", username)) {
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

	} else if (!checkRegExp("email", email)) {
		alert(makeMessage(emailEl, messageEx.fail.valid));
		emailEl.val(email);
		emailEl.focus();
		return false;

	}
	return true;
}

// 비밀번호 입력 확인
function pwCheck() {
	let passwordEl = $('#password');
	let password = passwordEl.val();

	// 정규식 체크 
	if (!checkRegExp("password", password)) {
		alert(makeMessage(passwordEl, hintMsg.password));
		passwordEl.focus();
		return false;
	}
	// 사용가능한 비밀번호입니다. 알림
	alert(makeMessage(passwordEl, messageEx.success.avail));
}

// alert 메시지 만드는 함수 
function makeMessage(element, msg) {
	let name = element.data('title');
	return msg.replace('{name}', name);
}

// 전화번호 형식 체크
function fn_phoneCheck() {
	var phoneEl = $("#phone");
	var phone = phoneEl.val();

	if (!checkRegExp("phone", phone)) {
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

// 공통 정규식 체크 
function checkRegExp(type, str) {
	const regex = validator[type];
	console.log("regex : ", regex);
	console.log("test type :", type);
	if (regex) {
		return regex.test(str);
	}
}



// 공통 널값 체크 
const isRequired = value => value === '' ? false : true;

// 이벤트 객체에서 name 속성 추출하는 이벤트 -> replace 함수 호출
function regTest(e) {
	let name = e.target.name;
	console.log("name : ", name);
	replaceChar(name);
}

// 공통 replace 함수
function replaceChar(name) {
	let data = $('#' + name).val();
	if (!checkRegExp(data)) {
		data = data.replace(keyword[name], '');
		$('#' + name).val(data);
	}
}

// 비밀번호 비교 체크 
function isMatch(password1, password2) {
	return password1 == password2;
}

function CV_checkNullInput(strNameArr, strInputArr, parentId) {
	for (var i = 0; i < strNameArr.length; i++) {
		if ($('#' + parentId + 'input[name="' + strInputArr[i] + '"]').val() == '') {
			alert(strNameArr[i] + '을(를) 입력해주세요.');
			$('#' + parentId + 'input[name="' + strInputArr[i] + '"]').focus();
			return false;
		}
	}
}
