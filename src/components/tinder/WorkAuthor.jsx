import React from "react";
import classes from "./WorkAuthor.module.css";
import likesImg from './images/likes.svg';
import dislikesImg from './images/dislikes.svg';
import watchedImg from './images/watched.svg';

const WorkAuthor = ({user, stats}) =>
{
    
    const avatar = user['avatar'];
    
    return (
        <div className={classes["work-author-container"]}>
            <div className={classes["author-avatar"]}>
                <img src={avatar} />
            </div>
            <div className={classes['author-body']}>
                <div className={classes["author-header"]}>
                    <div className={classes["author-name"]}>
                        {user['name']}
                    </div>
                </div>
                <div className={classes["author-description"]}>
                    {user['about']}      
                </div>
            </div>
            <div className={classes["work-stats"]}>
                
                <div className={classes["work-stats-item"]}>
                    <img src={likesImg} />
                    {stats["likes"]}
                </div>
                
                
            </div>
        </div>
    )
}

export default WorkAuthor;