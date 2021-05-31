import {useEffect, useState} from "react";
import axios from "axios";
import {Route, useHistory, useLocation} from "react-router-dom";

import {List, Tasks, AddList} from './components';

import './App.scss';

function App() {
    let history = useHistory();
    let location = useLocation();
    const [lists, setLists] = useState([]);
    const [colors, setColors] = useState([]);
    const [activeItem, setActiveItem] = useState(null)

    const createPatch = (field, value, id, listId) => {
        const newList = lists.map(list=>{
            if(list.id===listId) {
                list.tasks.map(task=>{
                    if(task.id===id) task[field]=value;
                    return task;
                });
            }
            return list;
        });
        setLists(newList);
    }

    const onCompletedTask = ( status, id, listsId) =>{
        axios.patch(`http://localhost:8000/tasks/${id}`, {completed:status}).then((data)=>{
            createPatch('completed', status, id, listsId);
        })
    }

    const onEditTask = (text, id, listId) => {
        axios.patch(`http://localhost:8000/tasks/${id}`, {text: text}).then(({data})=>{
          createPatch('text', text, id, listId);
        }).catch(err=> console.log('Не удалось отредактировать задачу'));
    }

    const onRemoveTask = (id, listId)=>{
        //Task is remove
    axios.delete(`http://localhost:8000/tasks/${id}`).then(({data})=>{
        const newList = lists.map(list=>{
            if(list.id === listId){
                list.tasks = list.tasks.filter(task => task.id!==id);
            }
            return list;
        });
        setLists(newList);
    }).catch(err=>{
        console.log(err);
        alert('Не удалось удалить задачу')
    })
    }

    useEffect(()=>{
        const itemId = location.pathname.split('lists/')[1];
            let list = lists.find(list=> list.id=== Number(itemId));
            setActiveItem(list);

    }, [lists, location])

    useEffect(()=>{
        axios.get('http://localhost:8000/lists?_expand=color&_embed=tasks').then(({data})=>{
            setLists(data);
        });
        axios.get('http://localhost:8000/colors').then(({data})=>{
            setColors(data);
        });
    },[]);



    const onEditTitle = (id, name)=>{
        const newList = lists.map(item=>{
            if(item.id === id ) item.name = name;
            return item;
        });
        setLists(newList);
    }

    const addTask = (id, obj)=>{
            const updatedList = lists.map(l=>{
                if(l.id === id){
                    l.tasks = [...l.tasks, obj]
                };
                return l;
            });
            setLists(updatedList);
    }

    const addList = (obj)=>{
           setLists([...lists, {...obj, tasks:[]}]);
    }

    const removeList = (id)=>{
      if(window.confirm('Вы действительно хотите удалить список?')){
          axios.delete('http://localhost:8000/lists/'+id).then(({data})=>{
              const removeFromList = lists.filter(l=>l.id!==id);
              setLists(removeFromList);
          });
      }
    }

  return (

    <div className="todo">
      <div className={'todo__sidebar'}>
        <List
            onClickItem={item=> history.push(`/`)}
            items={
            [
                {
                    active: true,
                    name: 'Все задачи',
                    icon:<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.96 8.10001H7.74001C7.24321 8.10001 7.20001 8.50231 7.20001 9.00001C7.20001 9.49771 7.24321 9.90001 7.74001 9.90001H12.96C13.4568 9.90001 13.5 9.49771 13.5 9.00001C13.5 8.50231 13.4568 8.10001 12.96 8.10001V8.10001ZM14.76 12.6H7.74001C7.24321 12.6 7.20001 13.0023 7.20001 13.5C7.20001 13.9977 7.24321 14.4 7.74001 14.4H14.76C15.2568 14.4 15.3 13.9977 15.3 13.5C15.3 13.0023 15.2568 12.6 14.76 12.6ZM7.74001 5.40001H14.76C15.2568 5.40001 15.3 4.99771 15.3 4.50001C15.3 4.00231 15.2568 3.60001 14.76 3.60001H7.74001C7.24321 3.60001 7.20001 4.00231 7.20001 4.50001C7.20001 4.99771 7.24321 5.40001 7.74001 5.40001ZM4.86001 8.10001H3.24001C2.74321 8.10001 2.70001 8.50231 2.70001 9.00001C2.70001 9.49771 2.74321 9.90001 3.24001 9.90001H4.86001C5.35681 9.90001 5.40001 9.49771 5.40001 9.00001C5.40001 8.50231 5.35681 8.10001 4.86001 8.10001ZM4.86001 12.6H3.24001C2.74321 12.6 2.70001 13.0023 2.70001 13.5C2.70001 13.9977 2.74321 14.4 3.24001 14.4H4.86001C5.35681 14.4 5.40001 13.9977 5.40001 13.5C5.40001 13.0023 5.35681 12.6 4.86001 12.6ZM4.86001 3.60001H3.24001C2.74321 3.60001 2.70001 4.00231 2.70001 4.50001C2.70001 4.99771 2.74321 5.40001 3.24001 5.40001H4.86001C5.35681 5.40001 5.40001 4.99771 5.40001 4.50001C5.40001 4.00231 5.35681 3.60001 4.86001 3.60001Z"
                              fill="black"/>
                    </svg>,

                }
            ]
        }
              activeItem={activeItem && null}
        />
          <List items={lists}
                onRemove={(id)=>removeList(id)}
                onClickItem={item=> history.push(`/lists/${item.id}`)}
                activeItem ={activeItem}
                isRemovable

          />
          <AddList
              addList = {addList}
              colors={colors}
          />
      </div>
        <div className={'todo__tasks'}>
            <Route path={'/'} exact>
                {lists && lists.map(list=>{
                 return   <Tasks
                     onCompletedTask={onCompletedTask}
                     key={list.id}
                     list={list}
                     onRemoveTask={onRemoveTask}
                     onEditTask={onEditTask}
                     onAddTask={addTask}
                     onEditTitle = {onEditTitle}/>
                })
                }
            </Route>
            <Route path={'/lists/:id'}>
                <Tasks
                    list={activeItem}
                    onCompletedTask={onCompletedTask}
                    onAddTask={addTask}
                    onRemoveTask={onRemoveTask}
                    onEditTask={onEditTask}
                    onEditTitle = {onEditTitle}/>
            </Route>
        </div>
    </div>
  );
}

export default App;
