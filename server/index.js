require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const router = require('./router/index')
const errorMiddleware = require('./middlewares/error-middleware');
const socket = require("socket.io");

const PORT = process.env.PORT || 5000;
const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: [process.env.CLIENT_URL, `http://127.0.0.1:3678`]
}));
app.use('/api', router);
app.use(errorMiddleware);



mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB Connetion Successfull");
    })
    .catch((err) => {
        console.log(err.message);
    });

const server = app.listen(process.env.PORT, () =>
    console.log(`Server started on ${process.env.PORT}`)
);


const io = socket(server, {
    cors: {
        origin: [process.env.CLIENT_URL, `http://127.0.0.1:3678`],
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
        console.log('ONLINE')
        console.log('userId',userId)
        console.log('socket.id',socket.id)

        onlineUsers.set(userId, socket.id);
        console.log(onlineUsers)
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
        console.log('data',data)
        console.log('onlineuser,',onlineUsers)


        const sendUserSocket = onlineUsers.get(data.to);
        console.log('find кому отправить ',sendUserSocket)


        if (sendUserSocket) {

            socket.to(sendUserSocket).emit("message-receive", {message:data.message,from:data.from,to:data.to});
        }

    });
    socket.on("get-online-users", () => {
        const onlineUserIds = Array.from(onlineUsers.keys());
        socket.emit("online-users-list", onlineUserIds);
    });


});
