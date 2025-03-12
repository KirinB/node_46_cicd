import cors from "cors";
import express from "express";
import { createServer } from "http";
import { handleError } from "./src/common/helpers/error.helper.js";
import initSocket from "./src/common/socket/init.socket.js";
import rootRouter from "./src/routes/root.router.js";

const app = express();
const PORT = 3069;

//Middleware giúp phân giải dữ liệu từ JSON sang đối tượng Javascript
app.use(express.json());
//Middleware CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "google.com"],
  })
);

app.use(express.static("."));

app.use(rootRouter);

app.use(handleError);

const httpServer = createServer(app);

initSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

/*
  Prisa
    - npm i prisma
    - npm i @prisma/client

    -npx prisma init : khởi tạo prisma
      - tạo ra .env
      - tạo ra prisma / schema.prisma
    (khởi tạo client để cập nhật db chạy 2 câu lệnh trên terminal)
    -npx prisma db pull
    -npx prisma generate
*/

// app.use(
//   (req, res, next) => {
//     console.log("middleware 1");
//     const payload = "payload";
//     req.payload = payload;
//     next(123);
//   },
//   (req, res, next) => {
//     console.log("middleware 2");
//     console.log(req.payload);
//     next();
//   },
//   (req, res, next) => {
//     console.log(`middleware 3`);
//     next();
//   }
// );

// app.get(`/`, (request, response, next) => {
//   console.log(123);
//   response.json({
//     id: "1",
//     name: "Minh Nhan",
//   });
// });

// Query Parameters
//thường dùng khi muốn phân trang, search ,filter (thường sẽ là lấy dữ liệu)

// app.get(`/query`, (req, res, next) => {
//   console.log(req.query);
//   const { email, password } = req.query;
//   console.log(email, password);

//   res.json(`Query Parameters`);
// });

// Path Parameters
// thường dùng khi muốn lấy chi tiết của 1 user,product,...
// app.get(`/path/:id`, (req, res, next) => {
//   console.log(req.params);
//   res.json(`Path Parameters`);
// });

//Headers

// app.get(`/headers`, (req, res, next) => {
//   console.log(req.headers);
//   res.json(`Headers Parameters`);
// });

//Body
//để nhận được dữ liệu từ body bắt buộc phải có
//app.use(express.json())
// hoặc phải sử dụng thư viện parser https://www.npmjs.com/package/parser

// app.post(`/body`, (req, res, next) => {
//   console.log(req.body);
//   res.json(`Body Parameters`);
// });

// const sequelize = new Sequelize(
//   "mysql://root:1234@localhost:3307/db_cyber_media"
// );

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Kết nối với db thành công");
//   })
//   .catch(() => {
//     console.log("Kết nối với db KHÔNG thành công");
//   });

/*
Code first
Đi từ code tạo ra db
*/
//Tạo ra model từ define
//
// const Cars = sequelize.define(
//   "Cars",
//   {
//     car_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//     },
//     description: {
//       type: DataTypes.TEXT,
//     },
//     passengers: {
//       type: DataTypes.INTEGER,
//     },
//     max_speed: {
//       type: DataTypes.STRING,
//     },
//     gearbox_type: {
//       type: DataTypes.STRING,
//     },
//     fuel_type: {
//       type: DataTypes.STRING,
//     },
//     price_per_day: {
//       type: DataTypes.DOUBLE,
//     },
//     discount_percentage: {
//       type: DataTypes.INTEGER,
//       defaultValue: 0,
//     },
//     image_url: {
//       type: DataTypes.STRING,
//     },
//     created_at: {
//       type: DataTypes.DATE,
//     },
//     updated_at: {
//       type: DataTypes.DATE,
//     },
//   },
//   {
//     tableName: `cars`,
//     timestamps: false,
//   }
// );

// Cars.sync()
//   .then(() => {
//     console.log("Đồng bộ table cars thành công");
//   })
//   .catch(() => {
//     console.log("Đồng bộ table cars KHÔNG thành công");
//   });

// app.get("/cars", async (req, res, next) => {
//   // const cars = await sequelize.query(`SELECT * FROM cars`);
//   // console.log({ cars });
//   // console.log(`cars - 1`, cars[0]);
//   // res.json(cars[0]);
//   const cars = await Cars.findAll({ raw: true });
//   // console.log({ cars });
//   res.json(cars);
// });
/* 
Database first 
Đi từ câu lệnh SQL để tạo ra table
-- tạo table bằng câu lệnh SQL 
-- cài đặt sequelize-auto
-- -h: host -d:database -u userid -x pass -p port -- -o path - a -- bỏ timestamp mặc định
-- npx sequelize-auto -h localhost -d db_cyber_media -u root -x 1234 -p 3307  --dialect mysql -o src/models -a src/models/additional.json -l esm
*/
// const models = initModels(sequelize);

// app.get("/video-list", async (req, res, next) => {
//   const videos = await models.videos.findAll({ raw: true });
//   // console.log(videos)
//   res.json(videos);
// });

//// Mô hình MVC (Models, view, controller)
