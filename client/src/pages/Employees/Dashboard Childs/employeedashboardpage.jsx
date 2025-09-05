import { KeyDetailBoxContentWrapper } from "../../../components/common/Dashboard/contentwrappers.jsx"
import { SalaryChart } from "../../../components/common/Dashboard/salarychart.jsx"
import { DataTable } from "../../../components/common/Dashboard/datatable.jsx"
import { useEffect } from "react"
import { HandleGetEmployeeDashboard } from "../../../redux/Thunks/EmployeeDashboardThunk.js"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Loading } from "../../../components/common/loading.jsx"

export const EmployeeDashboardPage = () => {
    console.log("Employee Dashboard Reloaded")
    const DashboardState = useSelector((state) => state.employeeDashboardReducer)
    const dispatch = useDispatch()
    const DataArray = [
        {
            image: "/../../src/assets/HR-Dashboard/employee-2.png",
            dataname: "profile",
            path: "/auth/employee/employee-dashboard/profile"
        },
        {
            image: "/../../src/assets/HR-Dashboard/leave.png",
            dataname: "leaves",
            path: "/auth/employee/employee-dashboard/leaves",
        },
        {
            image: "/../../src/assets/HR-Dashboard/request.png",
            dataname: "requests",
            path: "/auth/employee/employee-dashboard/requests"
        },
        {
            image: "/../../src/assets/HR-Dashboard/department.png",
            dataname: "salary",
            path: "/auth/employee/employee-dashboard/salary"
        }
    ]

    useEffect(() => {
        dispatch(HandleGetEmployeeDashboard({ apiroute: "GETDATA" }))
    },[])

    if (DashboardState.isLoading) { 
        return (
            <Loading />
        )
    }

    return (
        <>
            <KeyDetailBoxContentWrapper imagedataarray={DataArray} data={DashboardState.data} />
            <div className="charts-container flex flex-col gap-5 min-[250px]:mx-1 md:mx-2">
                <SalaryChart balancedata={DashboardState.data} />
                <DataTable noticedata={DashboardState.data} />
            </div>
        </>
    )
}
