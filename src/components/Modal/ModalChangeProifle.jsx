import {React, useState} from "react";
import classes from "./ModalProfile.module.css";
import exitButton from "./images/exitButton.svg";

const ModalChangeProfile = ({isActive, setIsActive}) =>
{
    const [profileAbout, setProfileAbout] = useState("");
    const [profileVK, setProfileVK] = useState("");
    const [profileTelegram, setProfileTelegram] = useState("");
    const [profileInstagram, setProfileInstagram] = useState("");
    const editProfile = (e) =>
    {
        e.preventDefault();
        fetch("http://127.0.0.1:8000/changeInfo", {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body:  JSON.stringify({
                description: profileAbout,
                vk_link: profileVK,
                telegram_link: profileTelegram,
                instagram_link: profileInstagram,
                
            })
        })
    }
    return(
        <div className={isActive ? classes['modal-active'] : classes["modal"]}>
            <form onSubmit={editProfile}>
                <button className={classes["button-exit"] }
                        onClick={(e) => {e.preventDefault(); setIsActive(false)}}>
                            <img src={exitButton} alt="" />
                </button>
                <h1>Редактировать профиль.</h1>
                <div className={classes["input-block"]}>О себе
                            <input type="text" name="profileAbout" value={profileAbout}
                onChange={(e) => setProfileAbout(e.target.value)}></input></div>
                <div className={classes["input-block"]}>Ссылка на ВК
                            <input type="text" name="profileVK" value={profileVK}
                onChange={(e) => setProfileVK(e.target.value)}></input></div>
                <div className={classes["input-block"]}>Ссылка на Telegram
                            <input type="text" name="profileTelegram" value={profileTelegram}
                onChange={(e) => setProfileTelegram(e.target.value)}></input></div>
                <div className={classes["input-block"]}>Ссылка на Instagram
                            <input type="text" name="profileInstagram" value={profileInstagram}
                onChange={(e) => setProfileInstagram(e.target.value)}></input></div>
                <button className={classes["upload-button"]}>Редактировать.</button>
            </form>
        </div>
    )
}

export default ModalChangeProfile;