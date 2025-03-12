import prisma from "../prisma/init.prisma.js";

const handleChatSocket = (io, socket) => {
  socket.on("join-room", (data) => {
    console.log(data);

    const { user_id_sender, user_id_recipient } = data;

    const roomId = [user_id_recipient, user_id_sender]
      .sort((a, b) => {
        return a - b;
      })
      .join("_");

    console.log({ roomId });

    //đảm bảo thoát hết room trước khi join room
    socket.rooms.forEach((roomId) => {
      socket.leave(roomId);
    });

    socket.join(roomId);

    //tạo roomID: sắp xếp 2 id lại với nhau
  });

  socket.on("send-message", async (data) => {
    console.log(data);
    const { message, user_id_sender, user_id_recipient } = data;
    const roomId = [user_id_recipient, user_id_sender]
      .sort((a, b) => {
        return a - b;
      })
      .join("_");
    io.to(roomId).emit("receive-message", data);
    await prisma.chats.create({
      data: {
        message,
        user_id_sender,
        user_id_recipient,
      },
    });
  });

  // Nên lấy danh sách message khởi tạo ban đầu bằng API
  // không nên dùng bằng socket như phía dưới
  //Vì khó xử lý phân trang để kéo lên tìm lại tin nhắn cũ
  socket.on("get-list-message", async (data) => {
    console.log(data);
    const { user_id_sender, user_id_recipient } = data;

    const chats = await prisma.chats.findMany({
      where: {
        OR: [
          //lấy tin nhắn của mình
          {
            user_id_recipient: user_id_recipient,
            user_id_sender: user_id_sender,
          },

          //lấy tin nhắn của đối phương
          {
            user_id_recipient: user_id_sender,
            user_id_sender: user_id_recipient,
          },
        ],
      },
    });

    socket.emit("get-list-message", chats);
  });
};

export default handleChatSocket;
