import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import * as Zod from 'zod'

const schema = Zod.object({
  name: Zod.string().nonempty("Name is Required").min(3, "Name Must be more 3 Char ").max(20, "Name Must be less 3 Char"),
  email: Zod.string().nonempty("Email is Required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, " invalid Email"),
  password: Zod.string().nonempty("Password is Required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "invaild password"),
  rePassword: Zod.string().nonempty("rePassword is Required"),
  gender: Zod.string().nonempty("gender is Required").regex(/^(male|female)$/, "invalid gender"),
  dateOfBirth: Zod.coerce.date().refine((val) => {
    let nowDate = new Date().getFullYear()
    let DateOfBirth = val.getFullYear()
    return (nowDate - DateOfBirth) >= 16
  }, "Date of birth is invalid  ")

}).refine((data) => {

  return data.password == data.rePassword
}, { message: "Password must be Match Confirm Password ", path: ['rePassword'] })


export default function Register() {
  let navg = useNavigate()

  let { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  })
  // console.log(errors);
  async function handleRegister(value) {
    console.log(value);

    let response = await axios.post("https://linked-posts.routemisr.com/users/signup", value).catch((err) => {

      console.log(err);
      toast.error(err.response.data.error)

    })



    if (response?.data?.message == "success") {

      navg("/login")
    }

  }

  return (

    <div className='bg-amber-200 min-h-screen   w-full'>
      <h1 className='text-center bg-sky-100 p-2'>Register</h1>
      <form onSubmit={handleSubmit(handleRegister)} className="max-w-sm mx-auto">
        <div className="mb-3">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
          <input type="text" {...register("name")} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Gamal Elkenz" />
          {errors.name && <p className='text-red-700'>{errors.name.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" {...register("email")} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
          {errors.email && <p className='text-red-700'>{errors.email.message} </p>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input type="password" {...register("password")} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          {errors.password && <p className='text-red-700'>{errors.password.message} </p>}

        </div>

        <div className="mb-3">
          <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
          <input type="password" {...register("rePassword")} id="rePassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          {errors.rePassword && <p className='text-red-700'>{errors.rePassword.message} </p>}

        </div>

        <label htmlFor="gender" className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
        <select id="gender" {...register("gender")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="male">Male</option>
          <option value="female">Female</option>
          {errors.gender && <p className='text-red-700'>{errors.gender.message} </p>}

        </select>

        <div className="my-3">
          <label htmlFor="dateOfBirth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Of Birth</label>
          <input type="date" {...register("dateOfBirth")} id="dateOfBirth" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Gamal Elkenz" />
          {errors.dateOfBirth && <p className='text-red-700'>{errors.dateOfBirth.message} </p>}

        </div>


        <button type="submit" className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
      </form>


    </div>
  )
}
