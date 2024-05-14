const validator = {
	// passwordRegExp: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/,
	// passwordRegExp: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
	passwordRegExp: /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()-_=+])(?!.*\s).{8,15}$/,

	emailRegExp: /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/,
	phoneRegExp: /^(01[0|1|6|7|8|9]-?[0-9]{3,4}-?([0-9]{4}))$/
}


// 한글 체크
function checkKor(str) {
	const regExp = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
	if (regExp.test(str)) {
		return true;
	} else {
		return false;
	}

}

// 특수 문자 체크 
function checkSpecial(str) {
	const regExp = /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g;
	if (regExp.test(str)) {
		return true;
	} else {
		return false;
	}
}

// 공백(스페이스 바) 체크
function checkSpace(str) {
	if (str.search(/\s/) !== -1) {
		return true; // 스페이스가 있는 경우
	} else {
		return false; // 스페이스 없는 경우
	}
}

// 영문+숫자만 입력 체크
function checkEngNum(str) {
	const regExp = /[a-zA-Z0-9]/g;
	if (regExp.test(str)) {
		return true;
	} else {
		return false;
	}
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



const isRequired = value => value === '' ? false : true;


