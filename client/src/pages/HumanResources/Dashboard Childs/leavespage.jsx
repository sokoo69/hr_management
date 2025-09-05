import { ListWrapper } from "../../../components/common/Dashboard/ListDesigns"
import { HeadingBar } from "../../../components/common/Dashboard/ListDesigns"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Loading } from "../../../components/common/loading.jsx"
import { ListItems } from "../../../components/common/Dashboard/ListDesigns"
import { ListContainer } from "../../../components/common/Dashboard/ListDesigns"
import { AddLeaveDialogBox } from "../../../components/common/Dashboard/dialogboxes.jsx"

export const HRLeavesPage = () => {
    const dispatch = useDispatch()
    const HRLeavesState = useSelector((state) => state.HRLeavesPageReducer || { isLoading: false, data: [] })
    const table_headings = ["Employee Name", "Leave Type", "Start Date", "End Date", "Status", "Actions"]

    useEffect(() => {
        // TODO: Add API call for leaves when backend is ready
        console.log("Leaves page loaded")
    }, [])

    if (HRLeavesState.isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="leaves-page-content w-full mx-auto my-10 flex flex-col gap-5 h-[94%]">
            <div className="leaves-header flex justify-between items-center">
                <h1 className="min-[250px]:text-xl md:text-4xl font-bold">Leave Management</h1>
                <div className="leave-create-button">
                    <AddLeaveDialogBox />
                </div>
            </div>
            <div className="leaves-data flex flex-col gap-4 md:pe-5 overflow-auto">
                <ListWrapper>
                    <HeadingBar table_layout={"grid-cols-6"} table_headings={table_headings} />
                </ListWrapper>
                <ListContainer>
                    <div className="flex items-center justify-center h-64 text-muted-foreground">
                        <p>No leave data available yet</p>
                    </div>
                </ListContainer>
            </div>
        </div>
    )
}
