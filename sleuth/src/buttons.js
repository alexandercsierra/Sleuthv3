import React from "react";
import {buttonLabels, buttons} from "./data"
let btnVal
function Buttons(){
    const arr = buttonLabels;
    const btnDo = buttons;
    
    const btns = arr.map(label => {
        return (
            <button key = {label} className={label} onClick = {(e) => {
                e.preventDefault();
                btnVal = label;
                // console.log(btnVal);
                return btnVal;
            }}>{label}</button>
        )
    });
    return btns;
}

export {btnVal, Buttons};