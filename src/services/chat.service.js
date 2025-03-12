import prisma from "../common/prisma/init.prisma.js";

export const chatService = {
  create: async function (req) {
    return `This action create`;
  },

  findAll: async function (req) {
    return `This action returns all chat`;
  },

  findOne: async function (req) {
    return `This action returns a id: ${req.params.id} chat`;
  },

  update: async function (req) {
    return `This action updates a id: ${req.params.id} chat`;
  },

  remove: async function (req) {
    return `This action removes a id: ${req.params.id} chat`;
  },

  listUserChat: async function (req) {
    let { page, pageSize, notMe, search } = req.query;
    console.log({ search });
    page = +page > 0 ? +page : 1;
    pageSize = +pageSize > 0 ? +pageSize : 10;
    search = search || ``;
    // notMe trên queryString nên dù là true vẫn là string
    notMe = notMe === "true" ? true : false;

    const whereNotMe =
      notMe === true ? { user_id: { not: req.user.user_id } } : {};
    const whereSearch =
      search.trim() === `` ? {} : { full_name: { contains: search } };
    const where = { ...whereNotMe, ...whereSearch };

    //LIMIT 5 OFFSET 5
    const skip = (page - 1) * pageSize;
    const totalItem = await prisma.users.count({ where: where });
    const totalPage = Math.ceil(totalItem / pageSize);
    const users = await prisma.users.findMany({
      take: pageSize,
      skip,
      orderBy: {
        created_at: `desc`,
      },
      where,
    });
    return {
      page,
      pageSize,
      totalPage,
      totalItem,
      items: users || [],
    };
  },
};
