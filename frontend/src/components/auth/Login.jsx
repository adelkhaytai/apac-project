import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLoginMutation } from "../../toolkit/api/AuthApi";
const Login = () => {
    
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading, error, data }] = useLoginMutation();

  const {isAuthenticated} = useSelector((state)=>state.auth)  



    useEffect(()=>{
      if(isAuthenticated){
        navigate('/')
      }
        if(error){
            toast.error(error?.data?.message)
        }
    },[error,
      isAuthenticated

    ])


  const submitHandler = (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };
    login(loginData);
  };

  
  
  return (
<div className="row wrapper d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
  <div className="col-10 col-lg-5">
    <form className="shadow rounded bg-body p-5" onSubmit={submitHandler}>
      <h2 className="mb-4">Login</h2>
      <div className="mb-3">
        <label htmlFor="email_field" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email_field"
          className="form-control"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          defaultValue
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password_field" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password_field"
          className="form-control"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          defaultValue
        />
      </div>
     
      <button
        id="login_button"
        type="submit"
        className="btn w-100 py-2"
        disabled={isLoading}
      >
        {isLoading ? "Authentication..." : "LOGIN"}
      </button>
      <div className="my-3">
        <a href="/register" className="float-end">
          New User?
        </a>
      </div>
    </form>
  </div>
</div>

  )
}

export default Login
