import { ListWrapper } from "../../../components/common/Dashboard/ListDesigns"
import { HeadingBar } from "../../../components/common/Dashboard/ListDesigns"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Loading } from "../../../components/common/loading.jsx"
import { ListItems } from "../../../components/common/Dashboard/ListDesigns"
import { ListContainer } from "../../../components/common/Dashboard/ListDesigns"
import { AddRequestDialogBox } from "../../../components/common/Dashboard/dialogboxes.jsx"

export const HRRequestsPage = () => {
    const dispatch = useDispatch()
    const HRRequestsState = useSelector((state) => state.HRRequestsPageReducer || { isLoading: false, data: [] })
    const table_headings = ["Request ID", "Employee Name", "Request Type", "Description", "Status", "Date", "Actions"]

    useEffect(() => {
        // TODO: Add API call for requests when backend is ready
        console.log("Requests page loaded")
    }, [])

    if (HRRequestsState.isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="requests-page-content w-full mx-auto my-10 flex flex-col gap-5 h-[94%]">
            <div className="requests-header flex justify-between items-center">
                <h1 className="min-[250px]:text-xl md:text-4xl font-bold">Request Management</h1>
                <div className="request-create-button">
                    <AddRequestDialogBox />
                </div>
            </div>
            <div className="requests-data flex flex-col gap-4 md:pe-5 overflow-auto">
                <ListWrapper>
                    <HeadingBar table_layout={"grid-cols-7"} table_headings={table_headings} />
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
