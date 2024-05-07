<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page session = "true" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />

    <title>Tables</title>
	<!-- Custom fonts for this template -->
    <link href="${contextPath}/resources/static/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css" />
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet" />

    <!-- Custom styles for this template -->
    <link href="${contextPath}/resources/static/css/sb-admin-2.min.css" rel="stylesheet" />

    <!-- Custom styles for this page -->
    <link href="${contextPath}/resources/static/vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" />

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
                    
                                <div id="boardId" hidden="true">${detail.boardId}</div>
                                <div class="card-header py-3">
                                    <h6 class="m-0 font-weight-bold text-primary btn float-left">
                                        ${detail.title}
                                    </h6>
                                    
                                    <c:choose>
				                        <c:when test="${loginUser == detail.writer}">
					                        <a href="${contextPath}/board/modify/${boardId}">
		                                        <button type="button" class="btn btn-primary btn float-right ml-1">
		                                            수정
		                                        </button>
                                    		</a>
			                                    <button type="button" class="btn btn-danger btn float-right" id="deleteBtn" name="deleteBtn">
			                                        삭제
			                                    </button>
				                        </c:when>
				                    </c:choose>
                               
                           
                                </div>
                                <div class="card-body navbar-nav-scroll" style="height: 290px !important">
            					${detail.content}
                                </div>
                          
                                
                                <div class="card-body fileUpLoad">
                                    <label class="fileUpLoadBtn">파일</label>
                                    <div id="fileName" class="fileName">
                                         <!-- file upload -->
	                                      	<c:forEach var ="files" items="${files}">
	                                        <div class="multiple-upload" style="display: flex; justify-content: space-between;"> 
	                                            
	                                           
	                                            <div class="custom-file"> 
												    <a href="<c:url value='/fileDownload/${detail.boardId}/${files.saveFileName}/${files.orgFileName}' /> ">${files.orgFileName} 파일 다운로드 (${files.fileSize} kb)</a><br>
	                                            </div> 

	                                        </div>
	                                    </c:forEach> 
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <form action="#" id="replyForm" name="replyForm">
                                        <input type="hidden" id="boardId" name="boardId" value="${detail.boardId}">
                                       
                                        <input type="hidden" name="parentCommentNo" value="0">
                                        <input type="hidden" name="commentNo" value="0">
                                        <ul id="commentDiv" style="max-height: 500px; overflow-y: scroll;overflow-x: hidden;">

                                            <li data-no="1" data-name="test" data-date="2024-04-01 12:45:23" data-parent="0">
                                                <div class="commentDiv" style="padding-left: 2rem;">
                                                    <div class="commentHead">
                                                        <div class="commentHead1">
															
                                                            <div class="commentName">test</div>
                                                            <div class="commentDate">2024-04-01 12:45:23</div>

                                                        </div>
														
                                                        <div class="commentHead2">

                                                            <div class="commentReply">답글</div>

                                                            <div class="commentModify">수정</div>
                                                            <div class="commentRemove">삭제</div>

                                                            <div class="commentCancle" style="display:none;">취소</div>
															
                                                        </div>

                                                    </div>
                                                    <div class="comment">

                                                        <p id="commentContent"></p>


                                                    </div>
                                                </div>
                                                <hr class="sidebar-divider d-none d-md-block">
                                            </li>

                                            <li data-no="3" data-name="test" data-date="2024-04-01 12:45:30" data-parent="1">
                                                <div class="commentDiv" style="padding-left: 3rem;">
                                                    <div class="commentHead">
                                                        <div class="commentHead1">

                                                            <div class="commentName">test</div>
                                                            <div class="commentDate">2024-04-01 12:45:30</div>

                                                        </div>

                                                        <div class="commentHead2">

                                                            <div class="commentReply">답글</div>

                                                            <div class="commentModify">수정</div>
                                                            <div class="commentRemove">삭제</div>

                                                            <div class="commentCancle" style="display:none;">취소</div>

                                                        </div>

                                                    </div>
                                                    <div class="comment">

                                                        <p>@test test</p>


                                                    </div>
                                                </div>
                                                <hr class="sidebar-divider d-none d-md-block">
                                            </li>

                                            <li data-no="5" data-name="test2" data-date="2024-04-01 12:46:53" data-parent="1">
                                                <div class="commentDiv" style="padding-left: 3rem;">
                                                    <div class="commentHead">
                                                        <div class="commentHead1">

                                                            <div class="commentName">test2</div>
                                                            <div class="commentDate">2024-04-01 12:46:53</div>

                                                        </div>

                                                        <div class="commentHead2">

                                                            <div class="commentReply">답글</div>

                                                            <div class="commentCancle" style="display:none;">취소</div>

                                                        </div>

                                                    </div>
                                                    <div class="comment">

                                                        <p>@test dddd</p>


                                                    </div>
                                                </div>
                                                <hr class="sidebar-divider d-none d-md-block">
                                            </li>

                                            <li data-no="2" data-name="test" data-date="2024-04-01 12:45:26" data-parent="0">
                                                <div class="commentDiv" style="padding-left: 2rem;">
                                                    <div class="commentHead">
                                                        <div class="commentHead1">

                                                            <div class="commentName">test</div>
                                                            <div class="commentDate">2024-04-01 12:45:26</div>

                                                        </div>

                                                        <div class="commentHead2">

                                                            <div class="commentReply">답글</div>

                                                            <div class="commentModify">수정</div>
                                                            <div class="commentRemove">삭제</div>

                                                            <div class="commentCancle" style="display:none;">취소</div>

                                                        </div>

                                                    </div>
                                                    <div class="comment">

                                                        <p>test</p>


                                                    </div>
                                                </div>
                                                <hr class="sidebar-divider d-none d-md-block">
                                            </li>

                                            <li data-no="4" data-name="test2" data-date="2024-04-01 12:46:49" data-parent="0">
                                                <div class="commentDiv" style="padding-left: 2rem;">
                                                    <div class="commentHead">
                                                        <div class="commentHead1">

                                                            <div class="commentName">test2</div>
                                                            <div class="commentDate">2024-04-01 12:46:49</div>

                                                        </div>

                                                        <div class="commentHead2">

                                                            <div class="commentReply">답글</div>

                                                            <div class="commentCancle" style="display:none;">취소</div>

                                                        </div>

                                                    </div>
                                                    <div class="comment">

                                                        <p>testddd</p>


                                                    </div>
                                                </div>
                                                <hr class="sidebar-divider d-none d-md-block">
                                            </li>

                                        </ul>
                                    </form>

                                    <form action="#" class="flex" id="commentForm" name="commentForm">
                                        <input type="hidden" name="boardNo" value="1">
                                        <textarea id="a3" cols="30" row="5" name="commentContent" class="form-control flex" style="width: 90%" placeholder="내용
                         "></textarea>
                                        <a href="#" class="commentAdd flex" style="width: 9%">
                                            <button type="button" class="btn btn-primary btn ml-1" style="margin-top: 0.75rem;width: 100%">등록</button>
                                        </a>
                                    </form>

                                </div>
                            </div>
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
    <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    Select "Logout" below if you are ready to end your current session.
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">
                        Cancel
                    </button>
                    <a class="btn btn-primary" href="login.html">Logout</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap core JavaScript-->
    <script src="${contextPath}/resources/static/vendor/jquery/jquery.min.js"></script>
    <script src="${contextPath}/resources/static/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Core plugin JavaScript-->
    <script src="${contextPath}/resources/static/vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom scripts for all pages-->
    <script src="${contextPath}/resources/static/js/sb-admin-2.min.js"></script>

    <!-- Page level plugins -->
    <script src="${contextPath}/resources/static/vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="${contextPath}/resources/static/vendor/datatables/dataTables.bootstrap4.min.js"></script>

    <!-- Page level custom scripts -->
    <script src="${contextPath}/resources/static/js/demo/datatables-demo.js"></script>
    
    <script src="${contextPath}/resources/static/js/board/boardDetail.js"></script>
</body>

</html>