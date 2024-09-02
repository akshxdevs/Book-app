import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css"; 

import React, { useState } from "react";


const Signup = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [showError,setShowError] = useState(false);

    const Email = email.toLowerCase();
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!email||!password||!name) {
            setShowError(true);
            return;
        }
        try {
            const response = await fetch("http://localhost:3000/auth/signup",
            {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({name,email:Email,password}),
            }
        );
            if (response.ok) {
                const data  = await response.json();
                if (data.error) {
                    toast.warn("User already exist..");
                }else{
                    toast.success("Signed Sucessfully!!");
                    localStorage.setItem("token",data.token);
                }
            }else{
                console.error("Failed to register user:",response.status);
            }
        }catch (error) {
            toast.error("An error occured while registering user:"+ error.toSrting());
        }
    }

    return(
        <div className="SignupContainer">
        <form action="" onSubmit={(e)=>handleSubmit(e)} >
            <input type="text" placeholder="Enter youe name.." onChange={(e)=>setName(e.target.value)}/>
            <input type="text" placeholder="Enter your email.." onChange={(e)=>setEmail(e.target.value)} />
            <input type="text" placeholder="Enter your password.." onChange={(e)=>setPassword(e.target.value)} />
            <button type="submit">Signup</button>   
        </form>
        {showError && (
            <span className="fill-fields-error">Please Fill all the fields</span>
        )}
        
        <ToastContainer/>
        </div>
    );
}

export default Signup;