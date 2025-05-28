const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const router = express.Router();
const newsPath = path.join(__dirname, "../data/news.json");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({storage});

router.get("/", (req, res) => {
    const newsData = JSON.parse(fs.readFileSync(newsPath, "utf-8"));
    res.json(newsData);
});

router.get("/:id", (req, res) => {
    const newsData = JSON.parse(fs.readFileSync(newsPath, "utf-8"));
    const newsItem = newsData.find(n => n.id === +req.params.id);
    if (newsItem) {
        res.json(newsItem);
    } else {
        res.status(404).json({error: "Новина не знайдена"});
    }
});

router.post("/", upload.single("image"), (req, res) => {
    const {title, content, category} = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    if (!title || !content) {
        return res.status(400).json({error: "Заголовок і опис обов'язкові"});
    }

    const newsData = JSON.parse(fs.readFileSync(newsPath, "utf-8"));

    const newNewsItem = {
        id: Date.now(),
        title,
        content,
        category,
        image: imageUrl,
        date: new Date().toISOString().split("T")[0]
    };

    newsData.push(newNewsItem);
    fs.writeFileSync(newsPath, JSON.stringify(newsData, null, 2));

    res.json({message: "Новину додано", news: newNewsItem});
});

router.delete("/:id", (req, res) => {
    const newsData = JSON.parse(fs.readFileSync(newsPath, "utf-8"));
    const idToDelete = Number(req.params.id);
    const filteredNews = newsData.filter(n => n.id !== idToDelete);

    if (filteredNews.length === newsData.length) {
        return res.status(404).json({error: "Новина не знайдена"});
    }

    fs.writeFileSync(newsPath, JSON.stringify(filteredNews, null, 2));
    res.json({message: "Новина видалена"});
});

router.put("/:id", upload.single("image"), (req, res) => {
    const newsData = JSON.parse(fs.readFileSync(newsPath, "utf-8"));
    const newsId = Number(req.params.id);

    const index = newsData.findIndex(n => n.id === newsId);
    if (index === -1) return res.status(404).json({error: "Новина не знайдена"});

    const {title, content, category, oldImage} = req.body;
    const newImagePath = req.file ? `/uploads/${req.file.filename}` : oldImage || newsData[index].image;

    newsData[index] = {
        ...newsData[index],
        title,
        content,
        category,
        image: newImagePath,
    };

    fs.writeFileSync(newsPath, JSON.stringify(newsData, null, 2));
    res.json({message: "Новина оновлена"});
});
module.exports = router;