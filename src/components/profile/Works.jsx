import {React, useState, useEffect} from "react";
import classes from "./Works.module.css";
import addImage from "./images/addImage.svg";
import ModalAddProject from "../Modal/ModalAddProject";
const Works = (props) =>
{
    const [projects, setProjects] = useState([]);
    const [ModalAddProjectActive, setModaAddProjectActive] = useState(false);
    useEffect(() =>
    {
        return () =>
        {
        fetch("http://127.0.0.1:8000/portfolio/project/all", {
            method: "GET",
            credentials: "include",
        })
        .then((response) => response.json())
        .then((result) => 
        { 
            result.forEach(element => {
                fetch("http://127.0.0.1:8000/portfolio/image/all?" + new URLSearchParams({project_id: element.id}),
                {
                    method: "GET",
                    credentials: "include",
                })
                .then((response) => response.json())
                
                .then((result) => 
                {
                    element.file = result[0].file;
                    
                }
                )
            });
            setProjects(result);
            console.log(projects);
        })
    }}, []);

    return (
        <div className={classes["works"]}>
            {props.profState? 
                projects.map( (project) => 
                (
                    <div className={classes["works-item"]}>
                        <img className={classes["work-image"]} src={"http://127.0.0.1:8000/getImageByPath?path=" + project["file"]} />
                        <div className={classes["bottom-text"]}>{project["name"]}</div>
                    </div>
                ))
            :
            ""
            }
            {
                
                
            }
            <div className={classes["works-item"]} onClick={() => setModaAddProjectActive(true)}>
                <img className={classes["add-image"]} src={addImage}/>
                <div className={classes["bottom-text"]}>Добавьте новый проект!</div>
            </div>
            <ModalAddProject isActive={ModalAddProjectActive} setIsActive={setModaAddProjectActive} />
        </div>
    )
}

export default Works;