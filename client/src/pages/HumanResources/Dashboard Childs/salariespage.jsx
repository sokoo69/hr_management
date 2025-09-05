import { ListWrapper } from "../../../components/common/Dashboard/ListDesigns"
import { HeadingBar } from "../../../components/common/Dashboard/ListDesigns"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Loading } from "../../../components/common/loading.jsx"
import { ListItems } from "../../../components/common/Dashboard/ListDesigns"
import { ListContainer } from "../../../components/common/Dashboard/ListDesigns"
import { HandleGetAllSalaries } from "../../../redux/Thunks/SalaryThunk.js"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2 } from "lucide-react"
import { ProcessPayrollDialogBox } from "../../../components/common/Dashboard/dialogboxes.jsx"

export const HRSalariesPage = () => {
    const dispatch = useDispatch()
    const SalariesState = useSelector((state) => state.SalaryReducer || { isLoading: false, data: [], error: { status: false, message: "" } })
    const table_headings = ["Employee Name", "Department", "Basic Salary", "Allowances", "Deductions", "Net Salary", "Actions"]

    useEffect(() => {
        dispatch(HandleGetAllSalaries())
    }, [dispatch])


    const handleEditSalary = (salaryId) => {
        console.log("Editing salary:", salaryId)
        // TODO: Implement salary editing
    }

    const handleDeleteSalary = (salaryId) => {
        console.log("Deleting salary:", salaryId)
        // TODO: Implement salary deletion
    }

    if (SalariesState.isLoading) {
        return <Loading />
    }

    return (
        <div className="salaries-content w-full mx-auto my-10 flex flex-col gap-5 h-[94%]">
            <div className="salaries-header flex justify-between items-center">
                <h1 className="min-[250px]:text-xl md:text-4xl font-bold">Salaries</h1>
                <div className="salaries-actions flex gap-2">
                    <ProcessPayrollDialogBox />
                </div>
            </div>

            {SalariesState.error.status && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {SalariesState.error.message}
                </div>
            )}

            <div className="salaries-data flex flex-col gap-4 md:pe-5 overflow-auto">
                <ListWrapper>
                    <HeadingBar table_layout={"grid-cols-7"} table_headings={table_headings} />
                </ListWrapper>
                <ListContainer>
                    {SalariesState.data && SalariesState.data.length > 0 ? (
                        SalariesState.data.map((salary, index) => (
                            <div key={salary._id || index} className="grid grid-cols-7 gap-4 p-3 border-b border-gray-200 hover:bg-gray-50">
                                <div className="flex items-center">
                                    <span className="text-sm font-medium">
                                        {salary.employee?.firstname} {salary.employee?.lastname}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-sm text-gray-600">
                                        {salary.employee?.department || "N/A"}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-sm font-medium">
                                        ${salary.basicSalary || 0}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-sm text-green-600">
                                        +${salary.allowances || 0}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-sm text-red-600">
                                        -${salary.deductions || 0}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-sm font-bold text-blue-600">
                                        ${(salary.basicSalary || 0) + (salary.allowances || 0) - (salary.deductions || 0)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleEditSalary(salary._id)}
                                        className="h-8 w-8 p-0"
                                    >
                                        <Edit className="w-3 h-3" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleDeleteSalary(salary._id)}
                                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center justify-center h-64 text-muted-foreground">
                            <div className="text-center">
                                <p className="text-lg font-medium">No salary data available</p>
                                <p className="text-sm text-gray-500 mt-1">Start by processing payroll or adding salary records</p>
                            </div>
                        </div>
                    )}
                </ListContainer>
            </div>
        </div>
    )
}
