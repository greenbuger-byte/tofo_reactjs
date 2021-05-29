import React from "react";
import './list.scss';
import classNames from "classnames";
import {Badge} from "../../components";
import removeIcon from '../../assets/img/remove.svg';
import Skeleton from "react-loading-skeleton";

const List = ({items, isRemovable, onClick, onRemove}) =>{
    return (
        <React.Fragment>
        {items.length ?

                <ul className={'list'} onClick={onClick}>
                    {
                        items.map( (item, ind)=>(
                            <li key={ind} className={classNames(item.className,  {'active': item.active} )}>
                                {
                                    item.icon ? <i>{item.icon}</i> : (<Badge color={item.color.name}/> )
                                }
                                <span> {item.name} </span>
                                {isRemovable && <img onClick={()=>onRemove(item.id)} className={'list__remove-icon'} src={removeIcon} alt={'remove'}/>}
                            </li>
                        ))
                    }
                </ul>
        :
                <SkeletonList/>
        }</React.Fragment>

    )
}


const SkeletonList = ()=>{
    return (
        <Skeleton count={4} height={49} style={{marginTop: 1}}/>
    )
}
export default List;