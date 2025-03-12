import { PrismaClient } from "@prisma/client";
import prisma from "../common/prisma/init.prisma.js";
import { BadRequestException } from "../common/helpers/error.helper.js";

const videoService = {
  videoList: async (req) => {
    let { page, pageSize, type_id, search } = req.query;
    //đổi string thành number và kiểm tra xem người dùng có gửi sai không?
    page = +page > 0 ? +page : 1;
    pageSize = +pageSize > 0 ? +pageSize : 10;
    type_id = +type_id > 0 ? +type_id : 0;
    search = search || ``;

    //Đây là cách của sequelize
    // const videos = await models.videos.findAll({ raw: true });

    //Đây là cách của prisma

    const whereTypeId = type_id === 0 ? {} : { type_id };
    const whereSearch =
      search.trim() === `` ? {} : { video_name: { contains: search } };
    const where = { ...whereTypeId, ...whereSearch };

    //LIMIT 5 OFFSET 5
    const skip = (page - 1) * pageSize;
    const totalItem = await prisma.videos.count({ where });
    const totalPage = Math.ceil(totalItem / pageSize); // làm tròn lên để có page cuối cùng
    const videos = await prisma.videos.findMany({
      take: pageSize,
      skip,
      orderBy: {
        created_at: `desc`, // đưa video mới nhất lên đầu (sắp xếp giảm dần)
      },
      where,
    });
    return {
      page, // trang hiện tại
      pageSize, // kích thước item trong 1 page: 10 video trong một page
      totalPage, // tổng cộng bao nhiêu trang
      totalItem, // tổng cộng bao nhiêu video
      items: videos || [], // trả về array để đỡ FE không map được :))))
    };
  },
  videoDetail: async (req) => {
    const { id } = req.params;

    if (!id) throw new BadRequestException("Vui lòng cung cấp id của video");

    if (isNaN(+id)) throw new BadRequestException("vui lòng cung cấp id là số");

    const videoExits = await prisma.videos.findUnique({
      where: {
        video_id: +id,
      },
    });

    if (!videoExits)
      throw new BadRequestException(`Không tồn tại video với id: ${id} `);

    return videoExits;
  },
};

export default videoService;
