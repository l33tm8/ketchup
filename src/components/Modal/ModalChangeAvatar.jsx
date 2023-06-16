import {React, useState} from "react";
import classes from "./ModalProfile.module.css";
import exitButton from "./images/exitButton.svg";

const ModalChangeAvatar = ({isActive, setIsActive}) =>
{
    
    const [image, setImage] = useState();
    const uploadImage = async (e) =>
    {
        e.preventDefault();
        console.log(image);
        const formData = new FormData();
        formData.append('avatar', image, image.name);
        e.preventDefault();
        await fetch("http://127.0.0.1:8000/getCurrentUser",
        {
            method: "GET",
            credentials: "include",
        })
        .then((response) => response.json())
        .then( async (result) =>
            {
                if ("user_id" in result)
                {
                    await fetch("http://127.0.0.1:8000/getAvatarPath?" + new URLSearchParams({ user_id: result["user_id"]}),
                    {
                        method: "GET",
                        credentials: "include",
                    })
                    .then((response) => response.json())
                    .then((result) => {
                        console.log(result);

                        if (result.indexOf("no avatar") >= 0)
                        {
                            fetch("http://127.0.0.1:8000/addAvatar", {
                               method: "POST",
                               credentials: "include",
                               body: formData,
                            })
                        }
                        else 
                        {
                            fetch("http://127.0.0.1:8000/changeAvatar", {
                                method: "PUT",
                                credentials: "include",
                                body: formData,
                            })
                        }
                    })
                }
            })
    }

    return (
        <div className={isActive ? classes['modal-active'] : classes["modal"]}>
           
            <form onSubmit={uploadImage}>
                 <button className={classes["button-exit"] }
                    onClick={(e) => {e.preventDefault(); setIsActive(false)}}>
                    <img src={exitButton} alt="" />
                    </button>
                <input type="file" onChange={(e) => setImage(e.target.files[0])}>

                </input>
                <button className={classes["upload-button"]}>Загрузить аватарку.</button>
            </form>
        </div>
    )
}

export default ModalChangeAvatar;