import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CreatePost from '../../Component/CreatePost/CreatePost'
import PostOption from '../../Component/PostOption/PostOption'
import { useQuery } from '@tanstack/react-query'

export default function Home() {

  // let [postsList, setPosts] = useState([])
  // useEffect(() => { getAllPosts() }, [])
  let [pageNumber , setPageNumber] = useState(1)
  
  let { data, isLoading, isError, error, refetch } = useQuery({

    queryKey: ['posts' ,pageNumber],
    queryFn: getAllPosts

  })
  console.log(data?.data.posts);
  let postsList = data?.data.posts

  async function getAllPosts() {
    return await axios.get(`https://linked-posts.routemisr.com/posts?limit=50&sort=-createdAt&page=${pageNumber}`, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    // if (data.message == 'success') {
    //   setPosts(data.posts)
    // }
  }
  if (isError) {
    return <h2>{error}</h2>

  }
  return (
    <div className='w-3/4 mx-auto'>

      <CreatePost refetch={refetch} />

      {isLoading && (
        <div className="text-center py-5 text-gray-500">Loading posts...</div>
      )}

      {isError && (
        <div className="text-center py-5 text-red-600">
          Error: {error.message}
        </div>
      )}

      {postsList?.map((post) => {
        let { _id, body, image, user: { name, photo }, createdAt, comments } = post
        return (
          <div key={_id} className='cardItem p-3 m-3 rounded-3xl bg-white'>


            <div className='flex justify-between items-center'>

              <div className="flex items-center gap-4">
                <img className="w-10 h-10 rounded-full" src={photo} alt="" />
                <div className="font-medium dark:text-white">
                  <div>{name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{new Date(createdAt).toDateString()} {new Date(createdAt).toLocaleTimeString()}</div>
                </div>
              </div>
              <PostOption postId={_id} refetch={refetch} />
            </div>


            <p className='text-zinc-700 my-5'>{body}</p>
            <img src={image} className='w-full rounded-2xl' alt={body} />
            <div className='flex justify-between py-5'>
              <h2>{comments.length} comments</h2>
              <Link to={'/PostDetails/' + _id} className='text-blue-600'>See Post Details</Link>
            </div>

            {comments.length > 0 &&
              <div className='bg-gray-200 rounded-2xl my-5'>
                <div className='cardItemAvatar p-3 rounded-2xl'>
                  <div className="flex items-center gap-4">
                    <img className="w-10 h-10 rounded-full" src={comments[comments.length - 1].commentCreator.photo} alt="" />
                    <div className="font-medium dark:text-white">
                      <div>{comments[comments.length - 1].commentCreator.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{new Date(comments[comments.length - 1].createdAt).toDateString()} {new Date(comments[comments.length - 1].createdAt).toLocaleTimeString()}</div>
                    </div>
                  </div>


                </div>
                <h3 className='p-3'>{comments[comments.length - 1].content}</h3>


              </div>}


          </div>
        )
      })}
          {/* pagenation  */}
      <nav aria-label="Page navigation example">
        <ul className="inline-flex fixed bottom-2.5 start-1/2  -translate-1/2 -space-x-px text-sm">
          <li>
            <a  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500
             bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700
              dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
          </li>

          {Array.from({length:10}).map((el , index)=>{

            return   <li>
            <a  onClick={(e)=>{setPageNumber(e.target.innerHTML)}} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300
             hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
              dark:hover:bg-gray-700 dark:hover:text-white">{index+1}</a>
          </li>
          })}
        
          <li>
            <a  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border
             border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800
              dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
