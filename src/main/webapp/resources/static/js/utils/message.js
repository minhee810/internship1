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
	error: "서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.",
	delete: {
		pre: "{name}을(를) 삭제하시겠습니까?",
		post: "{name}이(가) 삭제되었습니다."
	},
	save: {
		pre: "{name}을(를) 저장하시겠습니까?",
		post: "{name}을(를) 저장했습니다."
	}
}

// 정규식 불일치 시 hint msg
const hintMsg = {
	username: '{name}는 최소 3자 이상 및 10자 이내입니다.',
	password: "{name}는 문자와 특수문자 조합 8 ~ 15 자리 이상이어야 합니다.",
	email: "{name} 형식이 올바르지 않습니다.",
	phone : "{name} 형식이 올바르지 않습니다."
}

// alert 메시지 만드는 함수 
function makeMessage(element, msg) {
	let name = element.data('title');
	return msg.replace('{name}', name);
}

// element 여부에 따라서 메시지 다르게 생성하는 함수 
function showMessage(element, message, result) {
	if (element == "") {
		alert(message);
	}
	if (element) {
		if (result == 1) {
			element.html(message);
			element.attr('color', 'dc3545');
		}
		if (result == 0) {
			element.html(message);
			element.attr('color', '2fb380');
		}
	}

}