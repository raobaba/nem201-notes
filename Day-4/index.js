const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserModel = require("./models/user.model.js");
const app = express()
const blacklist = [];
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req,res,next)=>{
    const token = req.headers.authorization;
    if(!token){
        return res.send("give token")
    }
    try {
        const varification = jwt.varify(token,"SECRET1234");
        if(varification.exp> new Date().getTime() ){
           return res.send("token is expired");
        }
        if(blacklist.includes(token)){
            return res.send("token is already used");
        }
        next();
    } catch (error) {
        next();
    }
})

app.post("/signup", async (req, res) => {
    const { name, email, password, age } = req.body;
    // const token = req.headers["authorization"];

    // try {
    //     const decoded = jwt.decode(token);
    //     if(decoded){
    //         if(decoded.role ==="admin"){
    //             const user = new UserModel({
    //                 name,
    //                 email,
    //                 password,
    //                 age,
    //                 role:"instructor",
    //             });
    //             await user.save();
    //             return res.send("Instructor created successfully");
    //         }else{
    //             return res.status(403).send("You are not allowed to create Instructor");
    //         }
    //     }
    // } catch (error) {
    //     console.log("Non Admin tried to create an instructor account");
    // }
    const user = new UserModel({ name, email, password, age });
    await user.save();
    return res.status(201).send("User Created Successfully");
})

app.post("/createdlecture", (req,res)=>{
    const token = req.headers.authorization;
    try{
        const {role} = jwt.decode(token);
        if(role!=="instructor"){
            return res.status(403).send("You are not allowed to create lecture");
        }else{
            return res.send("Lecture created successfully");
        }
    } catch(error){
        console.log("error",error);
    }
})

app.post("/signup/instructor", async (req,res)=>{
    const [name,email,password,age] = req.body;
    const user = new UserModel({
        name,
        email,
        password,
        age,
        role:"instructor"
    });
    await user.save();
    return res.status(201).send("Instructor created successfully");
} )

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email, password });
    if (user) {
        const token = jwt.sign({ id: user._id, name: user.name, age: user.age }, "SECRET1234",{expiresIn:"7 days"});
        const refreshToken = jwt.sign({}, "REFRESHSECRET", { expiresIn: "7 days" })
        return res.send({ message: "Login Successfull", token , refreshToken })
    }
    return res.status(401).send("Invalid credentials");
})

app.get("/user/:id", async (req, res) => {
    const { id } = req.params;
    const token = req.headers["authorization"];
    if (!token) {
        return res.send("Unauthorized");
    }
    if(blacklist.includes(token)){
        return res.send("Token is already expired");
    }
    try {
        const verification = jwt.varify(token, "SECRET1234");
        if (verification) {
            const user = await UserModel.findOne({ _id: id });
            return res.send(user);
        }
    } catch (error) {
        console.log(error.message);
          if(e.message==="jwt expired"){
            blacklist.push(token);
          }
        return res.send(error.message);
    }
})

app.post("/refresh", async (req, res) => {
    const refreshToken = req.headers["authorization"];
    if (!refreshToken) {
        return res.status(401).send("unauthorized");
    }
    try {
        const verification = jwt.varify(refreshToken, "REFRESHSECRET");
        if (verification) {
            const user = await UserModel.findOne({ id: varification.id });
            const newToken = jwt.sign({ id: user._id, name: user.name, age: user.age }, "SECRET1234", { expiresIn: "5 min" })
            return res.send({ token: newToken });
        }
    } catch (error) {
        return res.send("refresh token expired, login again");
    }
})

app.post("/logout",(req,res)=>{
    const token = req.headers.authorization;
    blacklist.push(token);
    return res.send("Logout successfully");
})

app.get("/", (req, res) => res.send("Hello"));

mongoose.connect("mongodb://0.0.0.0:27017/rajan").then(() => {
    app.listen(8080, () => {
        console.log("server started on port 8080");
    })
})
