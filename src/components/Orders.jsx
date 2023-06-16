import React, { useState } from "react";
import ModalProfile from "./Modal/ModalProfile";
import classes from "./Orders.module.css";

const Orders = () =>
{
    const user = {
        first_name: "Илья",
    }
    const [modalActive, setModalActive] = useState(false);
    return (
        <div className={classes["works"]}>
            <div className={classes["works-item"]}
            onClick={e=> setModalActive(true)}>
                        <img className={classes["work-image"]} src={"http://127.0.0.1:8000/getImageByPath?path=uploaded_images/10.png"} />
                        <div className={classes["bottom-text"]}>Нужно переработать проект.</div>
            </div>
        <ModalProfile isActive={modalActive} setIsActive={setModalActive} user = {{first_name: "Эдуард"}} avatar = {"http://127.0.0.1:8000/avatars?user_id=1"}/>
        </div>
    )
}

export default Orders;