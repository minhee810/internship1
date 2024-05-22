<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page session = "true" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Tables</title>
    <%@ include file="../layout/head.jsp" %>
    <link href="${contextPath}/resources/static/css/style.css" rel="stylesheet" />
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

                                <div id="boardId" hidden="true" data-title="게시글">${detail.boardId}</div>
                                <div id="writer" hidden="true">${detail.writer}</div>
                                
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
                                <div class="card-body navbar-nav-scroll" style="white-space: pre-line; height: 290px !important ">
                                    ${detail.content}
                               </div>


                                <div class="card-body fileUpLoad">
                                    <label class="fileUpLoadBtn">파일</label>
                                    <div id="fileName" class="fileName">
                                        <!-- file upload -->
                                       <c:choose>
                                       <c:when  test="${!empty loginUsername}">
                                       <c:forEach var="files" items="${files}">
                                                <div class="custom-file">
                                                    <a href="<c:url value='/fileDownload/${detail.boardId}/${files.saveFileName}/${files.orgFileName}' /> ">${files.orgFileName} 파일 다운로드 (${files.fileSize} kb)</a><br>
                                                </div>
                                        </c:forEach>
                                       </c:when>
                                            <c:otherwise>
                                          <c:forEach var="files" items="${files}">
                                                <div class="custom-file">
                                                    <span>${files.orgFileName} 파일 다운로드 (${files.fileSize} kb)</span><br>
                                                </div>
                                        </c:forEach>
                                        
                                        </c:otherwise>
                                       </c:choose>
                                       
                                        
                                    </div>
                                </div>
                              
                                <div class="card-footer">
 								    <form action="" id="replyForm" name="replyForm">
                                    <ul id="commentDiv" style="max-height: 500px; overflow-y: scroll;overflow-x: hidden;"></ul>
                                    </form> 
                                    <template id="modifyAddForm">
                                            <div class="commentForm">
										        <form action="#" id="modifyAddForm" class="">
										         <button id="cancelCommentAdd" class="btn btn-primary btn float-right ml-1" onclick="cancelView()">취소</button>
														<button id="submitButton" class="btn btn-primary btn float-right ml-1">완료</button>
													<div>
											         <div>
														<label id="id" name="id"> 
														<div type="text" class="mini3" id="id" name="id">
														</div>
														</label>		
														</div>
										            	<textarea id="commentContent" data-title="댓글" cols="30" row="5" name="commentContent" class="form-control flex" style="width: 90%" placeholder="대댓글 내용을 작성해주세요." maxlength="300"></textarea>
										           
										           </div>
										        </form>
										     </div>
									</template>
                                    <c:choose>
                                        <c:when test="${!empty loginUsername}">
                                            <form action="" class="flex" id="commentForm" name="commentForm">
                                                <input type="hidden" name="boardId" value="${detail.boardId}">
                                                <textarea id="commentContent" cols="30" row="5" data-title="댓글 내용" name="commentContent" class="form-control flex" style="width: 90%" placeholder="내용" maxlength="300"></textarea>
                                                <a class="commentAdd flex" style="width: 9%">
                                                    <button type="button" id="commentSaveBtn" class="btn btn-primary btn ml-1" style="margin-top: 0.75rem;width: 100%">등록</button>
                                                </a>
                                            </form>
                                        </c:when>
                                    </c:choose>
 								</div>
 								<!-- card - footer END -->
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
	<%@ include file="../layout/logoutModal.jsp" %>
	<%@ include file="../layout/script.jsp" %>
    <!-- Page level plugins -->
    <script src="${contextPath}/resources/static/vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="${contextPath}/resources/static/vendor/datatables/dataTables.bootstrap4.min.js"></script>

    <!-- Page level custom scripts -->
    <script src="${contextPath}/resources/static/js/demo/datatables-demo.js"></script>
    <script src="${contextPath}/resources/static/js/board/boardDetail.js"></script>
    <script src="${contextPath}/resources/static/js/utils/valid.js"></script>

</body>

</html>