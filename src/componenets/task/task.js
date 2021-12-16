import React,{useState} from 'react'
import styles from './task.module.scss'
import Button from '@mui/material/Button';
import {DeleteTasks,UpdateTasks} from '../../apis/todo'
import TextField from '@mui/material/TextField';

const TaskCom = (props) => {
    const [fillTask,setFillTask]=useState("") //  input handler for task update 
    const [updateState,setUpdateState]=useState(false) //  show new ui when user want to update state should be true to display new ui

    const deleteFn=(id)=>{
        DeleteTasks({id}).then((res)=>{
            if(res.data.error==true){
                alert(res.data.message)
            }
            props.RemoveTaskFromArrayProps(id)
        }).catch(error=>{
            alert(error)
        })
    }
  /*
  *fill state of new task 
  */
    const fillTaskFn=(event)=>{
        const {name,value}=event.target
        setFillTask({[name]:value})
      }
  /*
  *show ui update
  */
    const updateFn=(id)=>{
        setUpdateState(true)
    }
  /*
  *send updated Data
  */
    const sendChangeTodDb=(id)=>{
        console.log(fillTask.task)
        if(fillTask.task==undefined ||  fillTask.task.length==0){
            alert("you cant update empty data")
            return
        }
        UpdateTasks({id,task:fillTask.task}).then((res)=>{
            if(res.data.error==true){
                alert(res.data.message)
            }
            setUpdateState(false)
            props.UpdateTaskFromArrayProps(id,fillTask)
            setFillTask("")

        }).catch(error=>{
            alert(error)
        })
    }

    return (
        <div className={styles.container}>
            {updateState==false&&<div className={styles.text}>{props.task}</div>}
            {updateState==true&&<div className={styles.formContainer}><TextField id="outlined" label="update task" type="text" name="task" value={fillTask.task} onChange={fillTaskFn}inputProps={{style: {fontSize: 15}}} InputLabelProps={{style: {fontSize: 25}}} style ={{height: '50px',width:"70%"}}/></div>}            
            {/**********if updateState is true will display update ui*********** */}
            <div className={styles.Buttons}>
            {updateState==false&&<Button onClick={()=>deleteFn(props._id)} style={{borderColor:"#dc3545",color:"black",fontSize:"0.3rem",width:"47%",marginLeft:"10px",height:"55px"}} variant="outlined">
                Delete
            </Button>}
            {updateState==false&&<Button  onClick={updateFn} style={{borderColor:"#ffc107",color:"black",fontSize:"0.3rem",width:"47%",marginLeft:"10px",height:"55px"}} variant="outlined">
                update
            </Button>}
            {updateState==true&&<Button  onClick={()=>{setUpdateState(false)}} style={{borderColor:"#dc3545",color:"black",fontSize:"0.3rem",width:"47%",marginLeft:"10px",height:"55px"}} variant="outlined">
                cancel
            </Button>}
            {updateState==true&&<Button  onClick={()=>{sendChangeTodDb(props._id)}} style={{borderColor:"#28a745",color:"black",fontSize:"0.3rem",width:"47%",marginLeft:"10px",height:"55px"}} variant="outlined">
                save 
            </Button>}

            </div>

        </div>
        
    )
}

export default TaskCom
