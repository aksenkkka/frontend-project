import {useEffect, useState} from "react";

export default function GreetingMessage() {
    const [visible, setVisible] = useState(true);
    const username = localStorage.getItem("username");
    const hour = new Date().getHours();

    let greeting =
        hour < 12 ? "Добрий ранок" :
            hour < 18 ? "Добрий день" :
                "Добрий вечір";

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    if (!username || !visible) return null;

    return (
        <div style={{
            backgroundColor: "#666",
            color: "white",
            padding: "8px 16px",
            borderRadius: "8px",
            textAlign: "center",
            fontSize: "0.95rem",
            marginBottom: "15px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            maxWidth: "300px",
            margin: "15px auto"
        }}>
            {greeting}, <b>{username}</b>!
        </div>
    );
}