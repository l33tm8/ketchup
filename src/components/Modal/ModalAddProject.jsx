import {React, useState} from "react";
import classes from "./ModalProfile.module.css";
import exitButton from "./images/exitButton.svg";

const ModalAddProject = ({isActive, setIsActive}) =>
{
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectFiles, setProjectFiles] = useState([]);
    const addProject = async (e) =>
    {
        e.preventDefault();
        console.log(projectFiles);
        await fetch("http://127.0.0.1:8000/portfolio/project", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: projectName,
                description: projectDescription,
            })
        })
        .then((response) => response.json())
        .then(result => result.id)
        .then(async(id) =>
        {
            const formData = new FormData();
            await Promise.all(Array.from(projectFiles).map((file) =>
            {
                
                formData.append('images', file, file.name);
            
            }))
            const res = fetch("http://127.0.0.1:8000/portfolio/image?" + new URLSearchParams({project_id: id}),
                {
                    method: "POST",
                    credentials: "include",
                    body: 
                        formData
                    
                }).then(response => response.json());
        })
    }
    return (
        <div className={isActive ? classes['modal-active'] : classes["modal"]}>
            
            <form onSubmit={addProject}>
                <button className={classes["button-exit"] }
                onClick={(e) => {e.preventDefault(); setIsActive(false)}}>
                    <img src={exitButton} alt="" />
                </button>
                <div className={classes["input-block"]}>Название
                    <input type="text" name="projectName" value={projectName}
                onChange={(e) => setProjectName(e.target.value)}></input></div>
                <div className={classes["input-block"]}>Описание
                    <input type="text" name="projectDescription" value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}></input></div>
                <div className={classes["input-block"]}>Прикрепите картинки!
                    <input type="file" name="projectName" multiple="multiple"
                onChange={(e) => setProjectFiles(e.target.files)}></input></div>
                <button className={classes["upload-button"]}>Добавить проект.</button>
            </form>
        </div>
    )
}

export default ModalAddProject;