import React from 'react'
import { createContext } from 'react'

export const authDataContext = createContext()
function AuthContext({children}) {
   let serverUrl = "https://e-commerce-backend-4bsp.onrender.com"

    let value = {
        serverUrl
    }
  return (
    <div>
      <authDataContext.Provider value={value}>
        {children}
      </authDataContext.Provider>
    </div>
  )
}

export default AuthContext
