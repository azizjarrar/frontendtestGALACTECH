import axios from 'axios';
import {ip} from '../consts'
const GetTasks=async (data)=>{
   return axios.get(ip+"/todo")
}
const AddTasks=async (data)=>{
   return axios.post(ip+"/todo",{...data})
}
const DeleteTasks=async (data)=>{
    return axios.post(ip+"/todo/delete/",{...data})
 }
 const UpdateTasks=async(data)=>{
   return axios.put(ip+"/todo",{...data})

 }
export {GetTasks,AddTasks,DeleteTasks,UpdateTasks}

