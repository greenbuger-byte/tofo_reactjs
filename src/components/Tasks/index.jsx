import React from "react";

import "./tasks.scss"

import editIcon from "../../assets/img/edit.svg"
import Skeleton from "react-loading-skeleton";

const Tasks = ({list})=>{

    return(<React.Fragment>
    {!!list ? <div className={'tasks'}>
                <h2 className={'tasks__title'}>
                    {list.name}
                    <img src={editIcon} alt={'edit'} />
                </h2>
                <div className={'tasks__items'}>
                    {list.tasks.map(task => (<div key={task.id} className={'tasks__items-row'}>
                            <div className={'checkbox'}>
                                <input id={'check'} type={'checkbox'}/>
                                <label htmlFor={"check"}>
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

                            </div>    <p>{task.text}</p>
                        </div>
                    ))}
                </div>
            </div>
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