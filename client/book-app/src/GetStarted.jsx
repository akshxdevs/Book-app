import { useNavigate } from "react-router-dom";

export const GetStarted = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/login")
    } 
    return (
        <div>
            <h1>Book App</h1>
            <button onClick={handleClick}>Get Started</button>
        </div>
    );
}