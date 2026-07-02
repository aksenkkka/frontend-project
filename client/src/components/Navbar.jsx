import {Link, useNavigate} from "react-router-dom";
import {useState, useEffect, useRef} from "react";
import "./Navbar.css";


function getInitials(name) {
    return name
        .split(" ")
        .map(n => n[0].toUpperCase())
        .join("")
        .slice(0, 2);
}

function MenuItem({to, children, onClick}) {
    const className = "profile-menu-item";

    if (to) {
        return <Link to={to} className={className}>{children}</Link>;
    }
    return <button onClick={onClick} className={className}>{children}</button>;
}

export default function Navbar({toggleTheme, onSearch}) {
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [localSearch, setLocalSearch] = useState("");

    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (localSearch.trim()) {
            navigate(`/search?q=${encodeURIComponent(localSearch)}`);
        }
    };
    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        window.location.href = "/";
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    return (
        <header className="navbar">
            <div className="navbar-left">
                <div className="navbar-logo">
                    <Link to="/" className="navbar-title">Спікер</Link>
                </div>
                <form onSubmit={handleSearchSubmit} className="navbar-search-form">
                    <input
                        type="text"
                        placeholder="Пошук..."
                        value={localSearch}
                        onChange={e => setLocalSearch(e.target.value)}
                        className="navbar-search"
                    />
                </form>
            </div>


            <div className="navbar-right navbar-links">
                <nav className="navbar-links">
                    <Link to="/">Головна</Link>
                    <Link to="/about">Про нас</Link>

                    {!username ? (
                        <>
                            <Link to="/register">Реєстрація</Link>
                            <Link to="/login">Вхід</Link>
                        </>
                    ) : (
                        <div className="profile-dropdown" ref={dropdownRef}>
                            <button className="profile-button" onClick={() => setIsOpen(!isOpen)}>
                                {username}
                            </button>
                            {isOpen && (
                                <div className="profile-menu">
                                    <MenuItem to="/profile">Мій профіль</MenuItem>
                                    {role === "admin" && <MenuItem to="/admin">Адмінпанель</MenuItem>}
                                    <MenuItem onClick={handleLogout}>Вийти</MenuItem>
                                </div>

                            )}
                        </div>
                    )}

                    <button onClick={toggleTheme} className="theme-toggle" title="Змінити тему">
                        🌓
                    </button>
                </nav>
            </div>

        </header>
    );
}