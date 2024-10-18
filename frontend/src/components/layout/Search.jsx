import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
const Search = () => {
  
    const [keyword,setKeyword]= useState("")
    const navigate = useNavigate();

    const submitHandler = (e)=>{
        e.preventDefault();
        if(keyword?.trim()){
            navigate(`/results?keyword=${keyword}`);
        }else{
            navigate(`/results`)
        }
    }
  return (

          <form className="d-flex" role="search" onSubmit={submitHandler}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            name='keyword'
            value = {keyword}
            onChange={(e)=>setKeyword(e.target.value)}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>

  )
}

export default Search