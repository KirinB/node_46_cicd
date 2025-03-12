export const responseSuccess = (
  metaData = null,
  message = "OK",
  code = 200
) => {
  if (typeof code !== "number") code = 200;
  return {
    status: "success",
    code,
    message,
    metaData,
    doc: "http://localhost:3069/api-docs/",
  };
};

export const responseError = (
  message = "Internal Server Error",
  code = 500,
  stack = null
) => {
  if (typeof code !== "number") code = 500;
  return {
    status: "error",
    code,
    message,
    stack,
    doc: "http://localhost:3069/api-docs/",
  };
};
