<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ page session = "true" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html lang="en">
  <head>
	<%@ include file="../layout/head.jsp" %>
    <title>Tables</title>
  </head>
<style>
.mn-h-24{
	    min-height: 24px !important;
}
</style>
  <body id="page-top">
    <!-- Page Wrapper -->
    <div id="wrapper">
     <%@ include file="../layout/sidebar.jsp" %>

      <!-- Content Wrapper -->
      <div id="content-wrapper" class="d-flex flex-column">
        <!-- Main Content -->
        <div id="content">
          <!-- Topbar -->
            <%@ include file="../layout/header.jsp" %>
          <!-- End of Topbar -->

          <!-- Begin Page Content -->
          <div class="container-fluid h-100">
            <!-- Page Heading -->
            <h1 class="h3 mb-2 text-gray-800">게시판</h1>

            <!-- DataTales Example -->
            <div class="card shadow mb-4 h-75">
              <div class="card-body">
                <!-- Basic Card Example -->
                <div class="card shadow mb-4 h-100">
                  <div class="ml-4">
                    <p class="mt-3">닉네임</p>
                  </div>
                  <hr class="sidebar-divider my-0" />
                  <div class="ml-4">
                    <p class="mt-3">이메일주소</p>
                  </div>
                  <hr class="sidebar-divider my-0" />
                  <div class="ml-4">
                    <p class="mt-3">휴대폰번호</p>
                  </div>
                  <hr class="sidebar-divider my-0" />
                  <div class="form-group">
                    <div class="ml-4">
                      <p class="mt-3">주소</p>
                    </div>
                    <hr class="sidebar-divider my-0" />
                    <div class="ml-4">
                      <p class="mt-3">상세주소</p>
                    </div>
                  </div>
                  <hr class="sidebar-divider my-0" />
                  <div class="form-group row">
                    <div class="ml-4 col-sm-5 mb-3 mb-sm-0">
                      <p class="mt-3">우편번호</p>
                    </div>
                    <div class="ml-4 col-sm-5">
                      <p class="mt-3">참고사항</p>
                    </div>
                  </div>
                  <hr class="sidebar-divider my-0" />

                  <a
                    href="profileModify.html"
                    class="btn btn-primary btn-user btn-block"
                  >
                    Register Account
                  </a>
                </div>
              </div>
            </div>
          </div>
          <!-- /.container-fluid -->
        </div>
        <!-- End of Main Content -->

        <!-- Footer -->
 <%@ include file="../layout/footer.jsp" %>
      </div>
      <!-- End of Content Wrapper -->
    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a>

 	<%@ include file="../layout/logoutModal.jsp" %>>
	<%@ include file="../layout/script.jsp" %>

    <!-- Page level plugins -->
    <script src="${contextPath}/resources/static/vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="${contextPath}/resources/static/vendor/datatables/dataTables.bootstrap4.min.js"></script>

    <!-- Page level custom scripts -->
    <script src="${contextPath}/resources/static/js/demo/datatables-demo.js"></script>
    
  </body>
</html>
