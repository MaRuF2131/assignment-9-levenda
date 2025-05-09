import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../dataFetch/dataFetch'

 function handlelogout({nextnavigate}) {
    const navigate=useNavigate()
     const {user}=useContext(DataContext) 
     const saveduser = JSON.parse(localStorage.getItem('user'));
     
    useEffect(() => {
      if(saveduser===null ||saveduser===undefined){
          navigate('/login',{state:{status:nextnavigate}})
      }
    },[user])
}

export default handlelogout