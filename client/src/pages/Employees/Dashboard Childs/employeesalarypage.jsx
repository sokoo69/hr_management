import { SalaryChart } from "../../../components/common/Dashboard/salarychart.jsx"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Loading } from "../../../components/common/loading.jsx"

export const EmployeeSalaryPage = () => {
    const dispatch = useDispatch()
    const EmployeeSalaryState = useSelector((state) => state.EmployeeSalaryPageReducer || { isLoading: false, data: {} })

    useEffect(() => {
        // TODO: Add API call for employee salary when backend is ready
        console.log("Employee salary page loaded")
    }, [])

    if (EmployeeSalaryState.isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="employee-salary-content w-full mx-auto my-10 flex flex-col gap-5 h-[94%]">
            <div className="salary-header">
                <h1 className="min-[250px]:text-xl md:text-4xl font-bold">My Salary Information</h1>
            </div>
            <div className="salary-data flex flex-col gap-4 md:pe-5 overflow-auto">
                <SalaryChart balancedata={EmployeeSalaryState.data} />
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                    <p>Additional salary details will be displayed here</p>
                </div>
            </div>
        </div>
    )
}
