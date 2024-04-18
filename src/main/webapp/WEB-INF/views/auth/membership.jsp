<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="contextPath"  value="${pageContext.request.contextPath}"  />
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta name="description" content="" />
    <meta name="author" content="" />

    <title>회원 가입</title>

    <!-- Custom fonts for this template-->
    <link
      href="../resources/static/vendor/fontawesome-free/css/all.min.css"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
      rel="stylesheet"
    />

    <!-- Custom styles for this template-->
    <link href="../resources/static/css/sb-admin-2.min.css" rel="stylesheet" />
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
                  <form id="join" class="user" action="${contextPath}/auth/join" method="post" name="formm">
                  <div class="form-group">
           
                    <input
                      name="username"
                      type="text"
                      class="form-control form-control-user"
                      placeholder="닉네임"
                    /> 
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-9 mb-3 mb-sm-0">
                      <input
                      	name="email"
                        type="email"
                        class="form-control form-control-user"
                        placeholder="이메일주소"
                      />
                    </div>
                    <div class="col-sm-3">
                      <a
                        href="login.html"
                        class="btn btn-primary btn-user btn-block"
                      >
                        중복확인
                      </a>
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-6 mb-3 mb-sm-0">
                      <input
                      	name="password"
                        type="password"
                        class="form-control form-control-user"
                        placeholder="비밀번호"
                      />
                    </div>
                    <div class="col-sm-6">
                      <input
                      	
                        type="password"
                        class="form-control form-control-user"
                        placeholder="비밀번호 확인"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <input
                      name="phone"
                      type="tel"
                      class="form-control form-control-user"
                      placeholder="휴대폰번호"
                    />
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-9 mb-3 mb-sm-0">
                      <input
                      	name="address"
                        type="text"
                        class="form-control form-control-user"
                        placeholder="주소"
                      />
                    </div>
                    <div class="col-sm-3">
                      <a
                        href="login.html"
                        class="btn btn-primary btn-user btn-block"
                      >
                        주소찾기
                      </a>
                    </div>
                  </div>
                  <div class="form-group">
                    <input
                      name="detailAddress"
                      type="text"
                      class="form-control form-control-user"
                      placeholder="상세주소"
                    />
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-6 mb-3 mb-sm-0">
                      <input
                        name="zipCode"
                        type="text"
                        class="form-control form-control-user"
                        placeholder="우편번호"
                      />
                    </div>
                    <div class="col-sm-6">
                      <input
                      	name="note"
                        type="text"
                        class="form-control form-control-user"
                        placeholder="참고사항"
                      />
                    </div>
                  </div>

                  <button
                  	type="submit"
                    class="btn btn-primary btn-user btn-block"
                  >
                    Register Account
                  </button>
                </form>
                
                <hr />
                <div class="text-center">
                  <a class="small" href="/auth/join"
                    >Already have an account? Login!</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bootstrap core JavaScript-->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Core plugin JavaScript-->
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom scripts for all pages-->
    <script src="js/sb-admin-2.min.js"></script>
  </body>
</html>
