CREATE TABLE USERS (
	user_id	number		NOT NULL,
	username	varchar2(20)		NOT NULL,
	email	varchar2(200)		NOT NULL,
	password	varchar2(64)		NOT NULL,
	phone	varchar2(11)		NOT NULL,
	address	varchar2(300)		NOT NULL,
	detail_address	varchar2(50)		NOT NULL,
	zip_code	varchar2(10)		NOT NULL,
	note	varchar2(20)		NOT NULL,
	created_date	timestamp		NOT NULL,
	modifid_date	timestamp		NOT NULL,
	is_deleted	varchar2(1)	DEFAULT 0	NOT NULL,
	CONSTRAINT PK_USERS PRIMARY KEY (user_id)
);

CREATE SEQUENCE USERS_SEQ 
INCREMENT BY 1
START WITH 1;

-- COMMENT ON COLUMN User.email IS 'UNIQUE';

CREATE TABLE POST (
	post_id	number		NOT NULL,
	title	varchar2(100)		NOT NULL,
	content	clob		NOT NULL,
	created_date	timestamp		NOT NULL,
	modified_date	timestamp		NOT NULL,
	upload_file_url	varchar2(300)		NULL,
	comment_cnt	number	DEFAULT 0	NOT NULL,
	is_deleted	varchar2(1)	DEFAULT 0	NOT NULL,
	CONSTRAINT PK_BOARD PRIMARY KEY (POST_ID)
);

CREATE SEQUENCE POST_SEQ
INCREMENT BY 1
START WITH 1; 

CREATE TABLE COMMENTS (
	comment_id	number		NOT NULL,
	content	varchar2(100)		NOT NULL,
	created_date	timestamp		NOT NULL,
	modified_date	timestamp		NOT NULL,
	parent_id	number		NULL,
	depth	number	DEFAULT 0	NOT NULL,
	is_deleted	varchar2(1)	DEFAULT 0	NOT NULL,
	order_number	number	DEFAULT 0	NOT NULL,
	CONSTRAINT PK_COMMENT PRIMARY KEY (COMMENT_ID)
);

CREATE SEQUENCE COMMENT_SEQ
INCREMENT BY 1
START WITH 1; 

CREATE TABLE UPLOADFILE (
	uploadFile_id	number		NOT NULL,
	org_file_name	varchar2(50)		NOT NULL,
	save_file_name	varchar2(100)		NOT NULL,
	save_path	varchar2(50)		NOT NULL,
	file_size	varchar2(10)		NOT NULL,
	created_date	timestamp		NOT NULL,
	modified_date	timestamp		NOT NULL,
	is_deleted	varchar2(1)	DEFAULT 0	NOT NULL,
	CONSTRAINT PK_UPLOADFILE PRIMARY KEY (uploadFile_id)
);

CREATE SEQUENCE UPLOADFILE_SEQ
INCREMENT BY 1
START WITH 1; 



-- 사용자 샘플 데이터 
INSERT INTO USERS (user_id, username, email, password, phone, address, detail_address, zip_code, note)
VALUES (users_seq.nextval, 'john_doe', 'john@example.com', 'hashed_password', '1234567890', '123 Main St', 'Apt 101', '12345', 'Sample Note 1');

INSERT INTO USERS (user_id, username, email, password, phone, address, detail_address, zip_code, note)
VALUES (2, 'jane_smith', 'jane@example.com', 'hashed_password', '0987654321', '456 Oak St', 'Suite 202', '54321', 'Sample Note 2');

INSERT INTO USERS (user_id, username, email, password, phone, address, detail_address, zip_code, note)
VALUES (3, 'alice_wonderland', 'alice@example.com', 'hashed_password', '1112223333', '789 Elm St', 'Unit 303', '67890', 'Sample Note 3');






