import { responseSuccess } from "../common/helpers/response.helper.js";
import authService from "../services/auth.service.js";

const authController = {
  register: async (req, res, next) => {
    try {
      const userNew = await authService.register(req);
      const resData = responseSuccess(userNew, "Register successfully");
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const data = await authService.login(req);
      const resData = responseSuccess(data, "Login successfully");
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  facebookLogin: async (req, res, next) => {
    try {
      const data = await authService.facebookLogin(req);
      const resData = responseSuccess(data, "Facebook Login successfully");
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      const data = await authService.refreshToken(req);
      const resData = responseSuccess(data, "Refresh Token successfully");
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  getInfo: async (req, res, next) => {
    try {
      const data = await authService.getInfo(req);
      const resData = responseSuccess(data, "Get Info successfully");
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
