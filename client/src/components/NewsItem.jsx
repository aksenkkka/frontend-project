import {Link} from "react-router-dom";

export default function NewsItem({id, title, date, content, image}) {
    const previewText = content.length > 60 ? content.slice(0, 60) + "..." : content;

    return (
        <Link to={`/news/${id}`} className="news-card-link">
            <div className="news-card">
                {image && (
                    <img
                        src={image.startsWith("/uploads")
                            ? `http://localhost:3001${image}`
                            : image}
                        alt={title}
                        className="news-image"
                    />
                )}
                <h3 className="news-title">{title}</h3>
                <p className="news-date">{new Date(date).toLocaleDateString()}</p>
                <p className="news-content">{previewText}</p>
            </div>
        </Link>
    );
}
