import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function UserHome() {
    
  const [greeting, setGreeting] = useState("");
  const [image,setImage]=useState('')
    const navigate=useNavigate();
    const location=useLocation();
    const {id,first_name,last_name,mobile_number}=location.state.content
 
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
    
  }, []);

  const handleLogout = () => {
    // handle logout logic here
    navigate('/login')
  };

  useEffect(()=>{
    fetch(`http://localhost:8081/api/image`,{
        method:'GET',
        headers:{
            "Content-Type":'application/json, charset=UTF-8',
            'Accept':'application/json,text/html'
        },
        credentials:'include'
    }).then(data=>data.json())
    .then((data)=>{
        setImage('http://localhost:8081/'+data.image)
        console.log(image)
    })
  })
// console.log(data)
  return (<div>
    {id>0?<div className="container bg-gradient-to-br from-cyan-400 to-pink-400 relative">
      <div className="greeting text-lg font-bold mb-2 text-center">
        <h3>
          {greeting}, {first_name}!
        </h3>
      </div>
      <div className="user-info items-center m-auto flex  justify-between">
        <div className="user-details">
          <h2 className="font-bold float-left">
            Name: <span>{first_name} {last_name}</span>
          </h2>
          <div>
            <h2 className="float-left mr-3">Mobile Number: {mobile_number}</h2>
          </div>
        </div>
        <div className="image-container">
            {
                
                image ?<img src={image} alt ="img"/> :<img src={"https://via.placeholder.com/150"} alt="user" />
            }
          
        </div>
      </div>

      <button
        className="logout bg-red-500 text-sm rounded-3xl m-2 absolute top-0 right-0"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>:<div><h1>No Data Found</h1></div>}
    </div>
  );
}

export default UserHome;
