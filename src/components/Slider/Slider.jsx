import React, { useEffect, useState, createContext } from "react";
import BtnSlider from "./BtnSlider";

import EllipseSlider from "./EllipseSlider";
import classes from './Slider.module.css';

const Slider = (props) => {
    const [slideIndex, setSlideIndex] = useState(1);

    const nextSlide = () =>
    {
        if (slideIndex !== props.images.length)
        {
            setSlideIndex(slideIndex + 1);
        }
        else
            setSlideIndex(1);
        
    }

    const prevSlide = () =>
    {
        if (slideIndex !== 1)
        {
            setSlideIndex(slideIndex - 1);
        }
        else
            setSlideIndex(props.images.length);
    }

    const setSlideIndexWithid = (id) =>
    {
        
        setSlideIndex(id);
    }
    

    return (
        <div className={classes["slider-container"]}>
            {props.images.map((obj, index) => 
            {
                const logo = "http://127.0.0.1:8000/getImageByPath?path=" + obj.image;
                return (
                    <div
                    key={obj.id}
                    className={slideIndex === index + 1 
                    ? classes["slide-active-anim"]
                    : classes["slide"]}>
                    <img src={logo} />
                    </div>
                )
            })}
            <div className={classes["buttons-container"]}>
                <BtnSlider direction={"prev"} moveFunction={prevSlide} />
                {props.images.map((obj, index) =>
                {
                    return (
                        <EllipseSlider id={index + 1} 
                        isActive={index + 1 === slideIndex}
                        setFunc={setSlideIndexWithid}/>
                    )
                })}
                <BtnSlider direction={"next"} moveFunction={nextSlide} />
            </div>
        </div>
    )
}

export default Slider;