import {BrowserRouter as Router, Routes, Route, Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Comments from "./components/Comments";
import About from "./components/About";
import NewsList from "./components/NewsList";
import NewsPage from "./components/NewsPage";
import Navbar from "./components/Navbar";
import AdminPanel from "./components/AdminPanel";
import AddNews from "./components/AddNews";
import EditNews from "./components/EditNews";
import Footer from "./components/Footer";
import GreetingMessage from "./components/GreetingMessage";
import SearchResults from "./components/SearchResults";
import ScrollToTop from "./components/ScrollToTop";
import Profile from "./components/Profile";

import "./App.css";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SearchPage() {
    const {search} = useLocation();
    const query = new URLSearchParams(search);
    const searchTerm = query.get("q") || "";

    return <NewsList searchTerm={searchTerm}/>;
}

function App() {
    const [searchTerm, setSearchTerm] = useState("");

    const getDefaultTheme = () => {
        const hour = new Date().getHours();
        return hour >= 20 || hour < 7 ? "dark" : "light";
    };

    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        const savedDate = localStorage.getItem("themeDate");
        const today = new Date().toDateString();

        if (savedTheme && savedDate === today) {
            return savedTheme;
        }

        localStorage.setItem("themeDate", today);
        localStorage.setItem("theme", getDefaultTheme());
        return getDefaultTheme();
    });

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem("theme", theme);
        localStorage.setItem("themeDate", new Date().toDateString());
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === "dark" ? "light" : "dark"));
    };
    return (
        <Router>
            <Navbar toggleTheme={toggleTheme} onSearch={setSearchTerm}/>

            <div
                className="App"
                style={{
                    backgroundColor: theme === "dark" ? "#222" : "#fff",
                    color: theme === "dark" ? "#fff" : "#000",
                    minHeight: "100vh",
                    padding: "20px",
                }}
            >
                <GreetingMessage/>

                <nav>
                    <Link to="/">Головна</Link> | <Link to="/about">Про нас</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<NewsList/>}/>
                    <Route path="/news/:id" element={<NewsPage/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/admin" element={<AdminPanel/>}/>
                    <Route path="/admin/add-news" element={<AddNews/>}/>
                    <Route path="/admin/edit/:id" element={<EditNews/>}/>
                    <Route path="/search" element={<SearchPage/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route
                        path="/auth"
                        element={
                            <>
                                <h2>Аутентифікація</h2>
                                <Register/>
                                <Login/>
                                <Comments/>
                            </>
                        }
                    />
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </div>
            <Footer/>
            <ScrollToTop/>
        </Router>
    );
}

export default App;