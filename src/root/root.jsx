import React from 'react'
import { createBrowserRouter ,RouterProvider } from 'react-router-dom'
import { lazy ,Suspense } from 'react'
import Registration from '../components/registration/registration'
import LoadingSpinner from '../mytoots/loading'
const AppDetails =lazy(()=>import('../components/appDetails/appDetails'))
const Home =lazy(()=>import('../components/home/home'))
const MainLeyout =lazy(()=>import('../components/mainLeyout/mainLeyout'))
const ErrorPage=lazy(()=>import('./errorpage/errorpage'))
const Login=lazy(()=>import('../components/login/login'))
const Contact=lazy(()=>import('../components/contact/contact'))
const MyProfile=lazy(()=>import('../components/profile/profile'))
const MyProfileEdit=lazy(()=>import('../components/profileEdit/profileEdit'))
const ResetPassword=lazy(()=>import('../components/resetPassword/resetPassword'))

const Approot=createBrowserRouter([
  {
    path:'/',
    Component:MainLeyout,
    children:[
        {
             path:'/',
             Component:Home,

        },
      {
        path:'/appDetails/:appname/:id',
        Component:AppDetails,
      },
      {
        path:"/login",
        Component:Login,
      },
      {
        path:"/contact",
        Component:Contact,
      },
      {
        path:"/registration",
        Component:Registration,
      },
      {
        path:"/profile/:name",
        Component:MyProfile,
      },
      {
        path:"/update-profile",
        Component:MyProfileEdit,
      },
      {
        path:'/password-reset',
        Component:ResetPassword,
      }

    ]


  },
  {
    path:'*',
    Component:ErrorPage,
  }
])

function root() {
  return (
    <Suspense fallback={<LoadingSpinner/>}>
      <RouterProvider router={Approot} />
    </Suspense>
  )
}

export default root