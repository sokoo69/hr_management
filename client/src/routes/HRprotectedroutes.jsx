import { HandleGetHumanResources } from "../redux/Thunks/HRThunk.js"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { Loading } from "../components/common/loading.jsx"

export const HRProtectedRoutes = ({ children }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const HRState = useSelector((state) => state.HRReducer)

    // Removed automatic authentication check to prevent auto-login issues

    if (HRState.isLoading) {
        return (
            <Loading />
        )
    }

    return (
        (HRState.isAuthenticated && HRState.isAuthourized) ? children : null
    )
}