import React from "react";
import style from "./index.module.css";
import { useNavigate } from "react-router-dom";

const FilledButton = ({ name, onClick, whereTo,  background, color}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
        if (whereTo) {
            navigate(whereTo);
        }
    };

    return (
        <button style={{color: color, background: background}} className={style.signupBtn} onClick={handleClick}>
            {name}
        </button>
    );
};

export default FilledButton;
