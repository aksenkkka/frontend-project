import {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import CategoryBar from "./CategoryBar";
import Poll from "./Poll";

export default function NewsList({searchTerm = ""}) {
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [activeCategory, setActiveCategory] = useState("Усі");

    useEffect(() => {
        fetch("http://localhost:3001/api/news")
            .then(res => res.json())
            .then(data => {
                setNews(data);
                setFilteredNews(data);
            });
    }, []);

    useEffect(() => {
        let filtered = news;

        if (activeCategory !== "Усі") {
            filtered = filtered.filter(n =>
                n.category?.toLowerCase() === activeCategory.toLowerCase()
            );
        }

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(n =>
                n.title.toLowerCase().includes(term) ||
                n.content.toLowerCase().includes(term)
            );
        }

        setFilteredNews(filtered);
    }, [activeCategory, news, searchTerm]);

    return (
        <div className="App">
            <h2 className="news-title">Останні новини</h2>
            <CategoryBar active={activeCategory} onSelect={setActiveCategory}/>

            <div className="news-wrapper">
                <div className="news-main">
                    {filteredNews.length > 0 ? (
                        <div className="news-container">
                            {filteredNews.map(n => <NewsItem key={n.id} {...n} />)}
                        </div>
                    ) : (
                        <p>Новин за вашим запитом не знайдено.</p>
                    )}
                </div>

                <Poll/>
            </div>
        </div>
    );
}