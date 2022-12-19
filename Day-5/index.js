const express = require("express");
const app = express();
const CLIENT_ID = "4fa23e5c48344e56f6d1";
const CLIENT_SECRET = "891b7cbf9fc312bf7f8264508631aaec1b39b552";
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/github/callback", async (req, res) => {
    const { code } = req.query;
    const {access_token} = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type":"application/json"
        },
        body: JSON.stringify({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code,
        }),
    }).then((e) => e.json()).catch(console.error)
    console.log("Access",access_token);

    const userDetails = await fetch("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }).then((x) => x.json()).catch(console.error);
    console.log(userDetails)
    return res.send("SignIn With github success");
})

app.listen(8080, () => {
    console.log("server started on port 8080");
})
