import React ,{useEffect, useState}from 'react'
import { useNavigate } from 'react-router-dom'
import '../all.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function All() {

  useEffect(()=>{
      getData()
  },[])

  const[data,setData]=useState([])
  let navigate=useNavigate()

  let handleDelete = async(id)=>{
   
    let res= await axios.delete(`https://https-crud-app-7-herokuapp-com-78ox.onrender.com/delete/${id}`)

    if(res.status === 200){
      toast.info("Deleted successfully",{

        icon:'👍'
      })
      getData()  
    }else{
      toast.error('Deletion failed')
    }
      }
  let handleEdit=(id)=>{
     navigate(`/edit/${id}`)
  }

  let getData = async()=>{
    let res = await axios.get(`https://https-crud-app-7-herokuapp-com-78ox.onrender.com/all`)
    setData(res.data.data)
  }
console.log(data)

  return (
    <div className='margin'>
    <ToastContainer limit={3} />
    <table class="table table-striped">
    <thead>
        <tr className='align2'>
        <th className='th' scope="col" >#</th>
        <th className='th' scope="col">Image</th>
        <th className='th' scope="col">Name</th>
        <th className='th' scope="col">Age</th>
        <th className='th' scope="col">Role</th>
        <th className='th' scope="col">Project</th>
        <th className='th' scope="col">Mobile</th>
        <th className='th' scope="col">Email</th>
        <th className='th' scope="col">Options</th>
        </tr>
    </thead>
    <tbody>
    { 
                   data.map((e,i)=>{
                      return( 
                 <tr>
                   
                          
                            <th scope="row" className='align'key={i}>{i+1}</th>
                            <img className='images' src={e.image}/>
                            <td className='align'>{e.name}</td>
                            <td className='align'>{e.age}</td>
                            <td className='align'>{e.role}</td>
                            <td className='align'>{e.project}</td>
                            <td className='align'>{e.mobile}</td>
                            <td className='align'>{e.email}</td>
                            
                            <td className='align'>
                                <button className="btn btn-primary" onClick={()=>handleEdit(e._id)}>Edit</button>
                                
                                 &nbsp;&nbsp; <button className="btn btn-danger" onClick={()=>handleDelete(e._id)}>Delete</button></td>
                               

                   
                        </tr>
            )})}
            </tbody>
            </table>
        </div>
  )
}

export default All