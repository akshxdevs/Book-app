import { useState } from "react";
import "../App.css";
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling

export const Login  = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [showError,setShowError] = useState(false);
    const navigate = useNavigate();
    const Email = email.toLowerCase();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        if (!email||!password) {
            setShowError(true);
            return;
        }
        try {
            const response = await fetch("http://localhost:3000/auth/login",
            {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({email:Email,password}),
            }
        );
        
        if (response.ok) {
            const data = await response.json();
            const userId = data.user._id
            toast.success("Login Sucessfull");
            localStorage.setItem("userId",userId);
            localStorage.setItem("username",email)
            localStorage.setItem("token",data.token);
            navigate('/home');
        } else {
            toast.error(response.error);
        }
        } catch (error) {
            toast.error("An error occured while registering user:"+ error.toSrting());
        }
    

    }
    return (
        <div className="SignupContainer">
        <form action="" onSubmit={(e)=>handleSubmit(e)} >
            <input type="text" placeholder="Enter your email.." onChange={(e)=>setEmail(e.target.value)} />
            <input type="text" placeholder="Enter your password.." onChange={(e)=>setPassword(e.target.value)} />
            <button type="submit">Login</button>
            <Link className="forgot-pwd" to="/forgotPassword">Forgot Password</Link>
            <p className="signup-link">dont have an Account?? <Link style={{
                color:"black",
            }} to="/signup">Signup</Link> </p>
        </form>
        {showError && (
            <span className="fill-fields-error">Please Fill all the fields</span>
        )}
        <ToastContainer/>
        </div>
    );
}

