import React from "react";
import classes from "./ModalProfile.module.css";
import telegramImage from "./images/telegram.png";
import vkImage from "./images/vk.png";
import instagramImage from "./images/instagram.png";
import exitButton from "./images/exitButton.svg";
import artemonImage from "./images/artemon.png";

const ModalProfile = ({isActive, setIsActive, user, avatar}) =>
{

 return (
    <div className={isActive ? classes['modal-active'] : classes["modal"]}>
        <div className={classes["modal-profile-content"]}>
            <button className={classes["button-exit"] }
            onClick={() => setIsActive(false)}>
            <img src={exitButton} alt="" />
            </button>
            <div className={classes['modal-avatar']}>
                <img src={avatar} alt="" />
            </div>
            <div className={classes["modal-username"]}>
                <div className={classes["modal-h1-name"]}>{user.first_name}</div>
                <div className={classes["modal-email"]}>{user.email}</div>
            </div>
            <div className={classes['modal-socials']}>
                <a className={classes["animated-button"]} href={user.telegram_link}><img src={telegramImage} alt="" /></a>
                <a className={classes["animated-button"]} href={user.vk_link}><img src={vkImage} alt="" /></a>
                <a className={classes["animated-button"]} href={user.instagramLink}><img src={instagramImage} alt="" /></a>
            </div>
        </div>
    </div>
 ); 
}

export default ModalProfile;