const validator = {
	passwordRegExp: /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()-_=+])(?!.*\s).{8,15}$/,
	emailRegExp: /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/,
	phoneRegExp: /^(01[0|1|6|7|8|9]-?[0-9]{3,4}-?([0-9]{4}))$/,
	checkSpecial: /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g,
	checkKor: /[ㄱ-ㅎㅏ-ㅣ가-힣]/g,
	checkEngNum: /[a-zA-Z0-9]/g,
	usernameRegExp: /[a-zA-Z0-9]/g
}

// 공백(스페이스 바) 체크
function checkSpace(str) {
	if (str.search(/\s/) !== -1) {
		return true; // 스페이스가 있는 경우
	} else {
		return false; // 스페이스 없는 경우
	}
}

// 한글 체크
function checkKor(str) {
	return validator["checkKor"].test(str);
}

// 특수 문자 체크 
function checkSpecial(str) {
	return validator["checkSpecial"].test(str);
}

// 영문+숫자만 입력 체크
function checkEngNum(str) {
	return validator["checkEngNum"].test(str);
}

function checkEmail(str) {
	return validator["emailRegExp"].test(str);
}

// 비밀번호 정규식 확인 결과
function pwValid(str) {
	return validator["passwordRegExp"].test(str);
}

// 휴대전화 정규식
function checkPhone(str) {
	return validator["phoneRegExp"].test(str);
}

// username 정규식 
function checkUsername(str) {
	return validator["usernameRegExp"].test(str);
}

const isRequired = value => value === '' ? false : true;

function isMatch(password1, password2) {
	return password1 == password2;
}

// 휴대 전화번호 유효성 검사 
function fn_phoneChar() {
	let data = $('#phone').val().trim();
	let keyword = /[^0-9]/g;


	if (!checkPhone(data)) {
		data = data.replace(keyword, '');
		$('#phone').val(data);
	}
}

// 글자 replace 함수
function checkChar(type, data) {

	let regExp = {
		phone: /[^0-9]/g,
		email: /[^\w\d\s@.]/gi
	}

	if (type == phone) {
		data.replace(regExp["phone"], "");
	} else if (type == email) {
		data.replace(regExp["email"], "");
	}
}


// 이메일 글자 검사
function fn_emailChar() {
	let data = $('#email').val().trim();
	let nonEmailKeyword = /[^\w\d\s@.]/gi;

	emailCheck = false;

	// 이메일 형식 대로 검사 
	if (!checkEmail(data)) {  // 이메일 형식이 아닌 경우 다음 문장 실행
		data = data.replace(nonEmailKeyword, "");
		$('#email').val(data);
	}
}

// 아이디 글자 유효성 검사
function fn_usernameChar() {
	let data = $('#username').val().trim();
	let keyword = /[^\w\d\s]/gi;

	if (!checkUsername(data)) {
		data = data.replace(keyword, '');
		$('#username').val(data);
	}
}


function CV_checkNullInput(strNameArr, strInputArr, parentId){
	for(var i = 0; i <strNameArr.length; i++){
		if($('#' + parentId + 'input[name="' + strInputArr[i] + '"]').val() ==''){
			alert(strNameArr[i] + '을(를) 입력해주세요.');
			$('#' + parentId + 'input[name="' + strInputArr[i] + '"]').focus(); 
			return false;
		}
	}
}
