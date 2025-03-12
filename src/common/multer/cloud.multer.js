import multer from "multer";
import path from "path";

//memoryStoreage để lưu tạm buffer(data hình ảnh) vào RAM để làm trung giang để đưa lên cloud
//tự giải phóng RAM sau khi kết thúc API

//limits: 1 * 1024 * 1024 là limit 1MB
const uploadCloud = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
});

export default uploadCloud;
