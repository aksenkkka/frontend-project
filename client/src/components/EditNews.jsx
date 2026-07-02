import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";

const categories = ["Усі", "Політика", "Економіка", "Спорт", "Культура", "Здоровя", "Наука", "Розваги"];

export default function EditNews() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState(categories[0]);
    const [msg, setMsg] = useState("");
    const [currentImage, setCurrentImage] = useState("");
    const [imageFile, setImageFile] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:3001/api/news/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Новина не знайдена");
                return res.json();
            })
            .then(data => {
                setTitle(data.title);
                setContent(data.content);
                setCategory(data.category || categories[0]);
                setCurrentImage(data.image || "");
            })
            .catch(() => setMsg("Не вдалося завантажити новину"));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("category", category);

        if (imageFile) {
            formData.append("image", imageFile);
        } else {
            formData.append("oldImage", image);
        }

        try {
            const res = await fetch(`http://localhost:3001/api/news/${id}`, {
                method: "PUT",
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                setMsg("Новина оновлена");
                setTimeout(() => navigate("/admin"), 1000);
            } else {
                setMsg(data.error || "Помилка");
            }
        } catch {
            setMsg("Помилка мережі");
        }
    };


    return (
        <div style={{maxWidth: "700px", margin: "40px auto", padding: "0 15px"}}>
            <h2 style={{color: "#666", marginBottom: "20px", textAlign: "center"}}>Редагування новини</h2>

            <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: "15px"}}>
                <input
                    type="text"
                    placeholder="Заголовок"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                    style={{padding: "10px", fontSize: "1rem", borderRadius: "6px", border: "1px solid #ccc"}}
                />


                <input
                    type="file"
                    accept="image/*"
                    onChange={e => setImageFile(e.target.files[0])}
                    style={{padding: "10px 0"}}
                />

                <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    style={{padding: "10px", fontSize: "1rem", borderRadius: "6px", border: "1px solid #ccc"}}
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <textarea
                    placeholder="Текст новини"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    required
                    rows={8}
                    style={{
                        padding: "10px",
                        fontSize: "1rem",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        resize: "vertical"
                    }}
                />

                <button
                    type="submit"
                    style={{
                        backgroundColor: "#666",
                        color: "#fff",
                        padding: "12px",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "1rem",
                        transition: "background-color 0.3s ease"
                    }}
                    onMouseOver={e => (e.target.style.backgroundColor = "#666")}
                    onMouseOut={e => (e.target.style.backgroundColor = "#666")}
                >
                    Зберегти
                </button>
            </form>

            {msg && <p style={{
                marginTop: "15px",
                textAlign: "center",
                color: msg.includes("успішно") ? "green" : "red"
            }}>{msg}</p>}
        </div>
    );
}