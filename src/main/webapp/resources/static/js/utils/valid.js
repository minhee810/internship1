const validator = {
	"passwordRegExp": /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
	"emailRegExp": /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/,
	"phoneRegExp": /^(01[0-9]{1}-?[0-9]{4}-?[0-9]{4}|01[0-9]{8})$/
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
	return validator.emailRegExp.test(str);
}


function pwValid(str) {
	return validator.passwordRegExp.test(str);
}


const isRequired = value => value === '' ? false : true;


