import React from "react";
import {FaTelegramPlane, FaFacebookF, FaInstagram, FaTwitter} from "react-icons/fa";

export default function About() {
    const socials = [
        {name: "Telegram", icon: <FaTelegramPlane/>, tooltip: "Наш Телеграм"},
        {name: "Facebook", icon: <FaFacebookF/>, tooltip: "Наш Facebook"},
        {name: "Instagram", icon: <FaInstagram/>, tooltip: "Наш Instagram"},
        {name: "Twitter", icon: <FaTwitter/>, tooltip: "Наш Twitter"},
    ];

    return (
        <div style={{maxWidth: "600px", margin: "40px auto", padding: "0 15px", textAlign: "center"}}>
            <h1>Про нас</h1>
            <p>Сайт новин проект фронтенду Романова К.О.</p>

            <div style={{display: "flex", justifyContent: "center", gap: "30px", marginTop: "30px"}}>
                {socials.map(({name, icon, tooltip}) => (
                    <a
                        key={name}
                        href="https://pma.fpm.kpi.ua/uk"
                        target="_blank"
                        rel="noopener noreferrer"
                        title={tooltip}
                        aria-label={tooltip}
                        style={{
                            fontSize: "2.5rem",
                            color: "#666",
                            transition: "color 0.3s",
                            textDecoration: "none",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#005fa3")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#0077cc")}
                    >
                        {icon}
                    </a>
                ))}
            </div>
        </div>
    );
}