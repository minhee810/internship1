const validator = {
	password: /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()-_=+])(?!.*\s).{8,15}$/,
	email: /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/,
	phone: /^(01[0|1|6|7|8|9]-?[0-9]{3,4}-?([0-9]{4}))$/,
	username: /[a-zA-Z0-9]/g
}

const commonValidator = {
	checkSpecial: /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g,
	checkKor: /[ㄱ-ㅎㅏ-ㅣ가-힣]/g,
	checkEngNum: /[a-zA-Z0-9]/g
}

const keyword = {
	username: /[^\w\d\s]/gi,
	phone: /[^\w\d\s]/gi,
	email: /[^\w\d\s@.]/gi
}

const regMessage = {
	username: "아이디는 영문, 숫자 포함 08-15자 이상",
	password: "비밀번호는 특수문자 포함",
	phone: "숫자만",
	email: "이메일 형식으로 입력해주세요."
}


const nullMessage = {
	username: "아이디를 입력해주세요.",
	password: "비밀번호를 입력해주세요.",
	phone: "휴대전화 번호를 입력해주세요.",
	email: "이메일을 입력해주세요."
}

function makeMessage(element) {
	let name = element.data('title');
	let msg = "이(가) 형식에 맞지 않습니다";
	return name + msg;
}

// 공통 정규식 체크 
function ckeckRegExp(type, str) {
	const regex = validator[type];
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
	if (!ckeckRegExp(data)) {
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
