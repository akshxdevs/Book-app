import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ForgotPwd = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setShowError(true);
            return;
        }
        try {
            const response = await fetch("http://localhost:3000/auth/forgotpwd", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.toLowerCase(), password: password }),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success("Password reset successfully!!");
                navigate("/login")
            } else {
                toast.error("Error while resetting the password: " + data.error);
            }
        } catch (error) {
            toast.error("An error occurred while resetting the password: " + error.toString());
        }
    };

    return (
        <div className="SignupContainer">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter your email.." value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Enter your password.." value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Reset Password</button>
            </form>
            {showError && <span className="fill-fields-error">Please fill in all the fields</span>}
            <ToastContainer />
        </div>
    );
};
