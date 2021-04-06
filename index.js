const app = require("express")(); 
const server = require("http").createServer(app)
const cors = require("cors");
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"], 
    },
})
app.use(cors()); 
const PORT = process.env.PORT || 8000;
app.get("/", (req, res)=> {
    res.send("<h1>Yejide Pe video caller App</h1>");
})

io.on("connection",   (socket)=> {
    //initial when connected
    socket.emit("me", socket.id);
    //call ended
    socket.on("disconnect", () => {
        socket.broadcast.emit("callended");
    })
    //user is called, data will be passed from frontend
    socket.on("calluser", ({userToCall, signalData, from, name})=> {
        io.to(userToCall).emit("calluser", {signal:signalData, from, name})
    })

    //call is answered
    socket.on("answercall", (data) => {
        io.to(data.to).emit("callaccepted", data.signal);
    })

})

server.listen(PORT, () => {
  console.log(`connecting on port ${PORT}`);
});