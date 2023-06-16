import React from "react";
import classes from './Slider.module.css';

const BtnSlider = (props) =>
{
    let direction = props['direction'];

    return (
        <button className={ direction == "next"
        ? classes["button-slide-next"]
        : classes["button-slide-prev"]}
        onClick={props["moveFunction"]}>
        </button>
    )
}

export default BtnSlider;