import React,{useState,useEffect} from 'react'
import styles from './todostyle.module.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TaskCom from './componenets/task/task'

import {GetTasks,AddTasks} from './apis/todo'
function App() {
  const [tasks,setTasks]=useState([]) //tasks From Db
  const [fillTask,setFillTask]=useState("") //  input handler for task text

  /*
  *init tasks
  */
  useEffect(()=>{
    GetTasks().then(res=>{
      setTasks(res.data.result)
    }).catch(error=>{
      alert(error)
    })
  },[])
  /*
  *fill task state from input 
  */
  const fillTaskFn=(event)=>{
    const {name,value}=event.target
    setFillTask({[name]:value})
  }
  /*
  *send task to db
  */
  const saveTask=()=>{
    AddTasks(fillTask).then(res=>{
      if(res.data.error){
        alert(res.data.message)
        return
      }
      setTasks(old=>{
        return [{task:res.data.result.task,_id:res.data.result._id},...old]
      })
      document.getElementsByClassName("MuiInputBase-input")[0].value=""//to clear input 
      setFillTask("")
    }).catch(error=>{
      alert(error)
    })
  }
  /*
  *remove task in real Time  passed as props to Task component
  */
  const RemoveTaskFromArray=(id)=>{
    setTasks(tasks.filter(task=>task._id!=id))
  }
  /*
  *update task in real time passed as props to Task component
  */
  const UpdateTaskFromArray=(id,newTask)=>{
    setTasks(tasks.map(tasks=>{
      if(tasks._id==id){
        tasks.task=newTask.task
        return tasks
      }else{
        return tasks
      }
    }))
  }
  return (
    <div className="App">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>GALACTECH Todo App</h1>
        </div>
        <div className={styles.formContainer}>
          <TextField
            id="outlined"
            label="task"
            type="text"
            name="task"
            value={fillTask.task}
            onChange={fillTaskFn}
            inputProps={{style: {fontSize: 15}}} 
            InputLabelProps={{style: {fontSize: 25}}} 
            style ={{height: '50px',width:"70%"}}
          />
          <Button onClick={saveTask} style={{fontSize:"0.4rem",width:"25%",marginLeft:"10px",height:"55px"}}  variant="contained" disableElevation>save</Button>
        </div>
        <div className={styles.listTasks}>
            {tasks.map(task=><TaskCom UpdateTaskFromArrayProps={UpdateTaskFromArray} RemoveTaskFromArrayProps={RemoveTaskFromArray} key={task._id} {...task}/>)}
          </div>
      </div>
    </div>
  );
}

export default App;
