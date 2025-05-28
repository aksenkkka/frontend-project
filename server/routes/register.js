const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const usersPath = path.join(__dirname, '../data/users.json');

router.post('/', (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({error: 'Усі поля обов’язкові'});
    }

    const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
    if (users.find(user => user.username === username)) {
        return res.status(400).json({error: 'Користувач уже існує'});
    }
    if (res.ok) {
        setUsername("");
        setPassword("");
        setMsg(data.message || "Реєстрація пройшла успішно");

        if (data.user?.registrationDate) {
            localStorage.setItem("registrationDate", data.user.registrationDate);
        }
    }
    const newUser = {
        username,
        password,
        registrationDate: new Date().toISOString().split('T')[0]
    };

    users.push(newUser);
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

    res.json({message: 'Реєстрація успішна', user: newUser});
});

module.exports = router;