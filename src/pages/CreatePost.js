import React, { useEffect, useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db, auth } from '../firebase-config'
import { useNavigate } from 'react-router-dom'

export default function CreatePost({isAuth}) {

    const [title, setTitle] = useState("")
    const [postText, setPostText] = useState("")
    let navigate = useNavigate()

    const postsCollectionRef = collection(db, "posts")
    const createPost = async () => {
        await addDoc(postsCollectionRef, 
            {title, 
            postText, 
            author:{
                name: auth.currentUser.displayName, 
                id:auth.currentUser.uid
            }
            })
        navigate("/")
    }

    useEffect(() => {
        if (!isAuth) {
            navigate("/login")
        }
    },[])

    return(
        <div className='flex flex-row justify-center w-[95%] border-2 bg-gray-300 my-5'>
            <div className='w-full text-center flex flex-col gap-5 mt-5 items-center p-3'>
                <h1 className='text-3xl'>Create a Post</h1>
                <div className='w-full flex flex-row gap-5 items-center justify-center'>
                    <label className='mr-3'>Title:</label>
                    <input className='w-3/4 p-2 mt-2 text-black' type="text" placeholder='Give a title'  onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className='w-full flex flex-row gap-5 items-center justify-center'>
                    <label className='mr-3'>Block:</label>
                    <textarea className="w-3/4 p-2 mt-2 text-black" placeholder='Fill block element' onChange={(e) => setPostText(e.target.value)}/>
                </div>
                <div className='w-full flex flex-row gap-5 items-center justify-center'>
                    <label>Categories:</label>
                    <input className="p-2" type="text" placeholder="separate by ;"/>
                </div>
                <button className='border-2 p-3 bg-green-900 text-gray-300 rounded-l hover:bg-green-800' onClick={createPost}>Submit Post</button>
            </div>
        </div>
    )
}