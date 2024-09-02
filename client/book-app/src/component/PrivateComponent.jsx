import { Outlet, Navigate } from "react-router-dom";

export const PrivateComponent = () =>{
    const auth  = localStorage.getItem("token");
    return auth ? <Outlet/> : <Navigate to="signup"/>
}