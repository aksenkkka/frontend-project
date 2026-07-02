import React from 'react';

export default function CategoryItem({icon: Icon, name, onClick, active}) {
    return (
        <div
            className={`category-item ${active ? "active" : ""}`}
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={e => {
                if (e.key === "Enter") onClick();
            }}
            style={{cursor: "pointer", display: "flex", alignItems: "center", gap: 6}}
        >
            {Icon && <Icon/>}
            <span>{name}</span>
        </div>
    );
}