<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<!DOCTYPE html>
<html lang="en">
  <head>
  	<%@ include file="../layout/head.js" %>
    <title>Tables</title>
 
  </head>

  <body id="page-top">
    <!-- Page Wrapper -->
    <div id="wrapper">
      <!-- Sidebar -->
    <%@ include file="../layout/sidebar.jsp" %>
      <!-- End of Sidebar -->
      <!-- Content Wrapper -->
      <div id="content-wrapper" class="d-flex flex-column">
        <!-- Main Content -->
        <div id="content">
          <!-- Topbar -->
            <!-- Sidebar Toggle (Topbar) -->
			<%@ include file ="../layout/header.jsp" %>
          <!-- End of Topbar -->
          <!-- Begin Page Content -->
          <div class="container-fluid h-100">
            <!-- Page Heading -->
            <h1 class="h3 mb-2 text-gray-800">게시판</h1>
            <!-- DataTales Example -->
            <div class="card shadow mb-4 h-75">
              <div class="card-body">
                <form class="user">
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control form-control-user"
                      placeholder="닉네임"
                    />
                  </div>
                  <div class="form-group row">
                    <div class="ml-4">
                      <p class="mt-3">이메일주소</p>
                    </div>
                  </div>
                  <div class="form-group">
                    <input
                      type="email"
                      class="form-control form-control-user"
                      placeholder="휴대폰번호"
                    />
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-9 mb-3 mb-sm-0">
                      <input
                        type="email"
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
                      type="email"
                      class="form-control form-control-user"
                      placeholder="상세주소"
                    />
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-6 mb-3 mb-sm-0">
                      <input
                        type="password"
                        class="form-control form-control-user"
                        placeholder="우편번호"
                      />
                    </div>
                    <div class="col-sm-6">
                      <input
                        type="password"
                        class="form-control form-control-user"
                        placeholder="참고사항"
                      />
                    </div>
                  </div>

                  <a
                    href="profile.html"
                    class="btn btn-primary btn-user btn-block"
                  >
                    Register Account
                  </a>
                </form>
              </div>
            </div>
          </div>
          <!-- /.container-fluid -->
        </div>
        <!-- End of Main Content -->

        <!-- Footer -->
		<%@ include file="../layout/footer.jsp" %>
        <!-- End of Footer -->
      </div>
      <!-- End of Content Wrapper -->
    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a>
	<%@ include file="../layout/logoutModal.jsp" %>
    <%@ include file="../layout/script.jsp" %>
    
    <!-- Page level plugins -->
    <script src="${contextPath}/resources/static/vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="${contextPath}/resources/static/vendor/datatables/dataTables.bootstrap4.min.js"></script>

    <!-- Page level custom scripts -->
    <script src="${contextPath}/resources/static/js/demo/datatables-demo.js"></script>
  </body>
</html>
