const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;
const registerRoute = require('./routes/register');
const loginRoute = require("./routes/login");
const commentsRoute = require("./routes/comments");
const newsRoute = require("./routes/news");
const profileRoutes = require("./routes/profile");
const path = require("path");


app.use(cors());
app.use(express.json());
app.use('/register', registerRoute);
app.use("/login", loginRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/news", newsRoute);
app.use("/api/profile", profileRoutes);

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));


app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});