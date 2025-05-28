const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const usersPath = path.join(__dirname, "../data/users.json");

router.post("/update", (req, res) => {
  const { oldUsername, newUsername, newPassword } = req.body;

  const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
  const userIndex = users.findIndex(u => u.username === oldUsername);

  if (userIndex === -1) {
    return res.status(404).json({ error: "Користувача не знайдено" });
  }

  if (oldUsername !== newUsername && users.find(u => u.username === newUsername)) {
    return res.status(400).json({ error: "Ім’я вже зайняте" });
  }

  users[userIndex].username = newUsername;
  if (newPassword) users[userIndex].password = newPassword;

  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

  res.json({ success: true });
});

router.post("/change-password", (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  if (!username || !oldPassword || !newPassword) {
    return res.status(400).json({ error: "Усі поля обов'язкові" });
  }

  const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(404).json({ error: "Користувача не знайдено" });
  }

  if (user.password !== oldPassword) {
    return res.status(403).json({ error: "Старий пароль неправильний" });
  }

  user.password = newPassword;
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  res.json({ message: "Пароль успішно змінено" });
});

module.exports = router;
