import {React, useState} from "react";
import classes from "./Forms.module.css";
import { useNavigate } from "react-router-dom";
const LoginForm = () =>
{
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [message, setMessage] = useState("");
    
    const navigate = useNavigate();

    let handleSubmit = async (e) =>
    {
        e.preventDefault();
        try 
        {
            let res = await fetch("http://127.0.0.1:8000/auth/jwt/login", {
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
            console.log(res);
            if (res.status === 200)
            {
                navigate('/profile', { replace: true });
            }
            else {
                setMessage("Неправильный email или пароль");
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className={classes["form-container"]}>
            
            <form onSubmit={handleSubmit}>
                <h1>Рады видеть снова!</h1>
                {message}
                <div className={classes["input-block"]}>Email
                <input type="text" name="email" value={email}
                onChange={(e) => setEmail(e.target.value)}></input></div>
                <div className={classes["input-block"]}>
                    Пароль
                    <input type="password" name="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div className={classes["registration-block"]}>
                    <a href="/registration">Регистрация</a>
                </div>
                <button type="submit" className={classes["submit-button"]}>Поехали!</button>
            </form>
        </div>
    )
}

export default LoginForm;