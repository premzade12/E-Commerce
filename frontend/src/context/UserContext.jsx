import React, { createContext,useContext,useState,useEffect } from 'react'
import { authDataContext } from './authContext'
import axios from 'axios'

export const userDataContext =createContext()
const UserContext = ({children}) => {
   const [userData, setuserData] = useState("")
   let {serverUrl} = useContext(authDataContext)

   const getCurrentUser = async (params) => {
        try {
            let result = await axios.get(serverUrl + "/api/user/getCurrentuser",{withCredentials:true})

            setuserData(result.data)
            
        } catch (error) {
            setuserData(null)
            console.log(error)
        }
      
    }

    useEffect(() => {
      getCurrentUser()
    }, [])
    

    let value= {
        userData, setuserData,getCurrentUser
    }
    
    
  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
        </userDataContext.Provider>
    </div>
  )
}

export default UserContext
