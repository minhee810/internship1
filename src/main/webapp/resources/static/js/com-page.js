/**
 * 
 */
const PAGE = {
	paging: function(totalPageCount, pageNo, totalElementCount, fn) {

		if (totalElementCount == 0) {
			document.querySelector("#pagingArea").innerHTML = "";
			return false;
		}

		let pageBlock = 10;
		let blockNo = PAGE.toInt(pageNo / pageBlock) + 1;
		let startPageNo = (blockNo - 1) * pageBlock;
		let endPageNo = blockNo * pageBlock - 1;

		if (endPageNo > totalPageCount - 1) {
			endPageNo = totalPageCount - 1;
		}

		let prevBlockPageNo = (blockNo - 1) * pageBlock - 1;
		let nextBlockPageNo = blockNo * pageBlock;

		let strHTML = "";

		// <, << 활성화/비활성화 처리
		if (prevBlockPageNo >= 0) {
			// <, << 활성화
			strHTML += "<li><a href='javascript:" + fn + "(" + 0 + ");' ><span class='icon page_prev_on'></span></a></li>";
			strHTML += "<li><a href='javascript:" + fn + "(" + prevBlockPageNo + ");' ><span class='icon page_left_on'></span></a></li>";
		} else {
			// <, << 비활성화
			strHTML += "<li><a><span class='icon page_prev_off'></span></a></li>";
			strHTML += "<li><a><span class='icon page_left_off'></span></a></li>";
		}

		// 페이징 번호 생성
		for (let i = startPageNo; i <= endPageNo; i++) {
			if (i == pageNo) {
				strHTML += "<li class='active'><a>" + (i + 1) + "</a></li>";
			} else {
				strHTML += "<li><a href='javascript:" + fn + "(" + i + ");' >" + (i + 1) + "</a></li>";
			}
		}

		// >, >> 활성화/비활성화 처리
		if (nextBlockPageNo < totalPageCount) {
			// >, >> 활성화
			strHTML += "<li><a href='javascript:" + fn + "(" + nextBlockPageNo + ");' ><span class='icon page_right_on'></span></a></li>";
			strHTML += "<li><a href='javascript:" + fn + "(" + (totalPageCount - 1) + ");' ><span class='icon page_next_on'></span></a></li>";
		} else {
			// >, >> 비활성화
			strHTML += "<li><a><span class='icon page_right_off'></span></a></li>";
			strHTML += "<li><a><span class='icon page_next_off'></span></a></li>";
		}

		let element = document.querySelector("#pagingArea");
		element.innerHTML = strHTML;
	},

	toInt: function(value) {
		if (value != null) {
			return parseInt(value, 10);
		}
	},

	pageRowNumber: function(pageNo, pageSize, index, totalCount) {
		debugger;
		if (totalCount) {
			return totalCount - ((pageNo) * pageSize + index);
		} else {
			return (pageNo) * pageSize + (index + 1);
		}
	}
}