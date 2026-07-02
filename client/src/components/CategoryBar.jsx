import React from "react";
import {PoliticsIcon, EconomyIcon, SportIcon, CultureIcon, HealthIcon, ScienceIcon, HappyIcon} from "./CategoryIcon";
import CategoryItem from "./CategoryItem";
import "./CategoryBar.css";

export default function CategoryBar({active, onSelect}) {
    const categories = [
        {name: "Усі",
            icon: () => <svg width="40" height="40" viewBox="0 0 24 24" fill="#888">
                <circle cx="12" cy="12" r="10"/>
            </svg>
        },
        {name: "Політика", icon: PoliticsIcon},
        {name: "Економіка", icon: EconomyIcon},
        {name: "Спорт", icon: SportIcon},
        {name: 'Культура', icon: CultureIcon},
        {name: "Здоровя", icon: HealthIcon},
        {name: "Наука", icon: ScienceIcon},
        {name: "Розваги", icon: HappyIcon}
    ];

    return (
        <div className="category-bar">
            {categories.map(c => (
                <CategoryItem
                    key={c.name}
                    icon={c.icon}
                    name={c.name}
                    onClick={() => onSelect(c.name)}
                    active={active === c.name}
                />
            ))}
        </div>
    );
}