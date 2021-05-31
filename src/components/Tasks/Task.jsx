import React, {useState} from "react";
import editIcon from "../../assets/img/edit.svg";
import removeIcon from "../../assets/img/remove.svg";
import './tasks.scss'

const Task = ({id, text, listId, completed, removeTask, onEditTask, onCompletedTask}) =>{

    const editTask = () =>{
        const editFormTask = window.prompt('Изменить задачу', text);
        onEditTask(editFormTask, id, listId);
    }
    const onChecked = () =>{
        setChecked(prev=>!checked);
        onCompletedTask(!completed, id, listId)
    }

    const [checked, setChecked] = useState(completed)
    return (
        <div className={'tasks__items-row'}>
            <div className={'checkbox'} >
                <input id={`task-${id}`} onChange={onChecked} type={'checkbox'} checked={checked}/>
                <label htmlFor={`task-${id}`}>
                    <svg width="11"
                         height="8"
                         viewBox="0 0 11 8"
                         fill="none"
                         xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </label>

            </div>
                <div className={'tasks__items-row-text'}>
                    <span>{text} </span>
                    <div className={'tasks__items-row-control'}>
                        <img src={editIcon} onClick={editTask} alt={'edit'}/>
                        <img src={removeIcon} onClick={()=>removeTask(id, listId)} alt={'delete'}/>
                    </div>
                </div>
        </div>
    )
}

export default Task;