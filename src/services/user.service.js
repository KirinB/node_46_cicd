import { BadRequestException } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

export const userService = {
  create: async function (req) {
    return `This action create`;
  },

  findAll: async function (req) {
    return `This action returns all user`;
  },

  findOne: async function (req) {
    return `This action returns a id: ${req.params.id} user`;
  },

  update: async function (req) {
    return `This action updates a id: ${req.params.id} user`;
  },

  remove: async function (req) {
    return `This action removes a id: ${req.params.id} user`;
  },

  uploadLocal: async (req) => {
    const { file } = req;
    console.log({ file });
    if (!file) {
      throw new BadRequestException(
        "Vui lòng gửi hình ảnh lên thông qua key file (from-data)"
      );
    }
    // lấy từ middleware protect
    const userId = req.user.user_id;

    await prisma.users.update({
      where: {
        user_id: Number(userId),
      },
      data: {
        avatar: file.filename,
      },
    });

    return {
      folder: "images/",
      filename: file.filename,
      imgUrl: path.join("images", file.filename).replace(/\\/g, "/"),
    };
  },

  uploadCloud: async (req) => {
    const { file } = req;
    console.log({ file });
    if (!file) {
      throw new BadRequestException(
        "Vui lòng gửi hình ảnh lên thông qua key file (from-data)"
      );
    }

    // Configuration
    cloudinary.config({
      cloud_name: "dfq7olhxn",
      api_key: "631775512535778",
      api_secret: "z6UU5rg0p5870eEr9m6m9_S-kIQ", // Click 'View API Keys' above to copy your API secret
    });

    const uploadResult = await new Promise((resolve) => {
      //xóa v2 vì đã import v2 trên kia as sang cloudinary rồi
      cloudinary.uploader
        .upload_stream(
          {
            folder: "images",
          },
          (error, uploadResult) => {
            return resolve(uploadResult);
          }
        )
        .end(file.buffer);
    });

    // console.log(uploadResult);

    const userId = req.user.user_id;

    await prisma.users.update({
      where: {
        user_id: Number(userId),
      },
      data: {
        avatar: uploadResult.secure_url,
      },
    });

    return {
      folder: "images/",
      filename: file.filename,
      imgUrl: uploadResult.secure_url,
    };
  },
};
