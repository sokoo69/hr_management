import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"
import { HRdashboardSidebar } from "../../components/ui/HRsidebar.jsx"
import { Outlet } from "react-router-dom"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { Bell, Search, User, Settings, LogOut } from "lucide-react"
import { useDispatch } from "react-redux"
import { HandleGetHumanResources } from "../../redux/Thunks/HRThunk.js"

export const HRDashboard = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const pathArray = location.pathname.split("/")

    useEffect(() => {
        navigate(`/HR/dashboard/${pathArray[pathArray.length - 1]}`)
    }, [])

    const handleLogout = () => {
        // Clear authentication tokens
        document.cookie = "HRtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem('HRtoken');
        sessionStorage.removeItem('HRtoken');
        
        // Dispatch logout action to clear Redux state
        dispatch(HandleGetHumanResources({ apiroute: "LOGOUT" }));
        
        // Navigate to home page
        navigate("/");
        
        console.log("HR logout successful");
    }

    console.log("this is the current path location", location)


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <SidebarProvider>
                <div className="flex h-screen">
                    {/* Sidebar */}
                    <div className="relative">
                        <HRdashboardSidebar />
                        <div className="absolute top-4 left-4 z-50">
                            <SidebarTrigger className="bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-200" />
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        {/* Top Navigation Bar */}
                        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
                            <div className="px-6 py-4">
                                <div className="flex items-center justify-between">
                                    {/* Left side - Welcome message */}
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                                                <User className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h1 className="text-xl font-bold text-gray-900">HR Admin Dashboard</h1>
                                                <p className="text-sm text-gray-600">Welcome back! Here's what's happening today.</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right side - Actions */}
                                    <div className="flex items-center space-x-4">
                                        {/* Search */}
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <input
                                                type="text"
                                                placeholder="Search..."
                                                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-64"
                                            />
                                        </div>

                                        {/* Notifications */}
                                        <button className="relative p-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200">
                                            <Bell className="w-5 h-5 text-gray-600" />
                                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                                        </button>

                                        {/* Settings */}
                                        <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200">
                                            <Settings className="w-5 h-5 text-gray-600" />
                                        </button>

                                        {/* Profile */}
                                        <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                                <User className="w-4 h-4 text-white" />
                                            </div>
                                            <div className="hidden md:block">
                                                <p className="text-sm font-medium text-gray-900">HR Admin</p>
                                                <p className="text-xs text-gray-500">Administrator</p>
                                            </div>
                                            <button 
                                                onClick={handleLogout}
                                                className="p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                                title="Logout"
                                            >
                                                <LogOut className="w-4 h-4 text-gray-600" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* Main Content */}
                        <main className="flex-1 overflow-auto">
                            <div className="p-6">
                                <Outlet />
                            </div>
                        </main>
                    </div>
                </div>
            </SidebarProvider>
        </div>
    )
}