import React,{useState} from 'react'
import '../add.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import env from 'react-dotenv';
import { AiFillCamera } from 'react-icons/ai';
function Add() {

const navigate = useNavigate()

 const[image ,setImage] = useState('https://png.pngtree.com/png-clipart/20200224/original/pngtree-businessman-avatar-icon-flat-style-png-image_5230185.jpg')
 const[name,setName] = useState()
 const[age,setAge] = useState()
 const[role,setRole] = useState()
 
 const[project,setProject] = useState()
 const[mobile,setMobile] = useState()
 const [email,setEmail] = useState()
 const[img,setImg] = useState('https://png.pngtree.com/png-clipart/20200224/original/pngtree-businessman-avatar-icon-flat-style-png-image_5230185.jpg')
 const [msg ,setMsg] = useState()

 const handleSubmit = async(e)=>{
    e.preventDefault()
     let res = await axios.post(`https://crud-app-7.herokuapp.com/add`,formdata)

    if(res.data.statusCode === 200){
      navigate('/')
    }else{
      setMsg(res.data.message)
    }
   
  }
  const handleImage=(e)=>{ 
    setImage(URL.createObjectURL(e.target.files[0]))
    setImg(e.target.files[0])
  }
  
  const formdata = new FormData()
  
  formdata.append('name',name)
  formdata.append('age',age)
  formdata.append('role',role)
  formdata.append('project',project)
  formdata.append('mobile',mobile)
  formdata.append('image',img)
  formdata.append('email',email)

  return (
<div className='mains'>

<label className='both'>
  <img src={image} className='img'/>
  </label>
  <label class="custom-file-upload "><AiFillCamera size={35}/>Add profile
  <input type='file' onChange={handleImage} accept='image/jpg ,image/jpeg, image/png' required/>
  </label>


  <form onSubmit={handleSubmit}>  
  <div class="form-group">
    <label for="exampleInputEmail1">Name</label>
    <input type="text" class="form-control" id="exampleInputEmail1" onChange={(e)=>setName(e.target.value)} maxLength={20} placeholder="Enter Employee Name" required/>
 </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Age</label>
    <input type='text' class="form-control" id="exampleInputPassword1" maxLength={2} onChange={(e)=>setAge(e.target.value)} placeholder="Enter Employee Age" required/>
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Role</label>
    <input type="text" class="form-control" id="exampleInputEmail1" maxLength={20} onChange={(e)=>setRole(e.target.value)} placeholder="Enter Employee Role" required/>
 </div>
 
 <div class="form-group">
    <label for="exampleInputEmail1">project</label>
    <input type="text" class="form-control" id="exampleInputEmail1" maxLength={20} onChange={(e)=>setProject(e.target.value)} placeholder="Enter Employee Current project" required/>
 </div>
 <div class="form-group">
    <label for="exampleInputEmail1">Mobile Number</label>
    <input type="text"  class="form-control" id="exampleInputEmail1" maxLength={10} onChange={(e)=>setMobile(e.target.value)} placeholder="Enter Employee Phone Number" required/>
 </div>
 <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" maxLength={30} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Employee Email address" required/>
 </div>
 <p style={{color:"red"}}>{msg}</p>
  <button type="submit" class="btn btn-primary" >Submit</button>
</form>
  </div>
  )
}

export default Add