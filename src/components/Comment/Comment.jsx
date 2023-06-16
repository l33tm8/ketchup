import React from "react";
import classes from "./Comment.module.css";

const Comment = ({author, text}) =>
{
    const avatar = "http://127.0.0.1:8000/avatars?user_id=" + author.user_id;
    return (
        <div className={classes["comment"]}>
            <div className={classes["comment-avatar"]}>
                <img src={avatar} />
            </div>
            <div className={classes['comment-body']}>
                <div className={classes["comment-header"]}>
                    <div className={classes["comment-author"]}>
                        {author.first_name + author.last_name}
                    </div>
                    <span className={classes["comment-date"]}>
                        
                    </span>
                </div>
                <div className={classes["comment-text"]}>
                    {text}      
                </div>
            </div>
        </div>
    )
}

export default Comment;