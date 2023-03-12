import React, { useEffect, useState } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../firebase-config'

export default function Home() {
    const [postList, setPostList] = useState([])
    const postsCollectionRef = collection(db, "posts")

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef)
            console.log(data.docs.map(doc => ({...doc.data(), id: doc.id})))
            setPostList(data.docs.map(doc => ({...doc.data(), id: doc.id})))
        }

        getPosts()
    }, [])

    let html = postList.map(post => <h1>{post.title}</h1>)
    return(
        <div></div>
    )
}