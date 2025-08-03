import {React, useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/authContext";
import axios from 'axios'
import { userDataContext } from "../context/UserContext";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";


const Login = () => {
  const navigate = useNavigate();
      let {serverUrl}=useContext(authDataContext)
      const [email, setEmail] = useState("")
      const [password, setPassword] = useState("")
      let {getCurrentUser} = useContext(userDataContext)

  const handleLogin =async (e) => {
      e.preventDefault()
      try {
        const result = await axios.post(serverUrl + '/api/auth/login',{
            email,password
        },{withCredentials:true})
        console.log(result.data);
        getCurrentUser()
        navigate("/");
      } catch (e) {
        console.log(e)
      }
    }

    const googleLogin = async () => {
          try {
            const response = await signInWithPopup(auth,provider);
            let user =response.user;
            let name = user.displayName;
            let email = user.email;
    
            const result = await axios.post(serverUrl + "/api/auth/googlelogin", {name,email}, {withCredentials: true});
            console.log(result.data);
          } catch (error) {
            console.log("Google Error");
            alert("Google login failed. Please try again.");
          }
        }

  return (
    <div className="bg-gradient-to-br from-[#eef1f5] to-[#dfe4ea] min-h-screen flex flex-col items-center px-4 py-6">
      {/* Header */}
      <div
        onClick={() => navigate("/")}
        className="w-full flex items-center gap-3 cursor-pointer mb-6"
      >
        <img className="w-10" src="/icons/logo.svg" alt="OneCart Logo" />
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
          Join OneCart and start shopping seamlessly
        </p>
      </div>

      {/* Form */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8" onSubmit={handleLogin}>
        <form className="flex flex-col gap-6">
          {/* Google Button */}
          <button
            type="button"
            onClick={googleLogin}
            className="flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 hover:text-blue-600 hover:border-blue-400 px-5 py-3 rounded-xl text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"
          >
            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white">
              <img src="/icons/search.png" alt="Google" className="w-4 h-4" />
            </span>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 text-gray-500 text-sm">
            <hr className="flex-grow border-gray-300" />
            OR
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Input Fields */}
          <div className="flex flex-col gap-4">
            
            <input
              type="email"
              placeholder="Email"
              required
              onChange={(e)=>setEmail(e.target.value)} value={email}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder-gray-400 transition-all"
            />
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e)=>setPassword(e.target.value)} value={password}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder-gray-400 transition-all"
            />
          </div>

          <button
            type="submit"
            className="bg-slate-700 hover:bg-slate-800 text-white py-3 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          >
            Login
          </button>
          <p className="flex gap-[6px] justify-center">Don't have an account? <span className="text-[#5555f6cf] text-[17px] font-semibold cursor-pointer" onClick={()=>navigate("/signup")}>Register</span></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
