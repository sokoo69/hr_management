import { HRSignupPage } from "../pages/HumanResources/HRSignup"
import { HRLogin } from "../pages/HumanResources/HRlogin"
import { HRDashboard } from "../pages/HumanResources/HRdashbaord"
import { VerifyEmailPage } from "../pages/HumanResources/verifyemailpage.jsx"
// import { ResetEmailConfirm } from "../pages/Employees/resetemailconfirm.jsx"
// import { ResetEmailVerification } from "../pages/HumanResources/resendemailverificaiton.jsx"
import { HRForgotPasswordPage } from "../pages/HumanResources/forgotpassword.jsx"
import { ResetMailConfirmPage } from "../pages/HumanResources/resetmailconfirm.jsx"
import { ResetHRPasswordPage } from "../pages/HumanResources/resetpassword.jsx"
import { ResetHRVerifyEmailPage } from "../pages/HumanResources/resetemail.jsx"
import { HRDashboardPage } from "../pages/HumanResources/Dashboard Childs/dashboardpage.jsx"
import { HRProtectedRoutes } from "./HRprotectedroutes.jsx"
import { HREmployeesPage } from "../pages/HumanResources/Dashboard Childs/employeespage.jsx"
import { HRDepartmentPage } from "../pages/HumanResources/Dashboard Childs/departmentpage.jsx"
import { HRLeavesPage } from "../pages/HumanResources/Dashboard Childs/leavespage.jsx"
import { HRRequestsPage } from "../pages/HumanResources/Dashboard Childs/requestspage.jsx"
import { HRSalariesPage } from "../pages/HumanResources/Dashboard Childs/salariespage.jsx"
import { HRNoticesPage } from "../pages/HumanResources/Dashboard Childs/noticespage.jsx"
import { HRAttendancesPage } from "../pages/HumanResources/Dashboard Childs/attendancespage.jsx"
import { HRRecruitmentPage } from "../pages/HumanResources/Dashboard Childs/recruitmentpage.jsx"
import { HRInterviewInsightsPage } from "../pages/HumanResources/Dashboard Childs/interviewinsightspage.jsx"
import { HRProfilesPage } from "../pages/HumanResources/Dashboard Childs/hrprofilespage.jsx"
export const HRRoutes = [
    {
        path: "/auth/HR/signup",
        element: <HRSignupPage />
    },
    {
        path: "/auth/HR/login",
        element: <HRLogin />
    },
    {
        path: "/HR/dashboard",
        element: <HRProtectedRoutes><HRDashboard /></HRProtectedRoutes>,
        children: [
            {
                path: "/HR/dashboard/dashboard-data",
                element: <HRDashboardPage />
            },
            {
                path: "/HR/dashboard/employees",
                element: <HREmployeesPage />
            },
            {
                path: "/HR/dashboard/departments",
                element: <HRDepartmentPage />
            },
            {
                path: "/HR/dashboard/leaves",
                element: <HRLeavesPage />
            },
            {
                path: "/HR/dashboard/requestes",
                element: <HRRequestsPage />
            },
            {
                path: "/HR/dashboard/salaries",
                element: <HRSalariesPage />
            },
            {
                path: "/HR/dashboard/notices",
                element: <HRNoticesPage />
            },
            {
                path: "/HR/dashboard/attendances",
                element: <HRAttendancesPage />
            },
            {
                path: "/HR/dashboard/recruitment",
                element: <HRRecruitmentPage />
            },
            {
                path: "/HR/dashboard/interview-insights",
                element: <HRInterviewInsightsPage />
            },
            {
                path: "/HR/dashboard/hr-profiles",
                element: <HRProfilesPage />
            }
        ]
    },
    {
        path: "/auth/HR/verify-email",
        element: <VerifyEmailPage />
    },
    {
        path: "/auth/HR/reset-email-validation",
        element: <ResetHRVerifyEmailPage />
    },
    {
        path: "/auth/HR/forgot-password",
        element: <HRForgotPasswordPage />
    },
    {
        path: "/auth/HR/reset-email-confirmation",
        element: <ResetMailConfirmPage />
    },
    {
        path: "/auth/HR/resetpassword/:token",
        element: <ResetHRPasswordPage />
    },
]