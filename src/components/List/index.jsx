import React from "react";
import './list.scss';
import classNames from "classnames";
import Badge from "../Badge";

const List = ({items, isRemovable, onClick}) =>{
    console.log(isRemovable);
    return (
        <ul className={'list'} onClick={onClick}>
            {
                items.map( (item, ind)=>(
                    <li key={ind} className={classNames(item.className,  {'active': item.active} )}>
                        {
                            item.icon ? <i>{item.icon}</i> : (<Badge color={item.color}/> )
                        }
                        <span> {item.name} </span>
                    </li>
                ))
            }
        </ul>
    )
}

export default List;