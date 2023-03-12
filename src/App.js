import './App.css';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import { auth } from "./firebase-config"
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import { useState } from 'react';
import { signOut } from 'firebase/auth';


function App() {

  const [isAuth, setIsAuth] = useState(false)

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = "/login"
    })
  }

  return (
    <Router>
      <div className='w-full mt-5 mb-5 min-h-screen container mx-auto flex flex-col items-center border-2 bg-white'>
        <nav className='flex flex-row justify-between bg-transparent p-5 w-full'>
          <div className='ml-[1%]'>
            <h1 className='title text-3xl mt-5'>Code <span className='title text-pink-500'>{'while('}</span><span className='title text-blue-300'>true</span><span className='title text-pink-500'>{'){'}</span></h1>
            <h3 className='text-gray-500'>Code that runs forever</h3>
          </div>
          <div className='mr-[1%] flex flex-row gap-5 mt-5 p-5'>
            <Link to="/">Home</Link>
            {isAuth ? 
            <div>
              <Link to="/createpost">Create Post</Link>
              <button className='border-2 ml-5' onClick={signUserOut}>Sign Out</button>
            </div>:
            <Link to="/login">Login</Link>
            }
          </div>
        </nav>
        <img src="img/bg.png" className='w-[95%]'></img>
        <Routes>
          <Route path="/" element ={<Home />} />
          <Route path="/createpost" element ={<CreatePost isAuth={isAuth}/>} />
          <Route path="/login" element ={<Login setIsAuth={setIsAuth}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
