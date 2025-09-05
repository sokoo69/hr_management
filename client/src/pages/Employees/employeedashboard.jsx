import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { EmployeeDashboardSidebar } from "../../components/ui/EmployeeSidebar.jsx"
import { Outlet } from "react-router-dom"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { Bell, Search, User, Settings, LogOut, Calendar, Clock } from "lucide-react"
import { useDispatch } from "react-redux"
import { HandlePostEmployees } from "../../redux/Thunks/EmployeeThunk.js"

export const EmployeeDashboard = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const pathArray = location.pathname.split("/")

    useEffect(() => {
        // Only navigate if we're not already on a dashboard route
        if (!location.pathname.includes('/dashboard-data') && 
            !location.pathname.includes('/profile') && 
            !location.pathname.includes('/leaves') && 
            !location.pathname.includes('/requests') && 
            !location.pathname.includes('/salary')) {
            navigate('/auth/employee/employee-dashboard/dashboard-data')
        }
    }, [])

    const handleLogout = () => {
        // Clear authentication tokens
        document.cookie = "EMtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem('EMtoken');
        sessionStorage.removeItem('EMtoken');
        
        // Dispatch logout action to clear Redux state
        dispatch(HandlePostEmployees({ apiroute: "LOGOUT" }));
        
        // Navigate to home page
        navigate("/");
        
        console.log("Employee logout successful");
    }

    console.log("Employee dashboard current path location", location)

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
            <SidebarProvider>
                <div className="flex h-screen">
                    {/* Sidebar */}
                    <div className="relative">
                        <EmployeeDashboardSidebar />
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
                                            <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl flex items-center justify-center">
                                                <User className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h1 className="text-xl font-bold text-gray-900">Employee Portal</h1>
                                                <p className="text-sm text-gray-600">Welcome back! Here's your dashboard overview.</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Center - Quick Info */}
                                    <div className="hidden lg:flex items-center space-x-6">
                                        <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-2 rounded-lg">
                                            <Calendar className="w-4 h-4 text-emerald-600" />
                                            <span className="text-sm font-medium text-emerald-700">
                                                {new Date().toLocaleDateString('en-US', { 
                                                    weekday: 'long', 
                                                    year: 'numeric', 
                                                    month: 'long', 
                                                    day: 'numeric' 
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                                            <Clock className="w-4 h-4 text-blue-600" />
                                            <span className="text-sm font-medium text-blue-700">
                                                {new Date().toLocaleTimeString('en-US', { 
                                                    hour: '2-digit', 
                                                    minute: '2-digit' 
                                                })}
                                            </span>
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
                                                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 w-64"
                                            />
                                        </div>

                                        {/* Notifications */}
                                        <button className="relative p-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200">
                                            <Bell className="w-5 h-5 text-gray-600" />
                                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full"></span>
                                        </button>

                                        {/* Settings */}
                                        <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200">
                                            <Settings className="w-5 h-5 text-gray-600" />
                                        </button>

                                        {/* Profile */}
                                        <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                                            <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg flex items-center justify-center">
                                                <User className="w-4 h-4 text-white" />
                                            </div>
                                            <div className="hidden md:block">
                                                <p className="text-sm font-medium text-gray-900">Employee</p>
                                                <p className="text-xs text-gray-500">Team Member</p>
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