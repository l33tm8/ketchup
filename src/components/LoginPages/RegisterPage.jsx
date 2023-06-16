import React from "react";
import RegistrationForm from "./Forms/RegistrationForm";
import classes from "./Index.module.css";

const RegisterPage = () =>
{
    return (
        <div>
        <main>
            <div className={classes["main-page"]}>
                <RegistrationForm />
            </div>
        </main>
        </div>
    )
}

export default RegisterPage;