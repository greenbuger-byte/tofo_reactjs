import React from "react";
import editIcon from "../../assets/img/edit.svg";
import removeIcon from "../../assets/img/remove.svg";
import './tasks.scss'

const Task = ({id, text}) =>{

    return (
        <div className={'tasks__items-row'}>
            <div className={'checkbox'}>
                <input id={`task-${id}`} type={'checkbox'}/>
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
                    <div className={'tasks__items-row-control'}>4545
                        <img src={editIcon} alt={'edit'}/>
                        <img src={removeIcon} alt={'delete'}/>
                    </div>
                </div>
        </div>
    )
}

export default Task;