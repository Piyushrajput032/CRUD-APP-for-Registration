
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import UserHome from './component/UserHome'
import App from './App'
import RegisterForm from './component/RegisterForm'
const Home = () => {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/userhome" element={<UserHome/>}/>
            <Route path="/register" element={<RegisterForm/>}/>

        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Home
