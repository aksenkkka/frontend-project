import {useState} from "react";
import "./Profile.css";

export default function Profile() {
    const storedUser = localStorage.getItem("username") || "";

    const [registrationDate, setRegistrationDate] = useState(localStorage.getItem("registrationDate") || "2025-03-30");
    const [username, setUsername] = useState(storedUser);
    const [editingName, setEditingName] = useState(false);
    const [newName, setNewName] = useState(username);
    const [nameMsg, setNameMsg] = useState("");

    const [changingPassword, setChangingPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordMsg, setPasswordMsg] = useState("");

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        window.location.href = "/";
    };

    const handleNameSave = async () => {
        if (!newName.trim()) {
            setNameMsg("Ім'я не може бути пустим");
            return;
        }
        try {
            const res = await fetch("http://localhost:3001/api/users/update", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({oldUsername: username, newUsername: newName}),
            });
            const data = await res.json();
            if (res.ok) {
                setUsername(newName);
                localStorage.setItem("username", newName);
                setNameMsg("Ім'я успішно змінено");
                setEditingName(false);
            } else {
                setNameMsg(data.error || "Сталася помилка");
            }
        } catch {
            setNameMsg("Помилка мережі");
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (!oldPassword || !newPassword) {
            setPasswordMsg("Всі поля повинні бути заповнені");
            return;
        }

        try {
            const res = await fetch("http://localhost:3001/api/profile/change-password", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, oldPassword, newPassword}),
            });
            const data = await res.json();
            if (res.ok) {
                setPasswordMsg("Пароль успішно змінено");
                setOldPassword("");
                setNewPassword("");
                setChangingPassword(false);
            } else {
                setPasswordMsg(data.error || "Помилка зміни пароля");
            }
        } catch {
            setPasswordMsg("Помилка мережі");
        }
    };

    return (
        <div className="profile-container">
            <h2>Мій профіль</h2>

            <div className="profile-block">
                <label>Ім’я користувача:</label>
                {!editingName ? (
                    <div className="profile-row">
                        <span className="profile-username">{username}</span>
                        <button className="btn-edit" onClick={() => {
                            setEditingName(true);
                            setNewName(username);
                            setNameMsg("");
                        }}>
                            Змінити
                        </button>
                    </div>
                ) : (
                    <div className="profile-row">
                        <input
                            type="text"
                            value={newName}
                            onChange={e => setNewName(e.target.value)}
                            className="input-text"
                            autoFocus
                        />
                        <button className="btn-save" onClick={handleNameSave}>Зберегти</button>
                        <button className="btn-cancel" onClick={() => setEditingName(false)}>Скасувати</button>
                    </div>
                )}
                {nameMsg && <p className="message">{nameMsg}</p>}
            </div>

            <div className="profile-block">
                <label>Дата реєстрації:</label>
                <p>{registrationDate ? new Date(registrationDate).toLocaleDateString() : "2025-03-30"}</p>
            </div>

            <div className="profile-block">
                {!changingPassword ? (
                    <button className="btn-change-pass" onClick={() => {
                        setChangingPassword(true);
                        setPasswordMsg("");
                    }}>
                        Змінити пароль
                    </button>
                ) : (
                    <form onSubmit={handlePasswordChange} className="password-form">
                        <input
                            type="password"
                            placeholder="Старий пароль"
                            value={oldPassword}
                            onChange={e => setOldPassword(e.target.value)}
                            required
                            className="input-text"
                        />
                        <input
                            type="password"
                            placeholder="Новий пароль"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            required
                            className="input-text"
                        />
                        <div className="password-buttons">
                            <button type="submit" className="btn-save">Зберегти пароль</button>
                            <button type="button" className="btn-cancel"
                                    onClick={() => setChangingPassword(false)}>Скасувати
                            </button>
                        </div>
                        {passwordMsg && <p className="message">{passwordMsg}</p>}
                    </form>
                )}
            </div>

            <button className="btn-logout" onClick={handleLogout}>Вийти</button>
        </div>
    );
}