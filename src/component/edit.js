import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import env from "react-dotenv";
import { AiFillCamera } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Edit() {
  useEffect(() => {
    getData();
  }, []);

  const navigate = useNavigate();
  let params = useParams();

  const handleImage=(e)=>{ 
    if(e.target.files[0].size <= 10356302){

    setImage(URL.createObjectURL(e.target.files[0]))
    setImg(e.target.files[0])
    }else{
      toast.error("Image size should be less than 10mb")
    }
  }
 

  const getData = async () => {
    let res = await axios.get(`https://crud-app-7.herokuapp.com/get/${params.id}`);
    let data = res.data;
    setName(data.name);
    setAge(data.age);
    setRole(data.role);
    setProject(data.project);
    setMobile(data.mobile);
    setEmail(data.email);
    setImage(data.image);
    setImg(data.image);
  };

  const [image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
  );
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [role, setRole] = useState();

  const [project, setProject] = useState();
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState();
  const [img, setImg] = useState();
  const [msg, setMsg] = useState();

  const formdata = new FormData();

  formdata.append("name", name);
  formdata.append("age", age);
  formdata.append("role", role);

  formdata.append("project", project);
  formdata.append("mobile", mobile);
  formdata.append("image", img);
  formdata.append("email", email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = toast.loading("Updating...")

    let res = await axios.post(
      `https://crud-app-7.herokuapp.com/editing/${params.id}`,
      formdata
    );

    if (res.data.statusCode === 200) {
      navigate("/all");
      //  setTimeout(()=> toast.update( { render: "posted successfully", type: "info",icon:'👍', isLoading: false ,closeButton:true,autoClose:true}),1000)
    setTimeout(()=>toast.info("Updated successfully", {icon:'👍'}),500)
      } else {
      setMsg(res.data.message);
    }
  };
  return (
    <div className="mains">
          <ToastContainer  />
      <label className="both">
        <img src={image} className="img" />
      </label>
      <label class="custom-file-upload ">
        <AiFillCamera size={35} />
        Add profile
        <input
          type="file"
          onChange={handleImage}
          accept="image/jpg ,image/jpeg, image/png"
          required
        />
      </label>

      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            value={name}
            maxLength={20}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Employee Name"
            required
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Age</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputPassword1"
            value={age}
            maxLength={2}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter Employee Age"
            required
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Role</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            value={role}
            maxLength={20}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter Employee Role"
            required
          />
        </div>

        <div class="form-group">
          <label for="exampleInputEmail1">project</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            value={project}
            maxLength={20}
            onChange={(e) => setProject(e.target.value)}
            placeholder="Enter Employee Current project"
            required
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Mobile Number</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            value={mobile}
            maxLength={10}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter Employee Phone Number"
            required
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            value={email}
            maxLength={30}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Employee Email address"
            required
          />
        </div>
        <p style={{ color: "red" }}>{msg}</p>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Edit;
