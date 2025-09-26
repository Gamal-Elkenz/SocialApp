import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function PostDetails() {


    let { id } = useParams()
    let { data ,isLoading }=useQuery({
            queryKey:["postDetails" , id],
            queryFn:getPostDetails
    })
    //   let [post, setPost] = useState(null)
    // useEffect(() => {
    //     getPostDetails()
    // }, [])

  
    async function getPostDetails() {
    return await axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
            headers: {
                token: localStorage.getItem('token')
            }

        })
        // setPost(data.post)
        // console.log(data);

 
    }
        let post =data?.data.post

    return (
        <div>
            {isLoading ? <h3>loading</h3> :
            <div className='cardItem p-3 m-3 rounded-3xl bg-white'>
                    <div className='crdBody'>
                        <div className='cardItemAvatar p-3 rounded-2xl'>
                            <div className="flex items-center gap-4">
                                <img className="w-10 h-10 rounded-full" src={post.user.photo} alt="" />
                                <div className="font-medium dark:text-white">
                                    <div>{post.user.name}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{new Date(post.createdAt).toDateString()} {new Date(post.createdAt).toLocaleTimeString()}</div>
                                </div>
                            </div>
                            <p className='text-zinc-700 my-5'>{post.body}</p>
                            <img src={post.image} className='w-full rounded-2xl' alt={post.body} />
                        </div>

                    </div>
                    <div className='cardFooter mt-5'>
                        <div className='flex justify-between py-5'>
                            <h2>{post.comments.length} comments</h2>

                        </div>
                    </div>
                    {post.comments.length > 0 &&

                        <div className='bg-gray-200 rounded-2xl my-5'>

                            {post.comments.map((comment) => {

                                return (
                                    <div key={comment._id} className='my-3 p-1 bg-white w-3/4 mx-auto rounded-2xl'>
                                        <div className='cardItemAvatar p-3   rounded-2xl'>
                                            <div className="flex items-center  gap-4">
                                                <img className="w-10 h-10 rounded-full" src={comment.commentCreator.photo} alt="" />
                                                <div className="font-medium dark:text-white">
                                                    <div>{comment.commentCreator.name}</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">{new Date(comment.createdAt).toDateString()} {new Date(comment.createdAt).toLocaleTimeString()}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <h3 className='p-3'>{comment.content}</h3>
                                    </div>
                                )

                            })}


                        </div>}

                </div>
            }
        </div>



    )
}
