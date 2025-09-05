import { Navigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { HandleGetEmployees } from "../redux/Thunks/EmployeeThunk"
export const ProtectedRoutes = ({ children }) => {
    const { isAuthenticated } = useSelector((state) => state.employeereducer)
    const dispatch = useDispatch()

    // Removed automatic authentication check to prevent auto-login issues
    
    return (
        isAuthenticated ? children : <Navigate to="/" />
    )
}