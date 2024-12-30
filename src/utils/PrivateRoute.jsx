import { useState } from 'react'
import Cookies from "js-cookies"
import { Outlet, Navigate } from "react-router-dom"
const PrivateRoute = () => {
    // eslint-disable-next-line no-unused-vars
    const [token, setToken] = useState(Cookies.getItem("token"))
    return (
        <>
            {token != null ? <Outlet /> : <Navigate to="/login" />}
        </>
    )
}

export default PrivateRoute