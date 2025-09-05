import { ListWrapper } from "../../../components/common/Dashboard/ListDesigns"
import { HeadingBar } from "../../../components/common/Dashboard/ListDesigns"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Loading } from "../../../components/common/loading.jsx"
import { ListItems } from "../../../components/common/Dashboard/ListDesigns"
import { ListContainer } from "../../../components/common/Dashboard/ListDesigns"

export const HRNoticesPage = () => {
    const dispatch = useDispatch()
    const NoticesState = useSelector((state) => state.NoticesReducer || { isLoading: false, data: [] })
    const table_headings = ["Title", "Content", "Priority", "Created Date", "Status", "Actions"]

    useEffect(() => {
        // TODO: Add API call for notices when backend is ready
        console.log("Notices page loaded")
    }, [])

    if (NoticesState.isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="notices-content w-full mx-auto my-10 flex flex-col gap-5 h-[94%]">
            <div className="notices-header flex justify-between items-center">
                <h1 className="min-[250px]:text-xl md:text-4xl font-bold">Issue Notices</h1>
                <div className="notices-actions">
                    <button className="btn-sm btn-blue-700 text-md border-2 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md bg-blue-700 border-blue-700 hover:bg-transparent hover:text-blue-700">
                        Create Notice
                    </button>
                </div>
            </div>
            <div className="notices-data flex flex-col gap-4 md:pe-5 overflow-auto">
                <ListWrapper>
                    <HeadingBar table_layout={"grid-cols-6"} table_headings={table_headings} />
                </ListWrapper>
                <ListContainer>
                    <div className="flex items-center justify-center h-64 text-muted-foreground">
                        <p>No notices available yet</p>
                    </div>
                </ListContainer>
            </div>
        </div>
    )
}
