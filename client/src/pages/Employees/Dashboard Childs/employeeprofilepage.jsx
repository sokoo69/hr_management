import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Loading } from "../../../components/common/loading.jsx"

export const EmployeeProfilePage = () => {
    const dispatch = useDispatch()
    const EmployeeState = useSelector((state) => state.employeereducer || { isLoading: false, data: {} })

    useEffect(() => {
        // TODO: Add API call for employee profile when backend is ready
        console.log("Employee profile page loaded")
    }, [])

    if (EmployeeState.isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="employee-profile-content w-full mx-auto my-10 flex flex-col gap-5 h-[94%]">
            <div className="profile-header">
                <h1 className="min-[250px]:text-xl md:text-4xl font-bold">My Profile</h1>
            </div>
            <div className="profile-data flex flex-col gap-4 md:pe-5 overflow-auto">
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                    <p>Employee profile information will be displayed here</p>
                </div>
            </div>
        </div>
    )
}
