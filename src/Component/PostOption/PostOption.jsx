import axios from 'axios';
import { initFlowbite } from 'flowbite'
import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function PostOption({ postId , refetch}) {

    

        let {register ,handleSubmit} =useForm()
        let fileInput= useRef()
    //console.log(postId);
    useEffect(() => {
        initFlowbite()
    }, [])

    async function handleDeletePost() {
        let { data } = await axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`, {
            headers: { token: localStorage.getItem('token') }
        })
        console.log(data);
        if (data.message == 'success') {
            toast.success("post deletd")
        }
        // setTimeout(() => {
        //     window.location.reload()
        // }, 500)
        refetch()
    }

    async function handleUpdatePost(objValue) {
        // console.log(objValue);
        // console.log(fileInput.current);
        let formdata =new FormData()
        formdata.append("body",objValue.body)
        formdata.append("image" ,fileInput.current.files[0])

        let {data}=await axios.put(`https://linked-posts.routemisr.com/posts/${postId}`,formdata,{headers:{
            token:localStorage.getItem("token")
        }})
            
        if (data.message == 'success') {
            toast.success("post updated")
            // setTimeout(()=>{
            //     window.location.reload()
            // } ,500)
            refetch()

            
        }
        
    }

    return (
        <>
        
            <button id="dropdownMenuIconHorizontalButton" data-dropdown-toggle={"dropdown" + postId} className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
            </button>

            <div id={"dropdown" + postId} className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg 
                  shadow-sm w-30 dark:bg-gray-700 dark:divide-gray-600">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                    <li data-modal-target="default-modal" data-modal-toggle="default-modal" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        <i className="fa-solid fa-pen mr-2 text-green-600 "></i> Update</li>

                    <li onClick={handleDeletePost} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        <i className="fa-solid fa-trash mr-2 text-red-600 "></i> Delete</li>
                </ul>
            </div>

            <div id="default-modal" tabindex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Update Post
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                       
                     <form onSubmit={handleSubmit(handleUpdatePost)}>

                           <div className="p-4 md:p-5 space-y-4">
                            <div className=" w-full ">
                                <input {...register("body")} type="text" id="body" className="w-full bg-gray-50 border border-gray-300
                                     text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5
                                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                       dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Body ' />
                            </div>
                        
                            <div className="flex items-center justify-center w-full ">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input ref={fileInput}  id="dropzone-file" type="file" className="hidden" />
                                </label>
                            </div>
                        </div>
                        
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button data-modal-hide="default-modal" type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Post</button>
                            <button data-modal-hide="default-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
                        </div>
                     </form>

                    </div>
                </div>
            </div>

        </>
    )
}
