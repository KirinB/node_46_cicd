CREATE TABLE `nguoi_dung`(
	nguoi_dung_id INT PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(255) NOT NULL,
	mat_khau VARCHAR(255) NOT NULL,
	ho_ten VARCHAR(255) NOT NULL,
	tuoi INT,
	anh_dai_dien VARCHAR(255),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

CREATE TABLE `hinh_anh`(
	hinh_id INT PRIMARY KEY AUTO_INCREMENT,
	ten_hinh VARCHAR(255),
	duong_dan VARCHAR(255),
	mo_ta VARCHAR(255),
	nguoi_dung_id INT,
	FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

CREATE TABLE `binh_luan`(
	binh_luan_id INT PRIMARY KEY AUTO_INCREMENT,
	nguoi_dung_id INT,
	hinh_id INT,
	ngay_binh_luan DATE,
	noi_dung TEXT,
	FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id),
	FOREIGN KEY (hinh_id) REFERENCES hinh_anh(hinh_id),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

CREATE TABLE `luu_anh`(
	luu_anh INT PRIMARY KEY AUTO_INCREMENT,
	nguoi_dung_id INT,
	hinh_id INT,
	ngay_luu DATE,
	FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id),
	FOREIGN KEY (hinh_id) REFERENCES hinh_anh(hinh_id),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)


