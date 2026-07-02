import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import NewsItem from "./NewsItem";

export default function SearchResults() {
    const [results, setResults] = useState([]);
    const query = new URLSearchParams(useLocation().search);
    const searchTerm = query.get("q")?.toLowerCase() || "";

    useEffect(() => {
        fetch("http://localhost:3001/api/news")
            .then(res => res.json())
            .then(data => {
                const filtered = data.filter(n =>
                    n.title.toLowerCase().includes(searchTerm) ||
                    n.content.toLowerCase().includes(searchTerm)
                );
                setResults(filtered);
            });
    }, [searchTerm]);

    return (
        <div style={{padding: "20px"}}>
            <h2>Результати пошуку для: <i>{searchTerm}</i></h2>
            <div className="news-container">
                {results.length > 0 ? (
                    results.map(n => <NewsItem key={n.id} {...n} />)
                ) : (
                    <p>Нічого не знайдено.</p>
                )}
            </div>
        </div>
    );
}