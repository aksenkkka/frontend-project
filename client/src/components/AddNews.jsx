import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function AddNews() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [content, setContent] = useState("");
    const [msg, setMsg] = useState("");
    const [category, setCategory] = useState("Політика");
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("category", category);

        if (imageFile) {
            formData.append("image", imageFile);
        }

        fetch("http://localhost:3001/api/news", {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.news) {
                    setMsg("Новину додано успішно");
                    setTitle("");
                    setContent("");
                    setCategory("Політика");
                    setImageFile(null);
                } else {
                    setMsg(data.error || "Помилка при додаванні новини");
                }
            })
            .catch(() => setMsg("Сталася помилка мережі"));
    };

    return (
        <div style={{maxWidth: "700px", margin: "40px auto", textAlign: "center"}}>
            <h2>Додати новину</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Заголовок"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{width: "100%", padding: "10px", marginBottom: "10px"}}
                />
                <input
                    type="file"
                    placeholder="зображення"
                    accept="image/*"
                    onChange={e => setImageFile(e.target.files[0])}
                    style={{width: "100%", padding: "10px", marginBottom: "10px"}}
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{width: "100%", padding: "10px", marginBottom: "10px"}}
                >
                    <option value="Політика">Політика</option>
                    <option value="Економіка">Економіка</option>
                    <option value="Спорт">Спорт</option>
                    <option value="Культура">Культура</option>
                    <option value="Здоровя">Здоровя</option>
                    <option value="Наука">Наука</option>
                    <option value="Розваги">Розваги</option>
                </select>

                <textarea
                    placeholder="Текст новини"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={12}
                    required
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "10px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        minHeight: "200px",
                        fontSize: "1rem",
                        lineHeight: "1.5",
                        resize: "vertical"
                    }}
                />
                <button type="submit" style={{
                    backgroundColor: "#666", color: "white", padding: "12px 20px",
                    border: "none", borderRadius: "8px", cursor: "pointer"
                }}>
                    Додати новину
                </button>
            </form>
            {msg && <p style={{color: "#666", textAlign: "center", marginTop: "15px"}}>{msg}</p>}
        </div>
    );
}