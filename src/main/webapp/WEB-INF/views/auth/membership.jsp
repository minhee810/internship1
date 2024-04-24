<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no" />
<meta name="description" content="" />
<meta name="author" content="" />

<title>회원 가입</title>

<!-- Custom fonts for this template-->
<link href="../resources/static/vendor/fontawesome-free/css/all.min.css"
	rel="stylesheet" type="text/css" />
<link
	href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
	rel="stylesheet" />

<!-- Custom styles for this template-->
<link href="../resources/static/css/sb-admin-2.min.css" rel="stylesheet" />
<script
	src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

</head>


<body class="bg-gradient-primary">
	<div class="container">
		<div class="card o-hidden border-0 shadow-lg my-5">
			<div class="card-body p-0">
				<!-- Nested Row within Card Body -->
				<div class="row">
					<div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
					<div class="col-lg-7">
						<div class="p-5">
							<div class="text-center">
								<h1 class="h4 text-gray-900 mb-4">회원가입</h1>
							</div>
							<form id="joinForm" class="user"
								action="${contextPath}/auth/join" method="post" name=joinForm>

								<div class="form-group eror">
									<input name="username" type="text" id="username"
										class="form-control form-control-user" placeholder="아이디"
										maxlength="10" /> <font id="id_feedback" size="2"></font>

								</div>
								<div class="form-group row">
									<div class="col-sm-9 mb-3 mb-sm-0">
										<input name="email" type="email" id="email"
											class="form-control form-control-user" placeholder="이메일주소" />

									</div>
									<div class="col-sm-3">
										<button id="emailCheck" type="button"
											class="btn btn-primary btn-user btn-block"
											onclick="fn_emailCheck()" value="N">중복확인</button>
									</div>

								</div>
								<div class="form-group row">
									<div class="col-sm-6 mb-3 mb-sm-0">
										<input name="password" type="password" id="password"
											oninput="pwCheck()" class="form-control form-control-user"
											placeholder="비밀번호" />

									</div>
									<div class="col-sm-6">
										<input name="password_confirm" type="password"
										 id="password_confirm"
											class="form-control form-control-user" placeholder="비밀번호 확인" />
									</div>
									<div>
										&nbsp&nbsp&nbsp&nbsp&nbsp<span id="passwordCheck"> </span>
									</div>

								</div>
								<div class="form-group">
									<input name="phone" type="tel" id="phone"
										class="form-control form-control-user" placeholder="휴대폰번호" />
								</div>
								<div class="form-group row">
									<div class="col-sm-9 mb-3 mb-sm-0">
										<input name="address" type="text" id="address"
											class="form-control form-control-user" placeholder="주소" />
									</div>
									<div class="col-sm-3">
										<input type="button" onclick="exeDaumPostcode()"
											class="btn btn-primary btn-user btn-block" value="주소찾기" />
									</div>
								</div>
								<div class="form-group">
									<input name="detailAddress" type="text" id="detailAddress"
										class="form-control form-control-user" placeholder="상세주소" />
								</div>
								<div class="form-group row">
									<div class="col-sm-6 mb-3 mb-sm-0">
										<input name="zipCode" type="text" id="zipCode"
											class="form-control form-control-user" placeholder="우편번호" />
									</div>
									<div class="col-sm-6">
										<input name="note" type="text" id="note"
											class="form-control form-control-user" placeholder="참고사항" />
									</div>
								</div>
								<button type="button" class="btn btn-primary btn-user btn-block" name = "joinBtn" id="joinBtn"
									>Register Account</button>
							</form>

							<hr />
							<div class="text-center">
								<a class="small" href="/auth/login">Already have an account?
									Login!</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Bootstrap core JavaScript-->
	<script src="../resources/static/vendor/jquery/jquery.min.js"></script>
	<script
		src="../resources/static/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

	<!-- Core plugin JavaScript-->
	<script
		src="../resources/static/vendor/jquery-easing/jquery.easing.min.js"></script>

	<!-- Custom scripts for all pages-->
	<script src="../resources/static/js/sb-admin-2.min.js"></script>
	<script type="text/javascript"
		src="../resources/static/js/joinValidation.js"></script>
	<script type="text/javascript"
		src="../resources/static/js/postCode.js"></script>

</body>
</html>