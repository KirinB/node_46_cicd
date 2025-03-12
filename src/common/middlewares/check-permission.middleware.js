import { BadRequestException } from "../helpers/error.helper.js";
import prisma from "../prisma/init.prisma.js";

export const checkPermission = async (req, res, next) => {
  try {
    const user = req.user;
    const role_id = user.role_id;
    // console.log({ req: req });

    const baseUrl = req.baseUrl;
    const routePath = req.route.path;
    const fullPath = `${baseUrl}${routePath}`;
    const method = req.method;

    // console.log({ role_id, fullPath, method });

    //Nếu là ADMIN (role_id === 1) thì cho qua
    //bắt buộc phải có return không code sẽ chạy tiếp tục
    if (role_id === 1) return next();

    const permissionExists = await prisma.permissions.findFirst({
      where: {
        method,
        endpoint: fullPath,
      },
    });

    const role_permissions = await prisma.role_permissions.findFirst({
      where: {
        permission_id: permissionExists.permission_id,
        role_id,
        is_active: true,
      },
    });

    if (!role_permissions) {
      throw new BadRequestException(
        "Bạn không đủ quyền sử dụng tài nguyên API này"
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};
