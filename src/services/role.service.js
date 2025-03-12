import { BadRequestException } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";

export const roleService = {
  create: async function (req) {
    return `This action create`;
  },

  findAll: async function (req) {
    let { page, pageSize, search } = req.query;
    //đổi string thành number và kiểm tra xem người dùng có gửi sai không?
    page = +page > 0 ? +page : 1;
    pageSize = +pageSize > 0 ? +pageSize : 10;
    search = search || ``;

    const whereSearch =
      search.trim() === `` ? {} : { name: { contains: search } };
    const where = { ...whereSearch };

    //LIMIT 5 OFFSET 5
    const skip = (page - 1) * pageSize;
    const totalItem = await prisma.roles.count({ where });
    const totalPage = Math.ceil(totalItem / pageSize); // làm tròn lên để có page cuối cùng
    const roles = await prisma.roles.findMany({
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
      items: roles || [], // trả về array để đỡ FE không map được :))))
    };
  },

  findOne: async function (req) {
    const { id } = req.params;
    //dữ liệu được truyền qua params luôn là chuỗi
    const role = await prisma.roles.findUnique({
      where: {
        role_id: +id,
      },
    });
    return role;
  },

  update: async function (req) {
    return `This action updates a id: ${req.params.id} role`;
  },

  remove: async function (req) {
    return `This action removes a id: ${req.params.id} role`;
  },

  togglePermission: async (req) => {
    const { role_id, permission_id } = req.body;

    // console.log({ role_id, permission_id });
    let rolePermissionsExists = await prisma.role_permissions.findFirst({
      where: {
        role_id,
        permission_id,
      },
    });

    // console.log(rolePermissionsExists);
    if (rolePermissionsExists) {
      rolePermissionsExists = await prisma.role_permissions.update({
        where: {
          role_permissions_id: rolePermissionsExists.role_permissions_id,
        },
        data: {
          is_active: !rolePermissionsExists.is_active,
        },
      });
    } else {
      rolePermissionsExists = await prisma.role_permissions.create({
        data: {
          role_id,
          permission_id,
          is_active: true,
        },
      });
    }

    return rolePermissionsExists;
  },
};
