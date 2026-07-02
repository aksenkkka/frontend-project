import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Comments from "../components/Comments";

export default function NewsPage(image) {
    const {id} = useParams();
    const [news, setNews] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/api/news/${id}`)
            .then((res) => res.json())
            .then(setNews);
    }, [id]);

    if (!news) return <p>Завантаження</p>;

    return (
        <div style={{maxWidth: "700px", margin: "20px auto", padding: "0 15px"}}>
            <h2 style={{color: "#666", marginBottom: "15px"}}>{news.title}</h2>
            {news.image && (
                <img
                    src={
                        typeof news.image === "string" && news.image.startsWith("/uploads")
                            ? `http://localhost:3001${news.image}`
                            : news.image
                    }
                    className="news-image"
                    alt={news.title}
                    style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                        borderRadius: "12px",
                        marginBottom: "20px",
                    }}
                />
            )}
            <p style={{whiteSpace: "pre-wrap"}}>{news.content}</p>
            <hr style={{margin: "30px 0"}}/>

            <Comments newsId={Number(id)}/>
        </div>
    );
}
