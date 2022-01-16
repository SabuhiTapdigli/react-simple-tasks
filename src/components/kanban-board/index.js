import React, { useState, useEffect } from "react";
import "./index.css";

const KanbanBoard= () => {
  
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    const [inputname, setinputname] = useState('')
    const [tasks,settasks] = useState([]);
    const [currentid,setcurrentid] = useState('')
    const stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    let stagesTasks = [];
    for (let i = 0; i < stagesNames.length; ++i) {
      stagesTasks.push([]);
    }
    for (let task of tasks) {
      if(task.stage >=0){
        const stageId = task.stage;
        stagesTasks[stageId].push(task);
      }
      
    }
    const inputhandler = (e) =>{
       setinputname(e.target.value)
    }
    const taskhandler = () =>{
      settasks([...tasks,{name:inputname,stage:0,id:Math.random()}])
      setinputname('')
    }
    const deletehandler = (id) =>{
      const newtasks = tasks.filter((item)=> item.id !== id)
      settasks(newtasks)
    }
    const Forwardhandler = (task) =>{
      if(task.stage < stagesNames.length-1){
        const newdata = [...tasks,{name:task.name,stage:task.stage+1,id:Math.random()}]
        settasks(newdata)
        setcurrentid(task.id)
      }
      
    }
    const backhandler = (task) =>{
      if(task.stage >=1){
        const newdata = [...tasks,{name:task.name,stage:task.stage-1,id:Math.random()}]
        settasks(newdata)
        setcurrentid(task.id)
      }
      
    }
    useEffect(()=>{
      deletehandler(currentid)
    },[currentid])
    // console.log('tasks',tasks)
    
    
    return (
      <div className="mt-20 layout-column justify-content-center align-items-center">
        <section className="mt-50 layout-row align-items-center justify-content-center">
          <input id="create-task-input" value={inputname} onChange={inputhandler}  type="text" className="large" placeholder="New task name" data-testid="create-task-input"/>
          <button type="submit" onClick={taskhandler} className="ml-30" data-testid="create-task-button">Create task</button>
        </section>

        <div className="mt-50 layout-row">
            {stagesTasks.map((tasks, i) => {
                return (
                    <div className="card outlined ml-20 mt-0" key={`${i}`}>
                        <div className="card-text">
                            <h4>{stagesNames[i]}</h4>
                            <ul className="styled mt-50" data-testid={`stage-${i}`}>
                                {tasks.map((task, index) => {
                                    return <li className="slide-up-fade-in" key={`${i}${index}`}>
                                      <div className="li-content layout-row justify-content-between align-items-center">
                                        <span >{task.name}</span>
                                        <div className="icons">
                                          <button className="icon-only x-small mx-2" >
                                            <i className="material-icons" onClick={()=>backhandler(task)} >arrow_back</i>
                                          </button>
                                          <button className="icon-only x-small mx-2" >
                                            <i className="material-icons" onClick={()=>Forwardhandler(task)}>arrow_forward</i>
                                          </button>
                                          <button className="icon-only danger x-small mx-2" >
                                            <i className="material-icons" onClick={()=>deletehandler(task.id)}>delete</i>
                                          </button>
                                        </div>
                                      </div>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
    );
          }
export default KanbanBoard