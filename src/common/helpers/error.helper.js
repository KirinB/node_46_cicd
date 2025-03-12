import multer from "multer";
import { responseError } from "./response.helper.js";
import jwt from "jsonwebtoken";

export const handleError = (error, req, res, next) => {
  //401 là logout
  if (error instanceof jwt.JsonWebTokenError) {
    error.code = 401;
  }
  //403 là refreshToken
  //2 mã này sẽ do FE và BE tự quy định với nhau
  if (error instanceof jwt.TokenExpiredError) {
    error.code = 403;
    error.message = "Token hết hạn";
  }
  if (error instanceof multer.MulterError) {
    // A Multer error occurred when uploading.
    error.code = 400;
  }
  const resError = responseError(error.message, error.code, error.stack);
  res.status(resError.code).json(resError);
  next();
};

export class BadRequestException extends Error {
  constructor(message = "Bad Request Exception") {
    super(message);
    this.code = 400;
  }
}

export class ForbiddenException extends Error {
  constructor(message = "Forbidden Exception") {
    super(message);
    this.code = 403;
  }
}

export class UnauthorizationException extends Error {
  constructor(message = "Unauthorization Exception") {
    super(message);
    this.code = 401;
  }
}
