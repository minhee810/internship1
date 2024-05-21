<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page session = "true" %>

<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="en">

<head>
	<%@ include file="../layout/head.jsp" %>
    <title>Tables</title>
    <!-- Custom styles for this page -->
    <link href="../resources/static/vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" />
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
                            <form id="writeForm" name="writeForm" action="${contextPath}/board/write" method="post" class="h-100" enctype="multipart/form-data">
                                <div class="card shadow mb-4 h-100">
                                    <div class="card-header py-3">
                                        <div class="col-sm-11 float-left">
                                        <input id="board" type="hidden" data-title="게시글"/>
                                            <input type="text" id="title" name="title" class="form-control" placeholder="제목" maxlength="30" data-title="제목"/>
                                        </div>
                                        <button type="button" id="insertBtn" name="insertBtn" class="btn btn-primary btn float-right ml-1">
                                            작성완료
                                        </button>
                                    </div>
                                    <div class="card-body mb-4 h-100">
                                        <textarea id="content" name="content" cols="30" class="form-control h-100" placeholder="내용" style="resize: none" maxlength="100000" data-title="내용"></textarea>
                                    <!-- file upload -->
                                        <div class="multiple-upload" >
                                            	<!-- test -->
	                                            <input type="file" name="files" multiple="multiple" onchange="test(this.files)">
												<div id="file-list"></div>
                                            </div>
                                        </div>
                                    </div>
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

    <!-- Logout Modal-->
	<%@ include file="../layout/logoutModal.jsp" %>>
	<%@ include file="../layout/script.jsp" %>
	
    <!-- Page level plugins -->
    <script src="../resources/static/vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="../resources/static/vendor/datatables/dataTables.bootstrap4.min.js"></script>

    <!-- Page level custom scripts -->
    <script src="../resources/static/js/demo/datatables-demo.js"></script>
    <script src="../resources/static/js/board/boardWrite.js"></script>
  
</body>

</html>