import React, { useState } from "react";
import classes from "./Profile.module.css";
import Tags from "./Tags";
import Works from "./Works";
import Main from "../Header";
import Footer from "../Footer";
import telegramImage from "./images/telegram.svg";
import vkImage from "./images/vk.svg";
import instagramImage from "./images/instagram.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalChangeAvatar from "../Modal/ModalChangeAvatar";
import ModalChangeProfile from "../Modal/ModalChangeProifle";

const Profile = (props) =>
{
    const navigate = useNavigate();
    const [modalAvatarActive, setModalAvatarActive] = useState(false);
    const [modalChangeProfileActive, setModalChangeProfileActive] = useState(false);
    const [stats, setStats] = useState(({
        first_name: "",
        last_name: "",
        city: "",
        description: "",
        user_id: -1,
    }));

    useEffect(() => (async () => 
    {
        await fetch("http://127.0.0.1:8000/getCurrentUser", 
        {
            method: "GET",
            credentials: "include",
        }).catch(e => console.log("not logged in")).then((res) => 
        {
            if ( res === undefined || res.status > 400)
            {
                navigate('/login');
                return;
            }
            res.json().then(data => setStats(data));
        })}
        ), [props]);
    
    console.log(stats);

    const [profileState, setProfileState] = useState(false); // заказчик или исполнитель
    return (
        <div>
            <div className={classes["profile"]}>
            
			<div className={classes["profile-info"]}>
                <div className={profileState? classes["img-container-red"] : classes["img-container-green"]}>
                    <div className={profileState? classes["img-container-border"] : classes["img-container-border-green"]}
                    onClick={(e) => setProfileState(!profileState)}>
                        {profileState? "И" : "З"}
                    </div>
                    <img src= {'http://127.0.0.1:8000/avatars?user_id=' + stats["user_id"]} alt="Artemon228" onClick={() => setModalAvatarActive(true)}/>
                </div>
                <div className={classes["profile-edit"]} onClick={() => setModalChangeProfileActive(true)}>Редактировать профиль.</div>
                <h1>{stats["first_name"] + " " + stats["last_name"]}</h1>
                <div className={classes["profile-stats"]}>
                    <div className={classes["stats-location"]}>
                        <div className={classes["black-line"]}></div>г.{stats.city}
                    </div>
                    <div className={classes["stats-role"]}>
                        <div className={classes["black-line"]}></div>Исполнитель
                    </div>
                </div>
                <div className={classes["profile-about"]}>
                    {stats['description']}
                </div>
                <div className={classes["profile-socials"]}>
                        <div>Добавьте свои соц. сети</div>
                    <div>
                        <button className={classes["animated-button"]}><img src={telegramImage} alt="" /></button>
                        <button className={classes["animated-button"]}><img src={vkImage} alt="" /></button>
                        <button className={classes["animated-button"]}><img src={instagramImage} alt="" /></button>
                    </div>
                </div>
            </div>
            <div className={classes["profile-works"]}>
                
                <Works profState={profileState}/>
            </div>
		</div>
        <ModalChangeAvatar isActive={modalAvatarActive} setIsActive={setModalAvatarActive} />
        <ModalChangeProfile isActive={modalChangeProfileActive} setIsActive={setModalChangeProfileActive} />
        </div>
    )
}

export default Profile;