<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html>
<head>
    <title>SB Admin 1 - Join</title>
	<%@ include file="../layout/head.jsp" %>
    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
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
                            <form id="joinForm" class="user" action="#" method="post" name=joinForm>

                                <div class="form-group eror">
                                    <input name="username" type="text" id="username" class="form-control form-control-user" placeholder="아이디" maxlength="10"/>
                                    <font id="id_feedback" size="2"></font>

                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-9 mb-3 mb-sm-0">
                                        <input name="email" type="text" id="email" class="form-control form-control-user" placeholder="이메일주소" />

                                    </div>
                                    <div class="col-sm-3">
                                        <button id="emailCheck" type="button" class="btn btn-primary btn-user btn-block" value="N">중복확인</button>
                                    </div>

                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                        <input name="password" type="password" id="password" autocomplete="off" class="form-control form-control-user" placeholder="비밀번호" />

                                    </div>
                                    <div class="col-sm-6">
                                        <input name="password_confirm" type="password" id="password_confirm" autocomplete="off" class="form-control form-control-user" placeholder="비밀번호 확인" />
                                    </div>

                                </div>
                                <div class="form-group">
                                    <input name="phone" type="tel" id="phone" class="form-control form-control-user" placeholder="휴대폰번호" />
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-9 mb-3 mb-sm-0">
                                        <input name="address" type="text" id="address" class="form-control form-control-user" placeholder="주소" />
                                    </div>
                                    <div class="col-sm-3">
                                        <input type="button" onclick="exeDaumPostcode('note', 'zipCode', 'address', 'detailAddress')" class="btn btn-primary btn-user btn-block" value="주소찾기" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <input name="detailAddress" type="text" id="detailAddress" class="form-control form-control-user" placeholder="상세주소" />
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                        <input name="zipCode" type="text" id="zipCode" class="form-control form-control-user" placeholder="우편번호" />
                                    </div>
                                    <div class="col-sm-6">
                                        <input name="note" type="text" id="note" class="form-control form-control-user" placeholder="참고사항" />
                                    </div>
                                </div>
                                <button type="button" class="btn btn-primary btn-user btn-block" name="joinBtn" id="joinBtn">Register Account</button>
                            </form>
                            <hr />
                            <div class="text-center">
                                <a class="small" href="/member/login">Already have an account? Login!</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
	<%@ include file="../layout/script.jsp" %>
    <script type="text/javascript" src="../resources/static/js/auth/join.js"></script>
    <script type="text/javascript" src="../resources/static/js/utils/valid.js"></script>
    <script type="text/javascript" src="../resources/static/js/utils/utility.js"></script>
</body>

</html>