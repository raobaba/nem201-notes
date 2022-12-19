const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserModel = require("./models/user.model.js");
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/signup", async (req, res) => {
    const { name, email, password, age } = req.body;
    const user = new UserModel({ name, email, password, age });
    await user.save();
    return res.status(201).send("User Created Successfully");
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email, password });
    if (user) {
        const token = jwt.sign({ id: user._id, name: user.name, age: user.age }, "SECRET1234");
        return res.send({ message: "Login Successfull", token })
    }
    return res.status(401).send("Invalid credentials");
})

app.get("/user/:id", async (req, res) => {
    const { id } = req.params;
    const token = req.headers["authorization"];
    if (!token) {
        return res.send("Unauthorized");
    }
    try {
        const verification = jwt.varify(token, "SECRET1234");
        if (verification) {
            const user = await UserModel.findOne({ _id: id });
            return res.send(user);
        }
    } catch (error) {
        console.log(error.message);

        return res.send(error.message);
    }
})

app.get("/", (req, res) => res.send("Hello"));

mongoose.connect("mongodb://0.0.0.0:27017/masaischool").then(() => {
    app.listen(8080, () => {
        console.log("server started on port 8080");
    })
})
