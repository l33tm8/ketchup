import React from "react";
import classes from "./Tags.module.css";
const Tags = () =>
{
    return (
        <div class={classes["tags-span-elements"]}>
                    <div class={classes["tag-span"]} style={{backgroundColor: 'black', color: 'white'}}>Web</div>
                    <div class={classes["tag-span"]}>Модельная съемка</div>
                    <div class={classes["tag-span"]}>Логотипчики:)</div>
        </div>
    )
}

export default Tags;