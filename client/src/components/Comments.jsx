import {useEffect, useState} from "react";
import "./Comments.css";

export default function Comments({newsId}) {
    const [comments, setComments] = useState([]);
    const [author, setAuthor] = useState("");
    const [text, setText] = useState("");
    const [storedUser] = useState(() => localStorage.getItem("username") || "");
    const [page, setPage] = useState(1);

    useEffect(() => {
        setComments([]);
        fetch(`http://localhost:3001/api/comments?page=${page}&newsId=${newsId}`)
            .then(res => res.json())
            .then(data => {
                if (data && Array.isArray(data.comments)) {
                    const sorted = [...data.comments].sort((a, b) => b.id - a.id);
                    setComments(sorted);
                } else {
                    setComments([]);
                }
            });
    }, [newsId, page]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const commentAuthor = storedUser || author.trim();

        if (!commentAuthor) {
            alert("Будь ласка, введіть ім'я");
            return;
        }
        if (!text.trim()) {
            alert("Будь ласка, введіть текст коментаря");
            return;
        }

        fetch("http://localhost:3001/api/comments", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({newsId: Number(newsId), author: commentAuthor, text}),
        })
            .then(res => res.json())
            .then(data => {
                setText("");
                if (!storedUser) setAuthor("");

                if (data.comment) {
                    setPage(1);

                    fetch(`http://localhost:3001/api/comments?page=1&newsId=${newsId}`)
                        .then(res => res.json())
                        .then(newData => {
                            if (Array.isArray(newData.comments)) {
                                const sorted = [...newData.comments].sort((a, b) => b.id - a.id);
                                setComments(sorted);
                            }
                        });
                }
            });
    };

    return (
        <div>
            <h3 style={{marginBottom: 15, color: "#666"}}>Коментарі</h3>

            <form onSubmit={handleSubmit} className="comments-form">
                <h4>Додати коментар:</h4>
                {!storedUser && (
                    <input
                        type="text"
                        placeholder="Ім'я"
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                        required
                    />
                )}
                <textarea
                    placeholder="Текст коментаря"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    required
                    rows={4}
                />
                <button type="submit">Надіслати</button>
            </form>

            <ul className="comments-list">
                {comments.map(c => (
                    <li key={c.id} className="comment-item">
                        <b className="comment-author">{c.author}</b>
                        <p style={{marginTop: 8, whiteSpace: "pre-wrap"}}>{c.text}</p>
                    </li>
                ))}
            </ul>

            <div className="pagination">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                    Попередня
                </button>
                <span>Сторінка {page}</span>
                <button onClick={() => setPage(p => p + 1)}>Наступна</button>
            </div>
        </div>
    );
}
