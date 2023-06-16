import React from "react";
import classes from "./Works.module.css";
import starImage from "./star.svg";
const Works = () =>
{
    return (
        <div className={classes["works"]}>
                    <div className={classes["works-item"]}>
                        <div className={classes["bottom-text"]}>красивая работа</div>
                    </div>
                    <div className={classes["works-item"]}>
                        <div className={classes["bottom-text"]}>красивая работа</div>
                        <div className={classes["star-element"]}>
                            <img src={starImage} alt="" />
                        </div>
                    </div>
        </div>
    )
}

export default Works;