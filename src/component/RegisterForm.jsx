import { useState } from "react";
import './RegisterForm.css';
import {  useNavigate } from "react-router-dom";


function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [uploadStatus,setUploadStatus]=useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const dates=new Date();
    fetch("http://localhost:8081/register",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        first_name:firstName,
        last_name:lastName,
        mobile_number:mobileNumber,
        password:password,
        profile_picture:profilePicture,
        created_date:dates,
        created_by:firstName,
        updated_date:dates,
        updated_by:firstName,
      })
    }).then((response)=>{
      if(!response.ok){
        throw new Error('Network response was not ok')
      }
      alert('Data saved t MySQL database')
      navigate('/')
    }).catch(error=>{
      console.error('There was a problem saving the data to MySQL database:', error);
    })
    setTimeout(()=>{setFirstName("");
    setLastName("");
    setMobileNumber("");
    setPassword("");
    setProfilePicture("");
  },2000)
  

    // TODO: Submit form data to backend or S3 bucket
  };
  const imageHandler=(event)=>{
    const file=event.target.files[0];
    const formData=new FormData();
    formData.append('image',file)
    fetch('http://localhost:8081/api/image',{
      method:'POST',
      body:formData,
      headers:{
        'Accept':'multipart.form-data',

      },
      credentials:'include'
    }).then(res=>res.json())
    .then(res=>setUploadStatus(res.msg))
    .cathc(error=>console.error(error))
  }
  return (
    <div className="container bg-gradient-to-br from-purple-400 to-blue-700 mt-5 mb-5 ">
      <h1 className="font-bold mb-4">User Registeration</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group text-xl">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            placeholder="Enter first name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div className="form-group text-xl">
          <label htmlFor="lastName" >Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            placeholder="Enter last name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
        <div className="form-group text-xl">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="tel"
            className="form-control"
            id="mobileNumber"
            placeholder="Enter mobile number"
            pattern="[0-9]{10}"
            
            value={mobileNumber}
            onChange={(event) => setMobileNumber(event.target.value)}
          />
        </div>
        <div className="form-group text-xl">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            value={password}
            autoComplete={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="form-group text-xl">
          <label htmlFor="profilePicture">Profile Picture</label>
          <h6>{uploadStatus}</h6>
          <input
            type="file"
            className="form-control-file"
            id="profilePicture"
            accept="image/*"
            name="image"
            onChange={imageHandler}
            // onChange={(event) => setProfilePicture((event.target.files[0]).toString())}
          />
          
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
}
export default RegisterForm;
