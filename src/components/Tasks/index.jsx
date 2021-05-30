import React from "react";

import "./tasks.scss"

import editIcon from "../../assets/img/edit.svg"
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import AddTaskForm from "./AddTaskForm";

const Tasks = ({list, onEditTitle, onAddTask})=>{

    const editTitle = ()=>{
        const newTitle = window.prompt('Редактировать название списка', list.name);
        if(newTitle){
            axios.patch(`http://localhost:8000/lists/${list.id}`, {"name":newTitle}).then(({data})=>{
                onEditTitle(list.id, newTitle);
            }).catch(err=>{
              console.log(err);
              alert('Не удалось обновить название списка');
            })

        }
    }
    return(<React.Fragment>
    {list ? (
        <div className={'tasks'}>
                <h2 className={'tasks__title'} style={{color: list.color.hex}}>
                    {list.name}
                    <img src={editIcon}  onClick={editTitle} alt={'edit'} />
                </h2>
            {list.tasks.length === 0 ? (<h3>🤚 НЕТ ЗАДАЧ</h3>) :
                <div className={'tasks__items'}>
                    {list.tasks.map(task => (
                        <div key={task.id} className={'tasks__items-row'}>
                            <div className={'checkbox'}>
                                <input id={`task-${task.id}`} type={'checkbox'}/>
                                <label htmlFor={`task-${task.id}`}>
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

                            </div>   <input readOnly value={task.text} />
                        </div>
                    ))}

                </div>}
            <AddTaskForm onAddTask={onAddTask} list = {list} />
            </div>)
            :
        <TaskSkeleton/>
    }
        </React.Fragment>
   )
}

const TaskSkeleton = () =>{

    return (
            <div className={'tasks'}>
            <h2 className={'tasks__title'}>
        <Skeleton height={35}/>
            </h2>
                <div style={{marginTop: '40px', display: 'flex', flexDirection: 'column'}}>
                    <Skeleton  count={6} style={{marginBottom: '20px'}}  height={25}/>
                </div>
            </div>
    );
}


export default Tasks;