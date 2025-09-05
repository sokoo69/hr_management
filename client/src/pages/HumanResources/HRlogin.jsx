import { SignIn } from "../../components/common/sign-in.jsx"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'
import { CommonStateHandler } from "../../utils/commonhandler.js"
import { HandleGetHumanResources, HandlePostHumanResources } from "../../redux/Thunks/HRThunk.js"
import { Users, Shield, ArrowLeft } from "lucide-react"

export const HRLogin = () => {
    const HRState = useSelector((state) => state.HRReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loadingbar = useRef(null)
    const [signinform, setsigninform] = useState({
        email: "",
        password: ""
    })

    // Clear form and authentication when component mounts
    useEffect(() => {
        setsigninform({
            email: "",
            password: ""
        })
        // Clear any existing authentication on page load
        handleLogout()
    }, [])

    const handlesigninform = (event) => {
        console.log("HR Login - Form input changed:", event.target.name, event.target.value)
        CommonStateHandler(signinform, setsigninform, event)
    }

    const handlesigninsubmit = (e) => {
        e.preventDefault();
        loadingbar.current.continuousStart();
        console.log("Submitting HR login with:", signinform);
        dispatch(HandlePostHumanResources({ apiroute: "LOGIN", data: signinform }))
    }

    const handleLogout = () => {
        // Clear any stored authentication
        document.cookie = "HRtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem('HRtoken');
        sessionStorage.removeItem('HRtoken');
        // Reset form
        setsigninform({ email: "", password: "" });
        console.log("HR authentication cleared");
    }

    if (HRState.error.status) {
        loadingbar.current.complete()
    }

    useEffect(() => {
        // Only redirect if user is authenticated (after manual login)
        if (HRState.isAuthenticated) {
            loadingbar.current.complete()
            console.log("HR Login successful, navigating to dashboard...")
            navigate("/HR/dashboard/dashboard-data")
        }
    }, [HRState.isAuthenticated])

    // Debug logging
    useEffect(() => {
        console.log("HR Login State:", HRState)
    }, [HRState])


    return (
        <div className="relative min-h-screen">
            <LoadingBar ref={loadingbar} />
            
            {/* Header with navigation */}
            <div className="absolute top-0 left-0 right-0 z-50 p-6">
                <div className="flex items-center justify-between">
                    <button 
                        onClick={() => navigate("/")}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="font-medium">Back to Home</span>
                    </button>
                    
                    <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm">
                        <Shield className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-gray-800">HR Admin Portal</span>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="hr-login-content">
                {/* Debug button - only show in development */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="absolute top-20 right-6 z-50">
                        <button 
                            onClick={handleLogout}
                            className="text-xs text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-lg transition-colors"
                        >
                            Clear Auth
                        </button>
                    </div>
                )}
                
                <SignIn 
                    image={"../../src/assets/HR-Welcome.jpg"} 
                    handlesigninform={handlesigninform} 
                    handlesigninsubmit={handlesigninsubmit} 
                    targetedstate={HRState} 
                    statevalue={signinform} 
                    redirectpath={"/auth/HR/forgot-password"}
                    formId="hr-login-form"
                />
            </div>
        </div>
    )
}