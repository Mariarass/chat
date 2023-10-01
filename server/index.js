require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const router = require('./router/index')
const errorMiddleware = require('./middlewares/error-middleware');
const socket = require("socket.io");


const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: [process.env.CLIENT_URL_LOCAL,process.env.CLIENT_URL_REMOTE,process.env.CLIENT_URL]
}));
app.use('/api', router);
app.use(errorMiddleware);

mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB Connection Success");
    })
    .catch((err) => {
        console.log(err.message);
    });

const server = app.listen(process.env.PORT, () =>
    console.log(`Server started on ${process.env.PORT}`)
);


const io = socket(server, {
    cors: {
        origin: [process.env.CLIENT_URL_LOCAL,process.env.CLIENT_URL_REMOTE,process.env.CLIENT_URL],
        credentials: true,
    },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {

    global.chatSocket = socket;
    function sendOnlineUsersList() {
        const onlineUserIds = Array.from(onlineUsers.keys());
        io.emit("online-users-list", onlineUserIds);
    }
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
        sendOnlineUsersList()

    });
    socket.on("disconnect", () => {
        const userId = Array.from(onlineUsers.entries())
            .find(([key, value]) => value === socket.id)?.[0];
        if (userId) {
            onlineUsers.delete(userId);
            sendOnlineUsersList();
        }
    });

    socket.on("send-message", (data) => {

        if (data.isGeneralChat) {
            // Отправляем сообщение всем пользователям онлайн
            onlineUsers.forEach((socketId) => {
                socket.to(socketId).emit("message-receive", {
                    message: data.message,
                    from: data.from,
                    to: null
                });
            });
        } else {
            // Если чат не групповой, то отправляем только указанному пользователю
            const sendUserSocket = onlineUsers.get(data.to);

            if (sendUserSocket) {
                socket.to(sendUserSocket).emit("message-receive", {
                    message: data.message,
                    from: data.from,
                    to: data.to
                });
            }
        }

    });
    socket.on("get-online-users", () => {
        const onlineUserIds = Array.from(onlineUsers.keys());
        socket.emit("online-users-list", onlineUserIds);
    });


});
