<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
	<%@ include file="../layout/head.jsp" %>
    <title>SB Admin 2 - 404</title>
</head>

<body id="page-top">
    <!-- Page Wrapper -->
    <div id="wrapper">
    
        <!-- Sidebar -->
        <%@ include file="../layout/sidebar.jsp" %>

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">
            <!-- Main Content -->
            <div id="content">
            
                <!-- Topbar -->
                 <%@ include file="../layout/header.jsp" %>
                <!-- End of Topbar -->

                <!-- Begin Page Content -->
                <div class="container-fluid">
                    <!-- 404 Error Text -->
                    <div class="text-center">
                        <div class="error mx-auto" data-text="ERROR">ERROR</div>
                        <p class="lead text-gray-800 mb-5">Page Not Found</p>
                        <p class="text-gray-500 mb-0">It looks like you found a glitch
                            in the matrix...</p>
                        <a href="index.html">&larr; Back to Dashboard</a>
                    </div>
                </div>
                <!-- /.container-fluid -->
            </div>
            <!-- End of Main Content -->

		<%@ include file="../layout/footer.jsp" %>
        </div>
        <!-- End of Content Wrapper -->
    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top"> <i class="fas fa-angle-up"></i></a>

    <!-- Logout Modal-->
	<%@ include file="../layout/model.jsp" %>
	<%@ include file="../layout/script.jsp" %>
</body>

</html>