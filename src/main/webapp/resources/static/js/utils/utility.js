const ajaxType = {
	url: {
		post: 'POST',
		get: 'GET',
		put: 'PUT'
	},
	contentType: {
		form: 'application/x-www-form-urlencoded; charset=UTF-8',
		json: 'application/json; charset=utf-8'
	},
}

function ajaxCall(type, url, data = false, successCallback, errorCallback,
	processData = true, cache = true, timeout = 0) {

	let contentType = false; //contentType = 'application/json; charset=utf-8';

	// object 로 오면 contentype -> form 
	if (typeof data == "string" || data == false) {
		console.log("type is string");
		contentType = 'application/x-www-form-urlencoded; charset=UTF-8'

		// object로 오면 contentType -> json 	
	} else if (typeof data == "object") {
		console.log("type is object");
		if (processData == true) {
			data = JSON.stringify(data);
			contentType = 'application/json; charset=utf-8';
		} else {
			
		}

	}

	$.ajax({
		type: type,
		url: url,
		data: data,
		dataType: "json",
		contentType: contentType, // 서버로 데이터를 보낼 떄에 어떤 타입으로 보낼 것인지 지정
		processData: processData,
		cache: cache,
		timeout: timeout,
		success: function(response) {
			successCallback(response);
		},
		error: function(error) {
			errorCallback(error);
		}
	});
}

function saveSuccess(response, redirect) {
	alert("저장을 완료했습니다.");
	location.href = redirect;
	console.log("response : ", response);

}

function handleSuccess(response) {
	console.log("response : ", response);
}

function handleError(error) {
	alert("서버 오류가 발생하였습니다.")
	console.log("error : ", error);
}


// 공백 검사 후 빈칸 alert 띄우기 
function checkRequiredFields() {
	var allFilled = true;
	var emptyEl = [];

	$('input').each(function() {
		var value = $(this).val();
		var element = $(this);

		if (!isRequired(value)) {
			emptyEl.push(element);
			allFilled = false;
		}
	});

	return allFilled ? true : emptyEl;
}

function exeDaumPostcode(note, zipCode, address, datailAddress) {
	new daum.Postcode({
		oncomplete: function(data) {

			var addr = ''; // 주소 변수
			var extraAddr = ''; // 참고항목 변수


			if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
				addr = data.roadAddress;
			} else { // 사용자가 지번 주소를 선택했을 경우(J)
				addr = data.jibunAddress;
			}

			if (data.userSelectedType === 'R') {
				if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
					extraAddr += data.bname;
				}
				// 건물명이 있고, 공동주택일 경우 추가한다.
				if (data.buildingName !== '' && data.apartment === 'Y') {
					extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
				}
				if (extraAddr !== '') {
					extraAddr = ' (' + extraAddr + ')';
				}
				document.getElementById(note).value = extraAddr;

			} else {
				document.getElementById(note).value = '';
			}
			document.getElementById(zipCode).value = data.zonecode;
			document.getElementById(address).value = addr;
			document.getElementById(datailAddress).focus();
		}
	}).open();
}

// 날짜 포맷팅 함수 
function dateFormat(date) {
	var year = date.substring(0, 4);
	var month = date.substring(5, 7);
	var day = date.substring(8, 10);
	var fmtDate = year + '-' + month + '-' + day;

	return fmtDate;
}

function padTwoDigits(num) {
	return num.toString().padStart(2, "0");
}

function getFormattedDate(org) {
	const date = new Date(org);

	return (
		[
			date.getFullYear(),
			padTwoDigits(date.getMonth() + 1),
			padTwoDigits(date.getDate()),
		].join("-") +
		" " +
		[
			padTwoDigits(date.getHours()),
			padTwoDigits(date.getMinutes()),
			padTwoDigits(date.getSeconds()),
		].join(":")
	);
}

function phoneFormat(phone) {
	console.log("phone : ", phone);
	if (phone.length === 10) {
		console.log(10);
		return phone = phone.substring(0, 3) + '-' + phone.substring(3, 6) + '-' + phone.substring(6, 10);
	} else if (phone.length === 11) {
		console.log(11);
		return phone = phone.substring(0, 3) + '-' + phone.substring(3, 7) + '-' + phone.substring(7, 11);
	} else if (phone) {
		return phone;
	}
}

// 공통 널값 체크 
const isRequired = value => value === '' ? false : true;

// 보류 
function showModal(label, body, buttonText) {
	console.log(asdf);
	let template = document.querySelector('#commonModal');
	let newModal = document.importNode(template.content, true);

	let modalLabel = newModal.querySelector('#modalLabel');
	modalLabel.textContent = label;

	var modalBody = newModal.querySelector('#modal-body').innerText;
	modalBody.textContent = body;
	console.log(body, label);

	var confirmBtn = newModal.querySelector('#confirmBtn');
	confirmBtn.textContent = buttonText;
	document.body.appendChild(newModal);
}

// 태그가 서로 다른 입력창의 경우 여러 종류의 필드 검사할 수 있도록 필드를 지정해주는 함수 
function validateFields(fields) {

	let isValid = true;

	fields.forEach(field => {
		if (field.val().trim() === '') {
			alert(makeMessage(field, messageEx.fail.null));

			isValid = false;
			return false;
		}
	});
	return isValid;
}




