import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
    const navigate=useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:8081/login",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        first_name:name,
        password:password,
      })
    }).then(async(response)=>{
      if(!response.ok){
        throw new Error('Network response was not ok')
      }
      const content= await response.json()
      console.log(content)
      navigate('/userhome',{state:{content}})
      
    }).catch(error=>{
      console.error('There was a problem saving the data to MySQL database:', error);
    })
    setName("")
    setPassword("")
  };

  return (
    <div className="container bg-gradient-to-br from-purple-400 to-blue-200 mt-5 mb-5 ">
    <h1 className="font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">User Name</label>
          <input
            type="text"
            id="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className={"bg-blue-400 m-3"} type="submit">Login</button>
      </form>
      <div>
        <p>New user? <NavLink  to="/register">Create an account</NavLink></p>
      </div>
    </div>
  );
}

export default Login;