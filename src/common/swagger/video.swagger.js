const video = {
  "/video/video-list": {
    get: {
      tags: ["Videos"],
      security: [
        {
          kirinToken: [],
        },
      ],
      parameters: [
        {
          name: "page",
          in: "query",
          description: "nếu không truyền mặc định là 1",
        },
        {
          name: "pageSize",
          in: "query",
          description: "nếu không truyền mặc định là 10",
        },
      ],
      responses: {
        200: {
          description: "oke",
        },
      },
    },
  },
  "/video/video-detail/{id}": {
    get: {
      tags: ["Videos"],
      security: [
        {
          kirinToken: [],
        },
      ],
      responses: {
        200: {
          description: "oke",
        },
      },
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Id của video",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
    },
  },
  "/video/video-create": {
    post: {
      tags: ["Videos"],
      security: [
        {
          kirinToken: [],
        },
      ],
      responses: {
        200: {
          description: "oke",
        },
      },
      requestBody: {
        description: "Dữ liệu để tạo 1 video",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                video_name: {
                  type: "string",
                },
                description: {
                  type: "string",
                },
                view: {
                  type: "number",
                },
              },
            },
          },
        },
        schema: {
          type: "data",
        },
      },
    },
  },
  "/video/video-update": {
    post: {
      tags: ["Videos"],
      security: [
        {
          kirinToken: [],
        },
      ],
      responses: {
        200: {
          description: "oke",
        },
      },
      requestBody: {
        description: "Dữ liệu để tạo 1 video",
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                file: {
                  type: "string",
                  format: "binary", // mặc định chuyển sang binary
                },
                // files: {
                //   type: "array",
                //   items: {
                //     type: "string",
                //     format: "binary",
                //   },
                // }, đây là cách để gửi multi file
              },
            },
          },
        },
      },
    },
  },
};

export default video;
