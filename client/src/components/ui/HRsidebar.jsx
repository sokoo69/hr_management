import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import { NavLink, useNavigate } from "react-router-dom"
import { 
    LayoutDashboard, 
    Users, 
    Building2, 
    DollarSign, 
    Megaphone, 
    Clock, 
    UserPlus, 
    BarChart3, 
    UserCheck,
    Shield,
    Calendar,
    FileText,
    LogOut
} from "lucide-react"
import { useDispatch } from "react-redux"
import { HandleGetHumanResources } from "../../redux/Thunks/HRThunk.js"

export function HRdashboardSidebar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
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

    const menuItems = [
        { path: "/HR/dashboard/dashboard-data", icon: LayoutDashboard, label: "Dashboard", color: "blue" },
        { path: "/HR/dashboard/employees", icon: Users, label: "Employees", color: "green" },
        { path: "/HR/dashboard/departments", icon: Building2, label: "Departments", color: "purple" },
        { path: "/HR/dashboard/salaries", icon: DollarSign, label: "Salaries", color: "yellow" },
        { path: "/HR/dashboard/notices", icon: Megaphone, label: "Notices", color: "orange" },
        { path: "/HR/dashboard/attendances", icon: Clock, label: "Attendances", color: "indigo" },
        { path: "/HR/dashboard/recruitment", icon: UserPlus, label: "Recruitment", color: "pink" },
        { path: "/HR/dashboard/interview-insights", icon: BarChart3, label: "Interview Insights", color: "teal" },
        { path: "/HR/dashboard/hr-profiles", icon: UserCheck, label: "HR Profiles", color: "red" },
        { path: "/HR/dashboard/leaves", icon: Calendar, label: "Leaves", color: "emerald" },
        { path: "/HR/dashboard/requestes", icon: FileText, label: "Requests", color: "cyan" },
    ]

    return (
        <Sidebar className="bg-white/90 backdrop-blur-sm border-r border-gray-200/50">
            <SidebarHeader className="p-6 border-b border-gray-200/50">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">HR Admin</h2>
                        <p className="text-xs text-gray-500">Management Portal</p>
                    </div>
                </div>
            </SidebarHeader>
            
            <SidebarContent className="p-4">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Navigation
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-2">
                            {menuItems.map((item) => {
                                const Icon = item.icon
                                return (
                                    <NavLink 
                                        key={item.path}
                                        to={item.path} 
                                        className={({ isActive }) => 
                                            `flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                                                isActive 
                                                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg' 
                                                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                            }`
                                        }
                                    >
                                        <SidebarMenuItem className="w-full">
                                            <div className="flex items-center space-x-3">
                                                <div className={`p-2 rounded-lg transition-colors duration-200 ${
                                                    window.location.pathname === item.path 
                                                        ? 'bg-white/20' 
                                                        : 'bg-gray-50 group-hover:bg-gray-100'
                                                }`}>
                                                    <Icon className={`w-5 h-5 transition-colors duration-200 ${
                                                        window.location.pathname === item.path 
                                                            ? 'text-white' 
                                                            : 'text-gray-600'
                                                    }`} />
                                                </div>
                                                <span className="font-medium">{item.label}</span>
                                            </div>
                                        </SidebarMenuItem>
                                    </NavLink>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            
            <SidebarFooter className="p-4 border-t border-gray-200/50">
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">HR Admin</p>
                        <p className="text-xs text-gray-500">Administrator</p>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors duration-200 group"
                        title="Logout"
                    >
                        <LogOut className="w-4 h-4 text-gray-600 group-hover:text-red-600" />
                    </button>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}