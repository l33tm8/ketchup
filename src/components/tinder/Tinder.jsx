import React, { useEffect, useState } from "react";
import classes from "./Tinder.module.css";
import dislikeImage from "./images/dislike.png";
import likeImage from "./images/like.png";
import favouriteImage from "./images/favourite.png";
import commentImage from "./images/comment.png";
import profileImage from "./images/profile.png";
import commentActiveImage from "./images/commentActive.png";
import Comment from "../Comment/Comment";
import CommentInput from "../Comment/CommentInput";
import Slider from "../Slider/Slider";
import WorkAuthor from "./WorkAuthor";
import ModalProfile from "../Modal/ModalProfile";

const Tinder = () => {
    
    const [commentState, setCommentState] = useState(false);
    const [modalActive, setModalActive] = useState(false);
    const [currentProject, setCurrentProject] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [currentAvatar, setCurrentAvatar] = useState("");
    const [currentImages, setCurrentImages] = useState([]);
    const [currentComments, setCurrentComments] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    const user = {
        avatar: currentAvatar,
        name: currentUser.first_name + " " + currentUser.last_name,
        about: currentUser.description,
    }


    const stats = {
        likes: currentProject.rating,
        dislikes: 2,
        watched: 23,
    }
        
    useEffect(() =>
    {
        
        (async() =>
        {
            
            if (isFetching)
            {
                await fetch("http://127.0.0.1:8000/portfolio/project/random", 
                {
                    method: "GET",
                    credentials: "include",
                })
                .then(res => res.json())
                .then(async(fresult) => 
                    {
                        await fetch("http://127.0.0.1:8000/getInfo?" + new URLSearchParams({user_id: fresult[0].user_id}),
                        {
                            method: "GET",
                            credentials: "include"
                        })
                        .then(res => res.json())
                        .then(result => setCurrentUser(result));
                            
                        setCurrentProject(fresult[0]);
                        return fresult;
                    })
                .then(async(queryResult) => 
                    {
                        setCurrentAvatar("http://127.0.0.1:8000/avatars?" + new URLSearchParams({user_id: queryResult[0].user_id}))
                        return queryResult;
                    })
                .then(async(queryResult) =>
                {
                    await fetch("http://127.0.0.1:8000/portfolio/image/all?" + new URLSearchParams({project_id: queryResult[0].id}),
                    {
                        method: "GET",
                        credentials: "include"
                    })
                    .then(async(response) => response.json())
                    .then(async(images) => 
                    {
                        let tempImagesArray = [];
                        images.map((image, index) =>
                            {
                                tempImagesArray.push({image: image.file, id: index});
                            });
                        setCurrentImages(tempImagesArray);
                    })
                    return queryResult[0];
                })
                .then(async(queryResult) =>
                    {
                        await fetch("http://127.0.0.1:8000/services/comment/project?" + new URLSearchParams({project_id: queryResult.id}),
                        {
                            method: "GET",
                            credentials: "include"
                        })
                        .then(commentsResponse => commentsResponse.json())
                        .then(comments =>
                            {
                                let tempCommentsArray = []
                                comments.map(async(comment) =>
                                    {
                                        await fetch("http://127.0.0.1:8000/getInfo?" + new URLSearchParams({user_id: comment.user_id}),
                                        {
                                            method: "GET",
                                            credentials: "include"
                                        })
                                        .then(infoResponse => infoResponse.json())
                                        .then(info =>
                                            {
                                                tempCommentsArray.push({
                                                    comment: comment,
                                                    user_info: info,
                                                })
                                            })
                                    })
                                setCurrentComments(tempCommentsArray);
                            })
                    }
                );

                setIsFetching(false);
            }
        }
    )()}, [isFetching]);
    
    return (
        <div>
            <ModalProfile isActive={modalActive} setIsActive={setModalActive} avatar={currentAvatar} user={currentUser}/>
            <div className={classes["tinder-main"]}>
            <div className={classes["tinder-tags"]}>
                <div className={classes["tag-span"]}>Дизайн рекламы</div>
                <div className={classes["tag-span"]}>Логотипчики:)</div>
            </div>
            <div className={classes["tinder-window"]}>
                <Slider images={currentImages}/>
                <div className={classes["tinder-about"]}>
                    { commentState 
                    ? 
                    <div className={classes["tinder-comments"]}>
                        {
                            currentComments.map(commentData =>
                                <Comment author={commentData.user_info}
                                text={commentData.comment.content} />)
                        }
                        <CommentInput />
                    </div>
                    :
                    <div>
                        <WorkAuthor user={user} stats={stats} /> 
                        <div className={classes["tinder-description"]}>
                            {currentProject.description}
                        </div> 
                    </div>
                    }
                    <div className={classes["tinder-reactions"]}>
                        <button className={classes["animated-button"]}
                        onClick={() => setIsFetching(true)}><img src={likeImage} alt="" /></button>
                        <button className={classes["animated-button"]}><img src={favouriteImage} alt="" /></button>
                        <button className={classes["animated-button"]}
                        onClick={() => setIsFetching(true)}><img src={dislikeImage} alt="" /></button>
                        <button className={classes["animated-button"]}
                        onClick={() => setCommentState(!commentState)}><img src={commentState 
                        ? commentActiveImage : commentImage} alt="" /></button>
                        <button className={classes["animated-button"]}
                        onClick={() =>  {
                            setModalActive(true)}
                        }><img src={profileImage} alt="" /></button>
                    </div>
                </div>
                
            </div>
        </div>
        </div>
    )
}
// TODO: доделать вкладку тиндер
export default Tinder;