import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../toolkit/api/AuthApi';
import { useSelector } from 'react-redux';
import toast from "react-hot-toast";
const Register = () => {
    const navigate = useNavigate()
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [register, { isLoading, error, data }] = useRegisterMutation();


  const {isAuthenticated} = useSelector((state)=>state.auth)  


  useEffect(()=>{
  
    if(isAuthenticated) {
      navigate('/')
    }
      if(error){
          toast.error(error?.data?.message)
      }
      if(data?.success){
        navigate("/login")
      }
  },[error,isAuthenticated,data?.success])


  const submitHundler = (e) => {
    e.preventDefault();
    const signUpData = {
      name,
      email,
      password,
    };
    register(signUpData);
    toast.success("please check you Email Verification !")
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name] : e.target.value });
  };
  return (
    <div className="row wrapper d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>

      <div class="col-10 col-lg-5">
        <form class="shadow rounded bg-body p-5" onSubmit={submitHundler}>
          <h2 class="mb-4">Register</h2>

          <div class="mb-3">
            <label htmlFor="name_field" class="form-label">
              Name
            </label>
            <input
              type="text"
              id="name_field"
              class="form-control"
              name="name"
              value={name}
              onChange={onChange}
            />
          </div>

          <div class="mb-3">
            <label for="email_field" class="form-label">
              Email
            </label>
            <input
              type="email"
              id="email_field"
              class="form-control"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div>

          <div class="mb-3">
            <label for="password_field" class="form-label">
              Password
            </label>
            <input
              type="password"
              id="password_field"
              class="form-control"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>

          <button
            id="register_button"
            type="submit"
            class="btn w-100 py-2"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "REGISTER"}
          </button>
        </form>
      </div>
    </div>

 
  )
}

export default Register
