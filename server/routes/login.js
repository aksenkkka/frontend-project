const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const usersPath = path.join(__dirname, "../data/users.json");

router.post("/", (req, res) => {
    const {username, password} = req.body;
    const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (user) {
        res.json({
            message: `Привіт, ${username}! Ви увійшли.`,
            user: {
                username: user.username,
                role: user.role || "user",
                registrationDate: user.registrationDate || "",
            }
        });
    } else {
        res.status(401).json({error: "Невірний логін або пароль."});
    }
});

module.exports = router;