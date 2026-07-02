import {useState} from "react";

export default function ChangeUsername({currentUsername, onUsernameChange}) {
    const [newUsername, setNewUsername] = useState(currentUsername);
    const [msg, setMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newUsername.trim()) {
            setMsg("Ім'я не може бути пустим");
            return;
        }

        try {
            const res = await fetch("http://localhost:3001/api/profile/update", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    oldUsername: currentUsername,
                    newUsername,
                    newPassword: null,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setMsg(data.error || "Сталася помилка");
            } else {
                setMsg("Ім'я успішно змінено");
                onUsernameChange(newUsername);
            }
        } catch {
            setMsg("Помилка мережі");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Нове ім'я:
                <input
                    type="text"
                    value={newUsername}
                    onChange={e => setNewUsername(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Змінити ім'я</button>
            <p>{msg}</p>
        </form>
    );
}