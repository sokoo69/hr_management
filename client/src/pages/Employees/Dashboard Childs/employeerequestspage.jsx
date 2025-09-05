import { ListWrapper } from "../../../components/common/Dashboard/ListDesigns"
import { HeadingBar } from "../../../components/common/Dashboard/ListDesigns"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Loading } from "../../../components/common/loading.jsx"
import { ListItems } from "../../../components/common/Dashboard/ListDesigns"
import { ListContainer } from "../../../components/common/Dashboard/ListDesigns"
import { AddRequestDialogBox } from "../../../components/common/Dashboard/dialogboxes.jsx"

export const EmployeeRequestsPage = () => {
    const dispatch = useDispatch()
    const EmployeeRequestsState = useSelector((state) => state.EmployeeRequestsPageReducer || { isLoading: false, data: [] })
    const table_headings = ["Request Type", "Title", "Description", "Status", "Date", "Actions"]

    useEffect(() => {
        // TODO: Add API call for employee requests when backend is ready
        console.log("Employee requests page loaded")
    }, [])

    if (EmployeeRequestsState.isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="employee-requests-content w-full mx-auto my-10 flex flex-col gap-5 h-[94%]">
            <div className="requests-header flex justify-between items-center">
                <h1 className="min-[250px]:text-xl md:text-4xl font-bold">My Requests</h1>
                <div className="request-create-button">
                    <AddRequestDialogBox />
                </div>
            </div>
            <div className="requests-data flex flex-col gap-4 md:pe-5 overflow-auto">
                <ListWrapper>
                    <HeadingBar table_layout={"grid-cols-6"} table_headings={table_headings} />
                </ListWrapper>
                <ListContainer>
                    <div className="flex items-center justify-center h-64 text-muted-foreground">
                        <p>No request data available yet</p>
                    </div>
                </ListContainer>
            </div>
        </div>
    )
}
