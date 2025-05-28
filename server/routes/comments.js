const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const commentsPath = path.join(__dirname, "../data/comments.json");

router.get("/", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const newsId = req.query.newsId ? Number(req.query.newsId) : null;

    const comments = JSON.parse(fs.readFileSync(commentsPath, "utf-8"));

    let filteredComments = comments;
    if (newsId !== null) {
        filteredComments = comments.filter(c => String(c.newsId) === String(newsId));
    }

    filteredComments.sort((a, b) => b.id - a.id);

    const start = (page - 1) * perPage;
    const paginatedComments = filteredComments.slice(start, start + perPage);

    res.json({
        page,
        perPage,
        total: filteredComments.length,
        comments: paginatedComments,
    });
});

router.post("/", (req, res) => {
    const {newsId, author, text} = req.body;

    if (!author || !text) {
        return res.status(400).json({error: "Усі поля обов'язкові"});
    }
    const parsedNewsId = newsId !== undefined && newsId !== null ? Number(newsId) : null;
    const trimmedAuthor = typeof author === "string" ? author.trim() : "Анонім";
    const trimmedText = typeof text === "string" ? text.trim() : "";

    if (!trimmedAuthor || !trimmedText) {
        return res.status(400).json({error: "Усі поля обов'язкові"});
    }


    const comments = JSON.parse(fs.readFileSync(commentsPath, "utf-8"));

    const newComment = {
        id: Date.now(),
        newsId: parsedNewsId,
        author: trimmedAuthor,
        text: trimmedText,
    };

    comments.push(newComment);
    console.log("newsId query:", newsId);
    fs.writeFileSync(commentsPath, JSON.stringify(comments, null, 2));

    res.json({message: "Коментар додано", comment: newComment});
});

module.exports = router;