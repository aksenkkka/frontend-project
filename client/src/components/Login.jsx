import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [loggedInUser, setLoggedInUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("username");
        if (storedUser) {
            setLoggedInUser(storedUser);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (username === "admin" && password === "root") {
            localStorage.setItem("username", "admin");
            localStorage.setItem("role", "admin");
            setLoggedInUser("admin");
            setMsg("Ви увійшли як адмін");
            navigate("/admin");
            return;
        }

        try {
            const res = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password}),
            });

            const data = await res.json();

            if (!res.ok) {
                setMsg(data.error || "Помилка авторизації");
                return;
            }

            localStorage.setItem("username", data.user.username);
            localStorage.setItem("role", data.user.role || "user");
            localStorage.setItem("registrationDate", data.user.registrationDate || "");

            setLoggedInUser(data.user.username);
            setMsg("Вхід успішний");
            navigate("/");

        } catch {
            setMsg("Помилка мережі");
        }
    };
    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        setLoggedInUser(null);
        setMsg("Ви вийшли з акаунту");
    };

    if (loggedInUser) {
        return (
            <div>
                <p>Ви увійшли як <b>{loggedInUser}</b></p>
                <button onClick={handleLogout}>Вийти</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleLogin}>
            <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Логін"
                required
            />
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Пароль"
                required
            />
            <button type="submit">Увійти</button>
            <p>{msg}</p>
        </form>
    );
}