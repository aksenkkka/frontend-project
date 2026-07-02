import {useState} from "react";
import "./Poll.css";

export default function Poll() {
    const [selected, setSelected] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const options = [
        "Політика", "Економіка", "Спорт", "Культура", "Здоровя", "Наука",
        "Розваги"
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selected) return;

        const votes = JSON.parse(localStorage.getItem("pollVotes") || "{}");
        votes[selected] = (votes[selected] || 0) + 1;
        localStorage.setItem("pollVotes", JSON.stringify(votes));

        setSubmitted(true);
    };
    return (
        <div className={`poll-sidebar ${isOpen ? "open" : ""}`}>
            <button className="poll-toggle" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "→" : "←"}
            </button>
            <div className="poll-content">
                <h3>Які новини для Вас цікавіші?</h3>

                {submitted ? (
                    <>
                        <p className="poll-thanks">Дякуємо за відповідь!</p>
                        <div className="poll-results">
                            {options.map((opt) => {
                                const votes = JSON.parse(localStorage.getItem("pollVotes") || "{}");
                                const totalVotes = Object.values(votes).reduce((sum, val) => sum + val, 0);
                                const percent = totalVotes ? Math.round((votes[opt] || 0) / totalVotes * 100) : 0;

                                return (
                                    <div key={opt} className="poll-result-item">
                                        <span>{opt}</span>
                                        <div className="poll-bar">
                                            <div className="poll-bar-fill" style={{width: `${percent}%`}}/>
                                        </div>
                                        <span>{percent}%</span>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <form onSubmit={handleSubmit} className="poll-form">
                        <div className="poll-options">
                            {options.map((opt) => (
                                <label key={opt} className="poll-option">
                                    <input
                                        type="radio"
                                        name="poll"
                                        value={opt}
                                        onChange={() => setSelected(opt)}
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>
                        <button type="submit" className="poll-submit">Відповісти</button>
                    </form>
                )}
            </div>
        </div>
    );
}