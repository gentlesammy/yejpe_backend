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
    res.send("<h1>HELLO WORLD</h1>");
})
server.listen(PORT, () => {
  console.log(`connecting on port ${PORT}`);
});