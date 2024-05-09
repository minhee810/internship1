<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page session = "true" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

                     
                                    <form action="#" id="replyForm" name="replyForm">

                                        <input type="hidden" id="boardId" name="boardId" value="${detail.boardId}">
                                        <input type="hidden" name="parentCommentNo" value="0">
                                        <input type="hidden" name="commentNo" value="0">


                                        <ul id="commentDiv" style="max-height: 500px; overflow-y: scroll;overflow-x: hidden;">

                                            <c:forEach var="commentList" items="${commentList}">
                                                <li class="commentData" data-no="${commentList.commentId}" 
                                                data-name="${commentList.username}" 
                                                data-date="${commentList.createdDate}" 
                                                data-parent="${commentList.parentId}" 
                                                data-writer="${commentList.writer}">
                                                    <div class="commentDiv" style="padding-left: ${commentList.depth *15}px;">
                                                        <div class="commentHead">
                                                            <div class="commentHead1">
                                                                <div class="commentName">@ ${commentList.username}</div>

                                                                <div class="commentDate">
                                                                    <fmt:parseDate value="${commentList.createdDate}" pattern="yyyy-MM-dd'T'HH:mm:ss" var="parsedDateTime" type="both" />
                                                                    <fmt:formatDate pattern="yyyy-MM-dd HH:mm:ss" value="${parsedDateTime}" />
                                                                </div>
                                                            </div>
                                                            <div class="commentHead2">
                                                                <c:choose>
                                                                    <c:when test="${!empty loginUsername}">
                                                                        <div class="commentReply">답글</div>
                                                                    </c:when>
                                                                </c:choose>

                                                                <c:choose>
                                                                    <c:when test="${commentList.username eq loginUsername}">
                                                                        <div class="commentModify" onclick="commentUpdate()">수정</div>
                                                                        <div class="commentRemove" onclick="commentDelete(${commentList.commentId})">삭제</div>
                                                                        <div class="commentCancle" style="display:none;">취소</div>
                                                                    </c:when>
                                                                </c:choose>
                                                            </div>
                                                        </div>
                                                        <div class="comment">
                                                            <p id="commentContent">${commentList.commentContent}</p>
                                                        </div>
                                                    </div>
                                                    <hr class="sidebar-divider d-none d-md-block">
                                                </li>
                                            </c:forEach>
                                        </ul>
                                    </form>

                                    <c:choose>
                                        <c:when test="${!empty loginUsername}">
                                            <form action="" class="flex" id="commentForm" name="commentForm">
                                            <div>
                                            <label>댓글 작성자</label> 
											<input type="text" class="mini3" id=id name="id" value="${loginUsername}" readonly />
											</div>
                                                <input type="hidden" name="boardId" value="${detail.boardId}">
                                                <textarea id="commentContent" cols="30" row="5" name="commentContent" class="form-control flex" style="width: 90%" placeholder="내용"></textarea>
                                                <a class="commentAdd flex" style="width: 9%">
                                                    <button type="button" id="commentSaveBtn" class="btn btn-primary btn ml-1" style="margin-top: 0.75rem;width: 100%">등록</button>
                                                </a>
                                            </form>
                                        </c:when>
                                    </c:choose>
                                    
                    
                        