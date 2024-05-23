const validator = {
	password: /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()-_=+])(?!.*\s).{8,15}$/,
	passwordConfirm: /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()-_=+])(?!.*\s).{8,15}$/,
	email: /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/,
	phone: /^(01[0|1|6|7|8|9]-?[0-9]{3,4}-?([0-9]{4}))$/,
	username: /^[a-zA-Z0-9]{3,10}$/
}

const commonValidator = {
	checkSpecial: /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g,
	checkKor: /[ㄱ-ㅎㅏ-ㅣ가-힣]/g,
	checkEngNum: /[a-zA-Z0-9]/g
}

const keyword = {
	username: /[^\w\d\s]/gi,
	phone: /[^\d\s]/g,
	email: /[^\w\d\s@.]/gi,
	textarea: /(?:\r\n|\r|\n)/g
}

// 정규식 함수 
function regExpFields(element) {
	let fieldId = element.attr('id');
	let val = element.val();
	const regex = validator[fieldId];
	if (regex) {
		return regex.test(val);
	}
}

// 이벤트 객체에서 name 속성 추출하는 이벤트 -> replace 함수 호출
function regTest(e) {
	let name = e.target.name;
	replaceChar(name);
}


// 공통 replace 함수
function replaceChar(element) {
	let fieldId = element.attr('id');
	let data = element.val();
	if (!regExpFields(element)) {
		data = data.replace(keyword[fieldId], '');
		element.val(data);
	}
}

// 비밀번호 비교 체크 
function isMatch(data1, data2) {
	return data1 == data2;
}

