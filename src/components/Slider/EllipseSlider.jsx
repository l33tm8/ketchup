import React from "react";
import classes from './Slider.module.css';

const EllipseSlider = ({id, isActive, setFunc}) =>
{
    const setIt = () =>
    {
        setFunc(id);
    }
    return (
        <button
        className={isActive 
            ? classes["button-ellipse-active"]
            : classes["button-ellipse-inactive"]}
            onClick={setIt}>
            </button>
    )
}

export default EllipseSlider;