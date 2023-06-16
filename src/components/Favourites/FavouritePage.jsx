import React from "react";
import exampleImg from "./13.jpg";
import watchedImg from "./watched.svg";

import classes from "./Favourites.module.css";
const FavouritePage = () =>
{
    return (
        <div className={classes["favourite-container"]}>
            <div className={classes["favourite-item"]}>
                <div className={classes["favourite-img"]}>
                    <img src={exampleImg} alt="" />
                </div>
                <div className={classes["favourite-description"]}>
                    <div className={classes["favourite-header"]}>
                        <div className={classes["favourite-header-text"]}>
                            Фотосессия
                        </div>
                        <div className={classes["favourite-header-watched"]}>
                            <img src={watchedImg} />
                            1
                        </div>
                    </div>
                    <div className={classes["favourite-author"]}>
                        <div className={classes["author-avatar"]}>
                        <img src={"http://127.0.0.1:8000/avatars?user_id=1"} alt= "" />
                        </div>
                        Эдуард Воронцов
                    </div>
                    <div className={classes["description-info"]}>
                    Let me tell you what I see here: a lot of raw talent. Swagger. Bravado. People are scared of you guys. They think you're dangerous, but the world needs to hear it. - Голос улиц 2015 MD: Sabaly Malick PH: by me
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FavouritePage;