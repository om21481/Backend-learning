import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import axios from "axios";

const Users = () =>{

    const [credentials, setCredentials] = React.useState({
        username: undefined,
        password: undefined,
      });

    const navigate = useNavigate();
    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        console.log(e.target.id, e.target.value);
      };
    const handleClick = async (e) => {
        e.preventDefault();

        try {
          const res = await axios.post("/auth/login", credentials);
          navigate("/")
          console.log("Success");
        } catch (err) {
          console.log(err);
        }
      };


    return(
        <>
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}

        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
        />
        <button  onClick={handleClick} >
          Login
        </button>
        </>
    )
}

export default Users;