import React from 'react'
import { auth, provider } from "../firebase-config"
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function Login({setIsAuth}) {

    let navigate = useNavigate()

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then(respose => {
            localStorage.setItem("isAuth", true)
            setIsAuth(true)
            navigate("/")
        })
    }

    return(
        <div className='text-center mt-5'>
            <p>Sign In With Google to Continue</p>
            <button 
                className='border-2 mt-5 p-3'
                onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    )
}