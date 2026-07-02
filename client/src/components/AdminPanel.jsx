import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./AdminPanel.css";

export default function AdminPanel() {
    const [newsList, setNewsList] = useState([]);

    const fetchNews = () => {
        fetch("http://localhost:3001/api/news")
            .then((res) => res.json())
            .then(setNewsList);
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleDelete = (id) => {
        if (!window.confirm("Ви впевнені що хочете видалити цю новину?")) return;

        fetch(`http://localhost:3001/api/news/${id}`, {method: "DELETE"}).then((res) => {
            if (res.ok) {
                fetchNews();
            } else {
                alert("Не вдалося видалити новину");
            }
        });
    };

    return (
        <div className="admin-panel">
            <h1>Адмінпанель</h1>

            <div className="button-container">
                <Link to="/admin/add-news" className="add-news-link">
                    Додати новину
                </Link>
            </div>

            <table>
                <thead>
                <tr>
                    <th className="title-col">Заголовок</th>
                    <th className="actions-col">Дії</th>
                </tr>
                </thead>
                <tbody>
                {newsList.map((news) => (
                    <tr key={news.id}>
                        <td>{news.title}</td>
                        <td>
                            <div className="table-actions">
                                <Link to={`/admin/edit/${news.id}`} className="edit-button">
                                    Редагувати
                                </Link>
                                <button
                                    onClick={() => handleDelete(news.id)}
                                    className="delete-button"
                                >
                                    Видалити
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}