import video from "./video.swagger.js";

const swaggerDocument = {
  openapi: "3.1.0",
  info: {
    title: "Api Cyber Media",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3069",
      description: "Server tại local",
    },
  ],
  components: {
    securitySchemes: {
      kirinToken: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths: {
    ...video,
  },
};

export default swaggerDocument;
