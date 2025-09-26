import React, { useContext, useRef } from 'react'
import { UserContext } from '../Context/UserContext'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function creatPost({refetch}) {
    let { user } = useContext(UserContext)
    let {register,handleSubmit} = useForm()
    let imgFile =useRef()

    async function createPostFunc(obj){
        try {
        let formdata=new FormData()
        formdata.append("body", obj.body) //body
        formdata.append("image" ,imgFile.current.files[0] )  // image

        let {data} =await axios.post("https://linked-posts.routemisr.com/posts", formdata ,{ headers:{
            token:localStorage.getItem("token")}
        })
    
    if (data.message === "success") {
        toast.success("Post Created")
        refetch()
      } else {
        toast.error("Something went wrong, please try again ")
      }
    } catch (err) {
      toast.error(err.response?.data?.message)
    }
                // if (data.message == "success") {
                //     toast.success("post Created")
                //     // setTimeout(()=> { 
                //     //     window.location.reload()
                //     // },500)
                //     refetch()
                // } 
               
                    
    }
   

        return (
        <form onSubmit={handleSubmit(createPostFunc)} className='p-5 bg-white rounded-4xl '>
            <h2>Post Somthing</h2>

            <div className='m-6 flex justify-between items-center '>
                <img className="w-10 h-10 rounded-full" src={user?.photo} alt={user?.name} />
                <div className=" w-3/4 ">
                    <input {...register("body")} type="text" id="body" className="w-full bg-gray-50 border border-gray-300
                     text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5
                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                       dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Body ' />
                </div>
                
                    <label htmlFor="choosePhoto"><i className="fa-regular fa-camera fa-2x text-blue-500"></i></label>
                    <input ref={imgFile} type='file' hidden id="choosePhoto"></input>

            </div>
            <button type="submit" className="focus:outline-none w-full text-white bg-purple-700 hover:bg-purple-800 
            focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2
             dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Post</button>



        </form>
    )
}
