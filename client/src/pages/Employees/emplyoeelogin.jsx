import { useState, useEffect, useRef } from "react"
import { SignIn } from "../../components/common/sign-in.jsx"
import { useDispatch, useSelector } from "react-redux"
import { HandlePostEmployees, HandleGetEmployees } from "../../redux/Thunks/EmployeeThunk.js"
import LoadingBar from 'react-top-loading-bar'
import { useNavigate } from 'react-router-dom'
import { CommonStateHandler } from "../../utils/commonhandler.js"
import { User, Briefcase, ArrowLeft } from "lucide-react"

export const EmployeeLogin = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loadingbar = useRef(null)
    const EmployeeState = useSelector((state) => state.employeereducer)
    const [signinform, set_signinform] = useState({
        email: "",
        password: "",
    })

    // Clear form and authentication when component mounts
    useEffect(() => {
        set_signinform({
            email: "",
            password: ""
        })
        // Clear any existing authentication on page load
        handleLogout()
    }, [])

    const handlesigninform = (event) => {
        console.log("Employee Login - Form input changed:", event.target.name, event.target.value)
        CommonStateHandler(signinform, set_signinform, event)
    }

    const handlesigninsubmit = async (e) => {
        e.preventDefault();
        loadingbar.current.continuousStart();
        dispatch(HandlePostEmployees({ apiroute: "LOGIN", data: signinform }))
    }

    const handleLogout = () => {
        // Clear any stored authentication
        document.cookie = "EMtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem('EMtoken');
        sessionStorage.removeItem('EMtoken');
        // Reset form
        set_signinform({ email: "", password: "" });
        console.log("Employee authentication cleared");
    }


    const RedirectToDashbaord = () => {
        loadingbar.current.complete()
        navigate("/auth/employee/employee-dashboard/dashboard-data")
    }

    if (EmployeeState.error.status) {
        loadingbar.current.complete()
    }

    useEffect(() => {
        // Only redirect if user is authenticated (after manual login)
        if (EmployeeState.isAuthenticated) {
            RedirectToDashbaord()
        }
    }, [EmployeeState.isAuthenticated])

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
                        <Briefcase className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-gray-800">Employee Portal</span>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="employee-login-content">
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
                    image={"../../src/assets/Employee-Welcome.jpg"} 
                    handlesigninform={handlesigninform} 
                    handlesigninsubmit={handlesigninsubmit} 
                    targetedstate={EmployeeState} 
                    statevalue={signinform} 
                    redirectpath={"/auth/employee/forgot-password"}
                    formId="employee-login-form"
                />
            </div>
        </div>
    )
}