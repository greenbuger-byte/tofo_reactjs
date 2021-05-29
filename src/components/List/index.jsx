import React from "react";
import './list.scss';
import classNames from "classnames";
import Badge from "../Badge";
import removeIcon from '../../assets/img/remove.svg';

const List = ({items, isRemovable, onClick, onRemove}) =>{
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
                        {isRemovable && <img onClick={()=>onRemove(item.id)} className={'list__remove-icon'} src={removeIcon} alt={'remove'}/>}
                    </li>
                ))
            }
        </ul>
    )
}

export default List;