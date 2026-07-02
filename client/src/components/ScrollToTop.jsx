import {useState, useEffect} from "react";

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.pageYOffset > 300);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        visible && (
            <button
                onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
                style={{
                    position: "fixed",
                    right: 20,
                    bottom: 40,
                    padding: "12px 16px",
                    fontSize: "1.5rem",
                    borderRadius: "50%",
                    backgroundColor: "#fad4d4",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                    zIndex: 1000,
                    userSelect: "none",
                }}
                aria-label="Наверх"
            >
                ↑
            </button>
        )
    );
}