import React from 'react'
import { createContext,useState,useContext} from 'react'
import {authDataContext} from './AuthContext'
import { useEffect } from 'react'
import axios from 'axios'

export const adminDataContext = createContext()
const AdminContext = ({children}) => {

  const [adminData, setadminData] = useState(null)
  let {serverUrl} =useContext(authDataContext)

  const getAdmin = async () => {
     
     try {
      let result = await axios.get(serverUrl + "/api/user/getadmin",{withcredentials:true})

     setadminData(result.data)
     console.log(result.data)
     } catch (error) {
       setadminData(null)
       console.log(error)

     }
  }
  
  useEffect(() => {
    getAdmin()
  
    
  }, [])
  

  let value = {
  adminData, setadminData,getAdmin
  }
  
  return (
    <div>
      <adminDataContext.Provider value={value}>
        {children}
    </adminDataContext.Provider>
    </div>
  )
}

export default AdminContext
