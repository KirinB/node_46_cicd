import { BadRequestException } from "../common/helpers/error.helper.js";
import Cars from "../models/Cars.model.js";

const carService = {
  carList: async (req) => {
    // ví dụ về lỗi có thể kiểm soát được
    // 400 , 403, 401
    // const passNguoiDungGuiLen = 123;
    // const passLayTrongDb = 1234;
    // if (passLayTrongDb !== passNguoiDungGuiLen) {
    //   throw new BadRequestException("Mật khẩu không chính xac");
    // }
    const { page } = req.query;
    console.log(+page);
    const cars = await Cars.findAll({ raw: true });
    return cars;
  },
};

export default carService;
