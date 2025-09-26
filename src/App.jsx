import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Component/Layout/Layout'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Notfound from './Component/Notfound/Notfound'
import Home from './Pages/Home/Home'
import { Toaster } from 'react-hot-toast'
import PostDetails from './Pages/PostDetails/PostDetails'
import { UserContextProvider } from './Component/Context/UserContext'
import EditProfile from './Component/EditProfile/EditProfile'
import Profile from './Component/Profile/Profile'
import { ProtectRouting } from './Component/ProtectRouting/ProtectRouting'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function App() {
  let queryclient =new QueryClient({
    defaultOptions:{
      queries:{
        gcTime:1000,
        retry:2
      }
    }
  })

  let routes=createBrowserRouter([

    {path:"/",element: <Layout/>,children:[
      {index:true , element: <ProtectRouting><Home /></ProtectRouting>},
      {path:"PostDetails/:id", element: <ProtectRouting> <PostDetails/> </ProtectRouting> },
      {path:"Profile", element: <ProtectRouting><Profile/></ProtectRouting> },
      {path:"EditProfile", element: <ProtectRouting><EditProfile/></ProtectRouting> },
      {path:"login", element: <Login/>},
      {path:"register", element: <Register />},
      {path:"*", element: <Notfound />},
      
    ]}
  ])

  return (
    <>
      <QueryClientProvider client={queryclient} >

      <UserContextProvider>
         <RouterProvider router={routes}/>
      <Toaster></Toaster>
        </UserContextProvider>
        <ReactQueryDevtools></ReactQueryDevtools>
      </QueryClientProvider>

      
    </>
  )
}
