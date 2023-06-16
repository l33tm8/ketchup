import React, { useState } from "react";
import classes from "./Comment.module.css";

const CommentInput = (props) =>
{
    const [inputActive, setInputActive] = useState(false);
    const [comment, setComment] = useState("Что думаете о проекте?");
    return (
        <div className={classes["comment-input-container"]}>
            <textarea type="text" className={classes["comment-input"]} value={comment} onChange={e=> {
                setInputActive(true);
                setComment(e.target.value)
            }}>
            </textarea>
            <button className={inputActive? classes["comment-button"] : classes["comment-button-inactive"]}
        onClick={e =>
        {
            
        }}>Опубликовать комментарий</button>
        </div>
    )
}

export default CommentInput;