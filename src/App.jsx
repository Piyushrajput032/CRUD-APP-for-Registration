
// import { useEffect ,useState} from 'react';
import './App.css'
import Login from './component/Login';


function App() {
  // const [userlist,setUserList]=useState([])
  // useEffect(()=>{
  //   fetch("http://localhost:8081/authors")
  //   .then(res=>res.json())
  //   .then(data=>setUserList(data))
  // })
  // console.log(userlist)
  return (
    <div className="App ">
      <div className='flex items-center justify-center'>
      <Login/>

      </div>
      
    </div>
  );
}
export default App;
