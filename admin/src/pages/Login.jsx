import {React,useState,} from "react";
import logo from "../assets/logo.svg";
import axios from 'axios'
import { useContext } from "react";
import { authDataContext } from "../context/AuthContext";


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let {serverUrl} = useContext(authDataContext)
  
  const AdminLogin = async (e) => {
    e.preventDefault()
    try {
        const result= await axios.post(serverUrl + '/api/auth/adminLogin',{email,password},{withCredentials:true})
        console.log(result.data)
    } catch (error) {
        console.log(error)
    }
  }
  


  return (
    <div className="bg-gradient-to-br from-[#eef1f5] to-[#dfe4ea] min-h-screen flex flex-col items-center px-4 py-6">
      <div className="w-full flex items-center gap-3 cursor-pointer mb-6">
        <img className="w-10" src={logo} alt="OneCart Logo" />
        <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
          OneCart
        </h1>
      </div>

      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-900">
          Create Your Account
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Welcome to OneCart, Apply to Admin Login
        </p>
      </div>

      {/* Form */}
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8"
        
      >
        <form onSubmit={AdminLogin} className="flex flex-col gap-6">
          
          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder-gray-400 transition-all"
            />
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder-gray-400 transition-all"
            />
          </div>

          <button
            type="submit"
            className="bg-slate-700 hover:bg-slate-800 text-white py-3 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
