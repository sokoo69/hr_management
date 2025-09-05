import { NavLink, useNavigate } from "react-router-dom"
import { 
    Sidebar, 
    SidebarContent, 
    SidebarFooter, 
    SidebarGroup, 
    SidebarGroupLabel, 
    SidebarHeader, 
    SidebarMenu, 
    SidebarMenuItem
} from "@/components/ui/sidebar"
import { 
    Home, 
    User, 
    Calendar, 
    FileText, 
    DollarSign, 
    Briefcase,
    Clock,
    TrendingUp,
    LogOut
} from "lucide-react"
import { useDispatch } from "react-redux"
import { HandlePostEmployees } from "../../redux/Thunks/EmployeeThunk.js"

export const EmployeeDashboardSidebar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
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

    const menuItems = [
        { path: "/auth/employee/employee-dashboard/dashboard-data", icon: Home, label: "Dashboard", color: "emerald" },
        { path: "/auth/employee/employee-dashboard/profile", icon: User, label: "My Profile", color: "blue" },
        { path: "/auth/employee/employee-dashboard/leaves", icon: Calendar, label: "My Leaves", color: "orange" },
        { path: "/auth/employee/employee-dashboard/requests", icon: FileText, label: "My Requests", color: "purple" },
        { path: "/auth/employee/employee-dashboard/salary", icon: DollarSign, label: "Salary Info", color: "green" },
    ]

    return (
        <Sidebar className="bg-white/90 backdrop-blur-sm border-r border-gray-200/50">
            <SidebarHeader className="p-6 border-b border-gray-200/50">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Employee Portal</h2>
                        <p className="text-xs text-gray-500">Personal Dashboard</p>
                    </div>
                </div>
            </SidebarHeader>
            
            <SidebarContent className="p-4">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        My Workspace
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
                                                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg' 
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

                {/* Quick Stats */}
                <SidebarGroup className="mt-8">
                    <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Quick Stats
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <div className="space-y-3">
                            <div className="p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200/50">
                                <div className="flex items-center space-x-2">
                                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                                    <span className="text-sm font-medium text-emerald-700">Performance</span>
                                </div>
                                <p className="text-xs text-emerald-600 mt-1">Excellent this month</p>
                            </div>
                            
                            <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50">
                                <div className="flex items-center space-x-2">
                                    <Clock className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm font-medium text-blue-700">Attendance</span>
                                </div>
                                <p className="text-xs text-blue-600 mt-1">95% this month</p>
                            </div>
                        </div>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            
            <SidebarFooter className="p-4 border-t border-gray-200/50">
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Employee</p>
                        <p className="text-xs text-gray-500">Team Member</p>
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