import {
  ACCESS_TOKEN_EXPIRED,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRED,
  REFRESH_TOKEN_SECRET,
} from "../common/constant/app.constant.js";
import {
  BadRequestException,
  UnauthorizationException,
} from "../common/helpers/error.helper.js";
import sendMail from "../common/nodemailer/send-mail.nodemailer.js";
import prisma from "../common/prisma/init.prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authService = {
  register: async (req) => {
    // bước 1 : nhận dữ liệu full_name, email, password
    const { full_name, email, pass_word } = req.body;
    // console.log({ full_name, email, pass_word });
    // bước 2 : lấy email và kiểm tra trong db xem có người dùng đó hay chưa
    const isUserExits = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    // console.log({ isUserExits });
    if (isUserExits) {
      throw new BadRequestException("Tài khoản đã tồn tại");
    }
    //mã hóa password
    const passHash = bcrypt.hashSync(pass_word, 10);

    // bước 3 : tạo người dùng mới
    const userNew = await prisma.users.create({
      data: {
        full_name,
        email,
        pass_word: passHash,
      },
    });

    //gửi email chào mừng
    //1 - tốc độ: đăng ký nhanh và không caanf đợi quá trình xử lý email => bỏ await
    //2 - chắc chắn: đăng ký chậm và cần phải đợi email gửi thành công => await
    //do đang test nên dùng mail mình đúng thì dùng email được đăng ký
    sendMail(`lee.minhnhan29@gmail.com`).catch((err) => {
      console.log(err);
    });

    // xóa password khi trả về
    // delete userNew.pass_word
    // bước 4 : trả kết quả thành công
    delete userNew.pass_word;

    // userNew.pass_word = `1234`;

    return userNew;
  },

  login: async (req) => {
    const { email, pass_word } = req.body;
    console.log({ email, pass_word });
    const isUserExits = await prisma.users.findFirst({
      where: {
        email,
      },
    });
    if (!isUserExits) {
      throw new BadRequestException("Tài khoản chưa tồn tại");
    }

    if (!isUserExits.pass_word) {
      if (isUserExits.face_app_id) {
        throw new BadRequestException(
          "Vui lòng đăng nhập bằng facebook,để tạo mật khẩu mới"
        );
      }
      if (isUserExits.goole_id) {
        throw new BadRequestException(
          "Vui lòng đăng nhập bằng google,để tạo mật khẩu mới"
        );
      }
      throw new BadRequestException(
        "Không hợp lệ, vui lòng liên hệ chăm sóc khách hàng"
      );
    }

    //so sánh password (không phải dịch ngược)
    const isSuccess = bcrypt.compareSync(pass_word, isUserExits.pass_word);

    if (!isSuccess) throw new BadRequestException("Mật khẩu không chính xác");

    const tokens = authService.createTokens(isUserExits.user_id);

    return tokens;
  },

  facebookLogin: async (req) => {
    const { name, email, picture, id } = req.body;
    const avatar = picture.data.url;
    // console.log({ name, email, avatar, id });
    //Kiểm tra user tồn tại trong hệ thống hay chưa
    let isUserExits = await prisma.users.findFirst({
      where: {
        email,
      },
    });
    //Nếu chauw có sẽ tạo một user trong database
    if (!isUserExits) {
      isUserExits = await prisma.users.create({
        data: {
          email,
          full_name: name,
          // avatar,
          face_app_id: id,
        },
      });
    }
    // console.log(isUserExits);
    const tokens = authService.createTokens(isUserExits.user_id);

    return tokens;
  },

  //function
  createTokens: (userId) => {
    if (!userId) throw new BadRequestException("Không có userId để tạo token");
    const accessToken = jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRED,
    });
    const refreshToken = jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRED,
    });
    return {
      accessToken,
      refreshToken,
    };
  },
  refreshToken: async (req) => {
    const refreshToken = req.headers.authorization?.split(" ")[1];

    if (!refreshToken) {
      throw new UnauthorizationException(
        "Vui lòng cung cấp token để tiếp tục sử dụng"
      );
    }

    const accessToken = req.headers[`x-access-token`];

    if (!accessToken) {
      throw new UnauthorizationException(
        "Vui lòng cung cấp token để tiếp tục sử dụng"
      );
    }

    const decodeRefreshToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    const decodeAccessToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET, {
      ignoreExpiration: true,
    });

    // console.log({ decodeRefreshToken, decodeAccessToken });

    if (decodeRefreshToken.userId !== decodeAccessToken.userId) {
      throw new UnauthorizationException("Cặp token không hợp lệ");
    }

    const userExits = await prisma.users.findUnique({
      where: {
        user_id: decodeAccessToken.userId,
      },
    });

    if (!userExits) throw new UnauthorizationException("User không tồn tại");

    const tokens = authService.createTokens(userExits.user_id);

    return tokens;
  },
  getInfo: async (req) => {
    delete req.user.pass_word;
    return req.user;
  },
};

export default authService;
