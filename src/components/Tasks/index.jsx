import React from "react";

import "./tasks.scss"

import editIcon from "../../assets/img/edit.svg"
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";

const Tasks = ({list, onEditTitle, onAddTask, onEditTask, onRemoveTask, onCompletedTask})=>{

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
                        <Task
                            key={task.id}
                            removeTask={onRemoveTask}
                            onEditTask={onEditTask}
                            onCompletedTask={onCompletedTask}
                            {...task}
                        />
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