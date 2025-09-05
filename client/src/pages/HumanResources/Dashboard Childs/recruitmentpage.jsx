import { ListWrapper } from "../../../components/common/Dashboard/ListDesigns"
import { HeadingBar } from "../../../components/common/Dashboard/ListDesigns"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Loading } from "../../../components/common/loading.jsx"
import { ListItems } from "../../../components/common/Dashboard/ListDesigns"
import { ListContainer } from "../../../components/common/Dashboard/ListDesigns"

export const HRRecruitmentPage = () => {
    const dispatch = useDispatch()
    const RecruitmentState = useSelector((state) => state.RecruitmentReducer || { isLoading: false, data: [] })
    const table_headings = ["Job Title", "Department", "Applicants", "Status", "Posted Date", "Actions"]

    useEffect(() => {
        // TODO: Add API call for recruitment when backend is ready
        console.log("Recruitment page loaded")
    }, [])

    if (RecruitmentState.isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="recruitment-content w-full mx-auto my-10 flex flex-col gap-5 h-[94%]">
            <div className="recruitment-header flex justify-between items-center">
                <h1 className="min-[250px]:text-xl md:text-4xl font-bold">Recruitment</h1>
                <div className="recruitment-actions">
                    <button className="btn-sm btn-blue-700 text-md border-2 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md bg-blue-700 border-blue-700 hover:bg-transparent hover:text-blue-700">
                        Post Job
                    </button>
                </div>
            </div>
            <div className="recruitment-data flex flex-col gap-4 md:pe-5 overflow-auto">
                <ListWrapper>
                    <HeadingBar table_layout={"grid-cols-6"} table_headings={table_headings} />
                </ListWrapper>
                <ListContainer>
                    <div className="flex items-center justify-center h-64 text-muted-foreground">
                        <p>No recruitment data available yet</p>
                    </div>
                </ListContainer>
            </div>
        </div>
    )
}
