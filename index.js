const express = require("express")
const app = express()
const { connection } = require("./db")
const http = require("http")
const cors = require("cors")
const { Server } = require("socket.io")
app.use(cors())
const server = http.createServer(app)
const { userRouter } = require("./routes/user.routes")
const { bugRouter } = require("./routes/bug.routes")
app.use(express.json())
const io = new Server(server, {
    // cors: {
    //     origin: "http://localhost:3000",
    // }
})
io.on("connection", (socket) => {
    console.log(`User Connected ${socket.id}`)
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id)
    })
})

app.use("/api", userRouter)
app.use("/api", bugRouter)

server.listen(8080, async () => {
    try {
        await connection
        console.log("connected to db")
        console.log("running in port 8080")
    }
    catch (err) {
        console.log(err)
    }
})