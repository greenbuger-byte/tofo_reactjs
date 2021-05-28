import React, {useState} from "react";
import List from "../List"
import './addListButton.scss';
import Badge from "../Badge";
import closeBtn from "../../assets/img/close.svg";

const AddButtonList = ({colors})=>{

    const [visiblePopup, setVisiblePopup] = useState();
    const [selectedColor, setSelectedColor] = useState(colors[0].id);


    console.log(selectedColor);

    return (
        <div>
        <List
            onClick={()=>setVisiblePopup(true)}
            items={[{
                className: 'add-list',
                name: 'Добавить список',
                icon: <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            }]}/>
            {visiblePopup &&
                <div className={'add-list__popup'}>
                    <img onClick={()=>setVisiblePopup(false)} className={'add-list__popup-close-btn'} src={closeBtn} alt={'close'}/>
                    <input placeholder={'Название списка'}/>
                    <div className={'add-list__popup-colors'}>
                        <ul>
                            {colors.map(color=>
                                (
                                    <li key={color.id}>
                                        <Badge className={color.id===selectedColor && 'active'} onClick={()=>setSelectedColor(color.id)} color={color.name}/>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                    <button>Добавить</button>
                </div>
            }
        </div>
    );
}

export default AddButtonList;