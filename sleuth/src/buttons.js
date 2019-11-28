import React from "react";

function Buttons(){
    let arr = ["left", "up", "right", "down", "question"]
    const btns = arr.map(label => {
        return (
            <button className={label}>{label}</button>
        )
    });
    return btns;
}

export default Buttons;