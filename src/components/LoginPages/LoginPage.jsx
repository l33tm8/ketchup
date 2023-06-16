import React from "react";
import LoginForm from "./Forms/LoginForm";
import classes from "./Index.module.css";

const LoginPage = () =>
{
    return (
        <div>
        <main>
            <div className={classes["main-page"]}>
                <LoginForm />
            </div>
        </main>
        </div>
    )
}

export default LoginPage;