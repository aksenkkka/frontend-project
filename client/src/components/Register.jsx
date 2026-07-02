import {useState} from "react";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        const usernameRegex = /^[a-zA-Z0-9_]{4,}$/;
        if (!usernameRegex.test(username)) {
            setMsg("⚠Логін має містити латинські букв та цифри і бути не менше 4 символів.");
            return;
        }

        try {
            const res = await fetch("http://localhost:3001/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password}),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("username", data.user.username);
                localStorage.setItem("role", "user");
                localStorage.setItem("registrationDate", data.user.registrationDate || "");

                setMsg("Реєстрація успішна. Ви увійшли");
                window.location.href = "/";
            } else {
                setMsg(data.error || "Сталася помилка");
            }
        } catch {
            setMsg("Сталася помилка під час реєстрації.");
        }
    };
    return (
        <form onSubmit={handleRegister}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Логін"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
            />
            <button type="submit">Зареєструватися</button>
            <p>{msg}</p>
        </form>
    );
}