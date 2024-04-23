/**
 * 
 */

const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#password_confirm');

const form = document.querySelector('#joinForm');

form.addEventListener('submit', function(e) {

	e.preventDefault();

	let isUsernameValid = checkUsername(),
		isEmailValid = checkEmail(),
		isPasswordValid = checkPassword(),
		isConfirmPasswordValid = checkConfirmPassword();

	let isFormValid = isUsernameValid &&
		isEmailValid &&
		isPasswordValid &&
		isConfirmPasswordValid;

	if (isFormValid) {

	}
});


const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;

const isEmailValid = (email) => {
	const em_re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

const isPasswordSecure = (password) => {
	const pw_re = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
	return pw_re.test(password);
}

const showError = (input, message) => {
	const formGroup = input.parentElement;

	formGroup.classList.remove('success');
	formGroup.classList.add('error');

	const error = formGroup.querySelector('small');
	error.textContent = message;
};

const showSuccess = (input) => {
	
	const formField = input.parentElement;

	
	formField.classList.remove('error');
	formField.classList.add('success');

	const error = formField.querySelector('small');
	error.textContent = '';
}

const checkUsername = () => {

	let valid = false;
	const min = 3,
		max = 25;
		
	const username = usernameEl.value.trim();

	if (!isRequired(username)) {
		showError(usernameEl, '아이디를 입력해주세요.');
	} else if (!isBetween(username.length(), min, max)) {
		showError(usernameEl, `아이디는 최소 ${min}자 이상, ${max} 이하여야합니다.`)
	} else {
		showSuccess(usernameEl);
		valid = true;
	}
	return valid;
};


const checkEmail = () => {
	let valid = false;
	const email = emailEl.value.trim();
	if (!isRequired(email)) {
		showError(emailEl, '이메일을 입력해주세요.');
	} else if (!isEmailValid(email)) {
		showError(emailEl, '이메일 형식이 아닙니다.')
	} else {
		showSuccess(emailEl);
		valid = true;
	}
	return valid;
}

const checkPassword = () => {

	let valid = false;

	const password = passwordEl.value.trim();

	if (!isRequired(password)) {
		showError(passwordEl, '비밀번호를 입력해주세요.');
	} else if (!isPasswordSecure(password)) {
		showError(passwordEl, '비밀번호는 8 ~ 15자 영문 대 소문자, 특수문자를 사용하세요.');
	} else {
		showSuccess(passwordEl);
		valid = true;
	}

	return valid;
};

const checkConfirmPassword = () => {
	let valid = false;

	const confirmPassword = confirmPasswordEl.value.trim();
	const password = passwordEl.value.trim();

	if (!isRequired(confirmPassword)) {
		showError(confirmPasswordEl, '비밀번호 확인을 입력해주세요');
	} else if (password !== confirmPassword) {
		showError(confirmPasswordEl, '비밀번호가 일치하지 않습니다.');
	} else {
		showSuccess(confirmPasswordEl);
		valid = true;
	}

	return valid;
};