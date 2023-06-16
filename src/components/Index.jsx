import React from "react";
import Main from "./Header";
import Footer from "./Footer";
import classes from "./Index.module.css";
const StartPage = () =>
{
    return (
        <div>
        <main>
            <div className={classes["main-page"]}>
                - острый вкус твоего дизайна. Общайся, делись портфолио и находи проекты. Остальное за нами.
            </div>
        </main>
        </div>
    )
}

export default StartPage;