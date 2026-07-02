import React from "react";
import {FaTelegramPlane, FaFacebookF, FaInstagram, FaTwitter} from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
    const socials = [
        {name: "Telegram", icon: <FaTelegramPlane/>},
        {name: "Facebook", icon: <FaFacebookF/>},
        {name: "Instagram", icon: <FaInstagram/>},
        {name: "Twitter", icon: <FaTwitter/>},
    ];

    return (
        <footer>
            <div className="footer-text">K. Romanova 2025</div>
            <div className="social-icons">
                {socials.map(({name, icon}) => (
                    <a
                        key={name}
                        href="https://pma.fpm.kpi.ua/uk"
                        target="_blank"
                        rel="noopener noreferrer"
                        title={name}
                        aria-label={name}
                    >
                        {icon}
                    </a>
                ))}
            </div>
        </footer>
    );
}