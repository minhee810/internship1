<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page session = "true" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html lang="en">

<head>
    <%@ include file="../layout/head.jsp" %>
    <!-- Custom styles for this page -->
    <link href="../resources/static/vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" />
</head>

<body id="page-top">

    <!-- Page Wrapper -->
    <div id="wrapper">
        <%@ include file="../layout/sidebar.jsp" %>

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">
            <!-- Main Content -->
            <div id="content">
                <%@ include file="../layout/header.jsp" %>
                <!-- End of Topbar -->

                <!-- Begin Page Content -->
                <div class="container-fluid">
                    <!-- Page Heading -->
                    <h1 class="h3 mb-2 text-gray-800">게시판</h1>

                    <!-- DataTales Example -->
                    <div class="card shadow mb-4">
                        <!-- ✅ 페이지 요소 추가 -->
                        <input type="hidden" name="page" id="page" value="0" />
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="boardList" width="100%" cellspacing="0">
                                    <colgroup>
                                        <col width="20%" />
                                        <col width="40%" />
                                        <col width="30%" />
                                        <col width="20%" />
                                    </colgroup>

                                    <thead>

                                        <tr>
                                            <th>닉네임</th>
                                            <th>제목</th>
                                            <th>날짜</th>
                                            <th>댓글</th>
                                        </tr>
                                    </thead>
                                    <tbody id="fieldListBody">
                                        <c:forEach var="list" items="${boardList.content}">
                                            <tr>
                                                <td>${list.username}</td>
                                                <td><a href="${contextPath}/board/detail/${list.boardId}">${list.title}</a></td>
                                                <td>
                                                    <fmt:parseDate value="${list.createdDate}" pattern="yyyy-MM-dd" var="parsedDateTime" type="both" />
                                                    <fmt:formatDate pattern="yyyy-MM-dd" value="${parsedDateTime}" />
                                                </td>
                                                <td>${list.commentCnt}개</td>
                                            </tr>
                                        </c:forEach>
                                    </tbody>
                                </table>

                                <c:choose>
                                    <c:when test="${!empty loginUser}">
                                        <a href="${contextPath}/board/write">
                                            <button type="button" id="writeBtn" name="writeBtn" class="btn btn-primary btn float-right">
                                                게시글 작성
                                            </button>
                                        </a>
                                    </c:when>
                                    <c:when test="${empty loginUser}">
                                        <a onclick="loginPage()">
                                            <button type="button" id="writeBtn" name="writeBtn" class="btn btn-primary btn float-right">
                                                게시글 작성
                                            </button>
                                        </a>
                                    </c:when>

                                </c:choose>

                            </div>

                            <!--  페이징 표시되는 부분 추가 -->
                            <div class="text-xs-center">
                                <ul class="pagination justify-content-center">
                                    <!-- 이전 -->
                                    <c:choose>
                                        <c:when test="${boardList.first}"></c:when>
                                        <c:otherwise>
                                            <li class="page-item"><a class="page-link" href="${contextPath}/?page=0">처음</a></li>
                                            <li class="page-item"><a class="page-link" href="${contextPath}/?page=${boardList.number-1}">&larr;</a></li>
                                        </c:otherwise>
                                    </c:choose>

                                    <!--  paging -->
                                    <c:forEach begin="${startBlockPage}" end="${endBlockPage}" var="i">
                                        <c:choose>
                                            <c:when test="${boardList.pageable.pageNumber+1 == i}">
                                                <li class="page-item active">
                                                    <a class="page-link" href="/?page=${i-1}">${i}</a>
                                                </li>
                                            </c:when>
                                            <c:otherwise>
                                                <li class="page-item">
                                                    <a class="page-link" href="/?page=${i-1}">${i}</a>
                                                </li>
                                            </c:otherwise>
                                        </c:choose>
                                    </c:forEach>

                                    <!-- 다음 -->
                                    <c:choose>
                                        <c:when test="${boardList.last}"></c:when>
                                        <c:otherwise>
                                            <li class="page-item"><a class="page-link" href="${contextPath}/?page=${boardList.number+1}">&rarr;</a></li>
                                            <li class="page-item"><a class="page-link" href="${contextPath}/?page=${boardList.totalPages-1}">마지막</a></li>
                                        </c:otherwise>
                                    </c:choose>
                                </ul>
                            </div>
                            <!-- 페이징 영역 끝 -->
                        </div>
                    </div>
                    <!-- 페이징 영역 끝 -->
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
    <%@ include file="../layout/logoutModal.jsp" %>
    <%@ include file="../layout/script.jsp" %>
    <!-- Page level plugins -->
    <script src="../resources/static/vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="../resources/static/vendor/datatables/dataTables.bootstrap4.min.js"></script>

    <!-- Page level custom scripts -->
    <script src="../resources/static/js/demo/datatables-demo.js"></script>

    <script type="text/javascript" src="../resources/static/js/board/boardMain.js"></script>
    <script type="text/javascript" src="../resources/static/js/com-page.js"></script>


</body>

</html>