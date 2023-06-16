import {React, useState} from "react";
import classes from "./Forms.module.css";
import { useNavigate } from "react-router-dom";


const RegistrationForm = () =>
{
    const navigate = useNavigate();

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [message, setMessage] = useState("");
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [city, setCity] = useState("");
    let handleSubmit = async (e) =>
    {
        e.preventDefault();
        try 
        {
            let res = await fetch("http://127.0.0.1:8000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    'email': email,
                    'password': password,
                    'is_active': true,
                    'is_superuser': false,
                    'is_verified': false,
                })
            });
            if (res.status === 201)
            {
                await fetch("http://127.0.0.1:8000/auth/jwt/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    credentials: 'include',
                    body: new URLSearchParams({
                        'grant_type': "",
                        'username': email,
                        'password': password,
                        'client_id': "",
                        'client_secret': "",
                    })
                });
                let addResponse = await fetch("http://127.0.0.1:8000/addInfo", {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "first_name": firstName,
                        "last_name": lastName,
                        "is_designer": true,
                        "city": city,
                        "description": "Расскажите о себе",
                    })
                })

                if (addResponse.status === 200)
                {
                    navigate('/profile', { replace: true });
                }
                else
                {
                    setMessage("Произошла ошибка!");
                }

            }
            else 
            {
                setMessage("такой email уже зарегистрирован.");
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className={classes["form-container"]}>
            
            <form onSubmit={handleSubmit}>
                <h1>Приключение начинается!</h1>
                {message}
                <div className={classes["input-block"]}>Имя
                    <input type="text" name="first_name" value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}></input> 
                </div>
                <div className={classes["input-block"]}>Фамилия
                    <input type="text" name="last_name" value={lastName}
                    onChange={(e) => setLastName(e.target.value)}></input>
                    </div>
                <div className={classes["input-block"]}>Город
                    <input type="text" name="city" value={city}
                    onChange={(e) => setCity(e.target.value)}></input>
                </div>
                <div className={classes["input-block"]}>Email
                <input type="text" name="email" value={email}
                onChange={(e) => setEmail(e.target.value)}></input></div>
                <div className={classes["input-block"]}> 
                    Пароль
                    <input type="password" name="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div className={classes["input-block"]}>
                    Ещё раз
                    <input type="password" name="repeat-password"></input> 
                </div>
                
                <button type="submit" className={classes["submit-button"]}>Поехали!</button>
            </form>
        </div>
    )
}

export default RegistrationForm;