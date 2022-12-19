const express = require('express')
const http = require("http");
const {Server} = require("socket.io");
const app = express()

const httpServer = http.createServer(app)
const io = new Server(httpServer);
let totalUsers = 0;
io.on("connection",(conn)=>{
    totalUsers += 1;
    console.log("A New User Connected",totalUsers);
    conn.on("disconnect",()=>{
        console.log("A User Disconnected")
    })
})
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/',(req,res)=> res.sendFile(__dirname+ "/index.html") )

httpServer.listen(8080,()=>{console.log('server is running on port 8080')})