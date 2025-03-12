import multer from "multer";
import path from "path";

//Xử lý tên file và đuôi mở rộng (extension) (lấy code mẫu trên github:https://www.npmjs.com/package/multer#diskstorage)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // có req và file để xử lý logic tạo ra folder muốn lưu trữ (file: image,doc,excel,pds,...)
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // const fileExtension đuôi mở rộng của file
    const fileExtension = path.extname(file.originalname);

    const fileNameString = `local-${file.fieldname}-${uniqueSuffix}${fileExtension}`;
    cb(null, fileNameString);
  },
});

const uploadLocal = multer({
  storage,
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
});

export default uploadLocal;
