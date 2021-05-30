import React, {useState} from "react";
import addIcon from "../../assets/img/add.svg";
import axios from "axios";

const AddTaskForm = ({onAddTask, list}) => {
    const [visibleForm, setVisibleForm] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isTaskAdding, setIsTaskAdding] = useState(false);
    const toggleFormVisible = () =>{
        setVisibleForm(prev=>!visibleForm);
        setInputValue('');
    }
    const addTask = async () =>{
        if(inputValue!==''){
            setIsTaskAdding(true);
            const obj = {listId: list.id, text: inputValue, completed: false}
            try{
                const {data} = await axios.post(`http://localhost:8000/tasks`, obj);
                onAddTask(list.id, data);
                toggleFormVisible();
                setIsTaskAdding(false);
            }catch (e){
                console.log(e);
                alert('Не удалось добавить задачу');
            }
        }else alert('Поле задачи не заполнено');
    }
    return (
        <div className={'tasks__form'}>
            {!visibleForm ? (<div className={'tasks__form-new'} onClick={toggleFormVisible}>
                <img src={addIcon} alt={'Добавить'}/> <span>Новая задача</span>
            </div>)
            :
                (<div className={'tasks__form-block'}>
                <input
                    value={inputValue}
                    onChange={(e)=>setInputValue(e.target.value)}
                    type={'text'}
                    placeholder={'Добавить задачу'}
                />
               <div>
                   <button onClick={addTask} disabled={isTaskAdding} className={'btn__green'}>{!isTaskAdding ? 'Добавить': 'Добавление'}</button>
                   <button onClick={toggleFormVisible} className={'btn__grey'}>Отмена</button>
               </div>
            </div>)}
        </div>
    )
}
export default AddTaskForm;