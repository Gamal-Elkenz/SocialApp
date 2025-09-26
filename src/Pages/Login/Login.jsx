import axios from 'axios'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as Zod from 'zod'
import toast from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserContext } from '../../Component/Context/UserContext'
 

const schema = Zod.object({
  email: Zod.string().nonempty("Email is Required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, " invalid Email"),
  password: Zod.string().nonempty("Password is Required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "invaild password"),
  
})

export default function Login() {

    let {getUserData} =useContext(UserContext)
  let navg = useNavigate()
  let { register, handleSubmit ,formState:{errors}} = useForm({
    resolver:zodResolver(schema)
  })

  async function handleLogin(value) {
    console.log(value);

    let response = await axios.post("https://linked-posts.routemisr.com/users/signin", value).catch((err) => { 

      toast.error(err.response.data.error)
    }) 
    if (response?.data?.message == "success") {
      toast.success("Login Success")

        localStorage.setItem("token", response.data.token)
          getUserData()

      navg("/")
    }


  }

  return (

    <div className='bg-amber-200 min-h-screen'>
      <h1 className='text-center bg-sky-100 p-2'>Login</h1>

      <form onSubmit={handleSubmit(handleLogin)} className="max-w-sm  mx-auto ">

        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" {...register("email")} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
         {errors.email && <p className='text-red-700'>{errors.email.message} </p>}
 </div>

        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input type="password" {...register("password")} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          {errors.password && <p className='text-red-700'>{errors.password.message} </p>}

        </div>


        <button type="submit" className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
      </form>


    </div>
  )
}
