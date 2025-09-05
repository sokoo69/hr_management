import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { ErrorPopup } from "../error-popup.jsx"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { CommonStateHandler } from "../../../utils/commonhandler.js"
import { useDispatch, useSelector } from "react-redux"
import { FormSubmitToast } from "./Toasts.jsx"
import { Loading } from "../loading.jsx"
import { HandleDeleteHREmployees } from "../../../redux/Thunks/HREmployeesThunk.js"
import { HandlePostHRDepartments, HandlePatchHRDepartments, HandleDeleteHRDepartments } from "../../../redux/Thunks/HRDepartmentPageThunk.js"
import { useToast } from "../../../hooks/use-toast.js"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { HandleGetAllEmployeesIDs } from "../../../redux/Thunks/EmployeesIDsThunk.js"
import { HandleProcessPayroll, HandleGetAllSalaries } from "../../../redux/Thunks/SalaryThunk.js"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"


export const AddEmployeesDialogBox = () => {
    const HREmployeesState = useSelector((state) => state.HREmployeesPageReducer)
    const [formdata, setformdata] = useState({
        firstname: "",
        lastname: "",
        email: "",
        contactnumber: "",
        textpassword: "",
        password: "",
    })

    const handleformchange = (event) => {
        CommonStateHandler(formdata, setformdata, event)
    }

    return (
        <div className="AddEmployees-content">
            <Dialog>
                <DialogTrigger className="bg-blue-800 border-2 border-blue-800 md:px-4 md:py-2 md:text-lg min-[250px]:px-2 min-[250px]:py-1 min-[250px]:text-sm text-white font-bold rounded-lg hover:bg-white hover:text-blue-800">Add Employees</DialogTrigger>
                <DialogContent className="max-w-[315px] sm:max-w-[50vw] 2xl:max-w-[45vw]">
                    <div className="add-employees-container flex flex-col gap-5">
                        <div className="heading">
                            <h1 className="font-bold text-2xl">Add Employee Info</h1>
                        </div>
                        <div className="form-container grid md:grid-cols-2 min-[250px]:grid-cols-1 gap-4">
                            <div className="form-group flex flex-col gap-3">
                                <div className="label-input-field flex flex-col gap-1">
                                    <label htmlFor="firstname" className="md:text-md lg:text-lg font-bold">First Name</label>
                                    <input type="text"
                                        id="firstname"
                                        className="border-2 border-gray-700 rounded px-2 py-1"
                                        name="firstname"
                                        value={formdata.firstname}
                                        onChange={handleformchange} />
                                </div>
                                <div className="label-input-field flex flex-col gap-1">
                                    <label htmlFor="lastname" className="md:text-md lg:text-lg font-bold">Last Name</label>
                                    <input type="text"
                                        id="lastanme"
                                        className="border-2 border-gray-700 rounded px-2 py-1"
                                        name="lastname"
                                        value={formdata.lastname}
                                        onChange={handleformchange} />
                                </div>
                                <div className="label-input-field flex flex-col gap-1">
                                    <label htmlFor="email" className="md:text-md lg:text-lg font-bold">Email</label>
                                    <input type="email"
                                        id="email" required={true} className="border-2 border-gray-700 rounded px-2 py-1"
                                        name="email"
                                        value={formdata.email}
                                        onChange={handleformchange} />
                                </div>
                            </div>
                            <div className="form-group flex flex-col gap-3">
                                <div className="label-input-field flex flex-col gap-1">
                                    <label htmlFor="contactnumber" className="md:text-md lg:text-lg font-bold">Contact Number</label>
                                    <input type="number"
                                        id="contactnumber" className="border-2 border-gray-700 rounded px-2 py-1"
                                        name="contactnumber"
                                        value={formdata.contactnumber}
                                        onChange={handleformchange} />
                                </div>
                                <div className="label-input-field flex flex-col gap-1">
                                    <label htmlFor="text-password" className="md:text-md lg:text-lg font-bold">Password</label>
                                    <input type="text"
                                        id="text-password" className="border-2 border-gray-700 rounded px-2 py-1"
                                        name="textpassword"
                                        value={formdata.textpassword}
                                        onChange={handleformchange} />
                                </div>
                                <div className="label-input-field flex flex-col gap-1">
                                    <label htmlFor="password" className="md:text-md lg:text-lg font-bold">Confirm Password</label>
                                    <input type="password"
                                        id="password" required={true} className="border-2 border-gray-700 rounded px-2 py-1"
                                        name="password"
                                        value={formdata.password}
                                        onChange={handleformchange} />
                                </div>
                            </div>
                        </div>
                        <div className="add-button flex items-center justify-center">
                            <FormSubmitToast formdata={formdata} />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export const EmployeeDetailsDialogBox = ({ EmployeeID }) => {
    const HREmployeesState = useSelector((state) => state.HREmployeesPageReducer)
    const FetchEmployeeData = (EmID) => {
        const employee = HREmployeesState.data.find((item) => item._id === EmID)
        return employee
    }
    const employeeData = FetchEmployeeData(EmployeeID)
    return (
        <div className="Employees-Details-container">
            <Dialog>
                <div>
                    <DialogTrigger className="btn-sm btn-blue-700 text-md border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">View</DialogTrigger>
                </div>
                <DialogContent className="max-w-[315px] lg:max-w-[55vw] 2xl:max-w-[45vw]">
                    <div className="employee-data-container flex flex-col gap-4">
                        <div className="employee-profile-logo flex items-center gap-3">
                            <div className="logo border-2 border-blue-800 rounded-[50%] flex justify-center items-center">
                                <p className="font-bold text-2xl text-blue-700 p-2">{`${employeeData.firstname.slice(0, 1).toUpperCase()} ${employeeData.lastname.slice(0, 1).toUpperCase()}`}</p>
                            </div>
                            <div className="employee-fullname">
                                <p className="font-bold text-2xl">{`${employeeData.firstname} ${employeeData.lastname}`}</p>
                            </div>
                        </div>
                        <div className="employees-all-details grid lg:grid-cols-2 min-[250px]:gap-2 lg:gap-10">
                            <div className="details-group-1 flex flex-col gap-3">
                                <div className="label-value-pair flex items-center gap-2">
                                    <label className="font-bold md:text-sm xl:text-lg">First Name :</label>
                                    <p className="md:text-sm xl:text-lg">{employeeData.firstname}</p>
                                </div>
                                <div className="label-value-pair flex items-center gap-2">
                                    <label className="font-bold md:text-sm xl:text-lg">Last Name :</label>
                                    <p className="md:text-sm xl:text-lg">{employeeData.lastname}</p>
                                </div>
                                <div className="label-value-pair flex items-center gap-2">
                                    <label className="font-bold md:text-sm xl:text-lg">Email :</label>
                                    <p className="md:text-sm xl:text-lg">{employeeData.email}</p>
                                </div>
                                <div className="label-value-pair flex items-center gap-2">
                                    <label className="font-bold md:text-sm xl:text-lg">Contact Number :</label>
                                    <p className="md:text-sm xl:text-lg">{employeeData.contactnumber}</p>
                                </div>
                                <div className="label-value-pair flex items-center gap-2">
                                    <label className="font-bold md:text-sm xl:text-lg">Department :</label>
                                    <p className="md:text-sm xl:text-lg">{employeeData.department ? employeeData.department.name : "Not Specified"}</p>
                                </div>
                            </div>
                            <div className="details-group-1 flex flex-col gap-3">
                                <div className="label-value-pair flex items-center gap-2">
                                    <label className="font-bold md:text-sm xl:text-lg">Notices :</label>
                                    <p className="md:text-sm xl:text-lg">{employeeData.notice.length}</p>
                                </div>
                                <div className="label-value-pair flex items-center gap-2">
                                    <label className="font-bold md:text-sm xl:text-lg">Salary Records :</label>
                                    <p className="md:text-sm xl:text-lg">{employeeData.salary.length}</p>
                                </div>
                                <div className="label-value-pair flex items-center gap-2">
                                    <label className="font-bold md:text-sm xl:text-lg">Leave Requests :</label>
                                    <p className="md:text-sm xl:text-lg">{employeeData.leaverequest.length}</p>
                                </div>
                                <div className="label-value-pair flex items-center gap-2">
                                    <label className="font-bold md:text-sm xl:text-lg">Requests :</label>
                                    <p className="md:text-sm xl:text-lg">{employeeData.generaterequest.length}</p>
                                </div>
                                <div className="label-value-pair flex items-center gap-2">
                                    <label className="font-bold md:text-sm xl:text-lg">Email Verify :</label>
                                    <p className="md:text-sm xl:text-lg">{employeeData.isverified ? "Verified" : "Not Verified"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}


export const DeleteEmployeeDialogBox = ({ EmployeeID }) => {
    const dispatch = useDispatch()
    const DeleteEmployee = (EMID) => {
        dispatch(HandleDeleteHREmployees({ apiroute: `DELETE.${EMID}` }))
    }
    return (
        <div className="delete-employee-dialog-container">
            <Dialog>
                <DialogTrigger className="btn-sm btn-blue-700 text-md border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">Delete</DialogTrigger>
                <DialogContent className="max-w-[315px] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                    <div className="flex flex-col justify-center items-center gap-4">
                        <p className="text-lg font-bold min-[250px]:text-center">Are you sure you want to delete this employee?</p>
                        <div className="delete-employee-button-group flex gap-2">
                            <DialogClose asChild>
                                <Button className="btn-sm btn-blue-700 text-md border-2 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md bg-red-700 border-red-700 hover:bg-transparent hover:text-red-700" onClick={() => DeleteEmployee(EmployeeID)}>Delete</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button className="btn-sm btn-blue-700 text-md border-2 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md bg-green-700 border-green-700 hover:bg-transparent hover:text-green-700">Cancel</Button>
                            </DialogClose>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}



export const CreateDepartmentDialogBox = () => {
    const { toast } = useToast()
    const dispatch = useDispatch()
    const [formdata, setformdata] = useState({
        name: "",
        description: ""
    })

    const handleformchange = (event) => {
        CommonStateHandler(formdata, setformdata, event)
    }

    const CreateDepartment = () => {
        dispatch(HandlePostHRDepartments({ apiroute: "CREATE", data: formdata }))
        setformdata({
            name: "",
            description: ""
        })
    }

    const ShowToast = () => {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: `All Fields are required to create a department`,
        })
    }

    return (
        <Dialog>
            <DialogTrigger className="min-[250px]:text-sm sm:text-lg min-[250px]:px-2 min-[250px]:py-1 sm:px-4 sm:py-2 bg-blue-700 font-bold text-white rounded-lg border-2 border-blue-700 hover:bg-white hover:text-blue-700">Create Department</DialogTrigger>
            <DialogContent className="max-w-[315px] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                <div className="create-department-container flex flex-col gap-4">
                    <div className="create-department-heading">
                        <h1 className="font-bold text-2xl">Create Department</h1>
                    </div>
                    <div className="create-department-form flex flex-col gap-4">
                        <div className="form-group flex flex-col gap-3">
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="departmentname" className="md:text-md lg:text-lg font-bold">Department Name</label>
                                <input type="text"
                                    id="departmentname"
                                    name="name"
                                    value={formdata.name}
                                    onChange={handleformchange}
                                    placeholder="Enter Department Name"
                                    className="border-2 border-gray-700 rounded px-2 py-1" />
                            </div>
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="departmentdescription" className="md:text-md lg:text-lg font-bold">Department Description</label>
                                <textarea
                                    id="departmentdescription"
                                    name="description"
                                    value={formdata.description}
                                    onChange={handleformchange}
                                    className="border-2 border-gray-700 rounded px-2 py-1 h-[100px]"
                                    placeholder="Write Your Department Description Here"></textarea>
                            </div>
                        </div>
                        <div className="create-department-button flex justify-center items-center">
                            {
                                (formdata.name.trim().length === 0 || formdata.description.trim().length === 0) ? <Button className="btn-sm btn-blue-700 text-md border-2 bg-blue-700 border-blue-700 px-2 py-1 rounded-md hover:bg-white hover:text-blue-700" onClick={() => ShowToast()}>Create</Button> :
                                    <DialogClose asChild>
                                        <Button className="btn-sm btn-blue-700 text-md border-2 bg-blue-700 border-blue-700 px-2 py-1 rounded-md hover:bg-white hover:text-blue-700" onClick={() => CreateDepartment()}>Create</Button>
                                    </DialogClose>
                            }
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}



export const EmployeesIDSDialogBox = ({ DepartmentID }) => {
    console.log("this is Department ID", DepartmentID)
    const EmployeesIDState = useSelector((state) => state.EMployeesIDReducer)
    const dispatch = useDispatch()
    const [SelectedEmployeesData, Set_selectedEmployeesData] = useState({
        departmentID: DepartmentID,
        employeeIDArray: [],
    })

    const SelectEmployees = (EMID) => {
        if (SelectedEmployeesData.employeeIDArray.includes(EMID)) {
            Set_selectedEmployeesData({ ...SelectedEmployeesData, employeeIDArray: SelectedEmployeesData.employeeIDArray.filter((item) => item !== EMID) })
        }
        else if (!SelectedEmployeesData.employeeIDArray.includes(EMID)) {
            Set_selectedEmployeesData({ ...SelectedEmployeesData }, SelectedEmployeesData.employeeIDArray.push(EMID))
        }
    }

    const ClearSelectedEmployeesData = () => {
        Set_selectedEmployeesData({
            departmentID: DepartmentID,
            employeeIDArray: []
        })
    }

    const SetEmployees = () => {
        dispatch(HandlePatchHRDepartments({ apiroute: "UPDATE", data: SelectedEmployeesData }))
        ClearSelectedEmployeesData()
    }

    console.log(SelectedEmployeesData)

    useEffect(() => {
        Set_selectedEmployeesData(
            {
                departmentID: DepartmentID,
                employeeIDArray: [],
            }
        )
    }, [DepartmentID])

    return (
        <div className="employeeIDs-box-container">
            <Dialog>
                <DialogTrigger className="px-4 py-2 font-bold m-2 bg-blue-600 text-white border-2 border-blue-600 rounded-lg hover:bg-white hover:text-blue-700 min-[250px]:text-xs md:text-sm lg:text-lg" onClick={() => dispatch(HandleGetAllEmployeesIDs({ apiroute: "GETALL" }))}>Add Employees</DialogTrigger>
                <DialogContent className="max-w-[315px] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                    {EmployeesIDState.isLoading ? <Loading height={"h-auto"} /> : <div className="employeeID-checkbox-container flex flex-col gap-4">
                        <div>
                            <h1 className="font-bold text-2xl">Select Employees</h1>
                        </div>
                        <div className="employeeID-checkbox-group">
                            <Command className="rounded-lg border shadow-md w-full">
                                <CommandInput placeholder="Type a Employee Name..." />
                                <CommandList>
                                    <CommandEmpty>No results found.</CommandEmpty>
                                    <CommandGroup heading="All Employees">
                                        {EmployeesIDState.data ? EmployeesIDState.data.map((item, index) => <CommandItem key={index}>
                                            <div className="employeeID-checkbox flex justify-center items-center gap-2">
                                                <input type="checkbox" id={`EmployeeID-${index + 1}`} className="border-2 border-gray-700 w-4 h-4" onClick={() => SelectEmployees(item._id)} checked={SelectedEmployeesData.employeeIDArray.includes(item._id)} disabled={item.department ? true : false} />
                                                <label htmlFor={`EmployeeID-${index + 1}`} className="text-lg">{`${item.firstname} ${item.lastname}`} <span className="text-xs mx-0.5 overflow-hidden text-ellipsis">{item.department ? `(${item.department.name})` : null}</span> </label>
                                            </div>
                                        </CommandItem>) : null}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </div>
                        <div className="employeeID-checkbox-button-group flex justify-center items-center gap-2">
                            <Button className="btn-sm btn-blue-700 text-md border-2 bg-blue-700 border-blue-700 px-2 py-1 rounded-lg hover:bg-white hover:text-blue-700" onClick={() => SetEmployees()}>Add</Button>
                            <DialogClose asChild>
                                <Button className="btn-sm btn-blue-700 text-md border-2 bg-blue-700 border-blue-700 px-2 py-1 rounded-lg hover:bg-white hover:text-blue-700" onClick={() => ClearSelectedEmployeesData()}>Cancel</Button>
                            </DialogClose>
                        </div>
                    </div>}

                </DialogContent>
            </Dialog>
        </div>
    )
}

export const RemoveEmployeeFromDepartmentDialogBox = ({ DepartmentName, DepartmentID, EmployeeID }) => {
    const dispatch = useDispatch()

    const RemoveEmployee = (EMID) => {
        dispatch(HandleDeleteHRDepartments({ apiroute: "DELETE", data: { departmentID: DepartmentID, employeeIDArray: [EMID], action: "delete-employee" } }))
    }

    return (
        <div className="remove-employee">
            <Dialog>
                <DialogTrigger className="btn-sm btn-blue-700 text-md border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">Remove</DialogTrigger>
                <DialogContent className="max-w-[315px] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                    <div className="flex flex-col justify-center items-center gap-4">
                        <p className="text-lg font-bold min-[250px]:text-center">{`Are you sure you want to remove this employee from ${DepartmentName} department ?`}</p>
                        <div className="delete-employee-button-group flex gap-2">
                            <DialogClose asChild>
                                <Button className="btn-sm btn-blue-700 text-md border-2 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md bg-red-700 border-red-700 hover:bg-transparent hover:text-red-700" onClick={() => RemoveEmployee(EmployeeID)}>Remove</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button className="btn-sm btn-blue-700 text-md border-2 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md bg-green-700 border-green-700 hover:bg-transparent hover:text-green-700">Cancel</Button>
                            </DialogClose>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

// Add Leave Dialog Box
export const AddLeaveDialogBox = () => {
    const [formdata, setformdata] = useState({
        employeeId: "",
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: "",
    })

    const handleformchange = (event) => {
        CommonStateHandler(formdata, setformdata, event)
    }

    const handlesubmit = (event) => {
        event.preventDefault()
        console.log("Leave form submitted:", formdata)
        // TODO: Add API call for creating leave
    }

    return (
        <div className="AddLeave-content">
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="btn-sm btn-blue-700 text-md border-2 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md bg-blue-700 border-blue-700 hover:bg-transparent hover:text-blue-700">
                        Add Leave
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Leave</DialogTitle>
                        <DialogDescription>
                            Create a new leave request for an employee.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handlesubmit} className="space-y-4">
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="employeeId" className="text-right">
                                    Employee
                                </label>
                                <input
                                    id="employeeId"
                                    name="employeeId"
                                    value={formdata.employeeId}
                                    onChange={handleformchange}
                                    className="col-span-3 border rounded-md px-3 py-2"
                                    placeholder="Select Employee"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="leaveType" className="text-right">
                                    Leave Type
                                </label>
                                <select
                                    id="leaveType"
                                    name="leaveType"
                                    value={formdata.leaveType}
                                    onChange={handleformchange}
                                    className="col-span-3 border rounded-md px-3 py-2"
                                >
                                    <option value="">Select Leave Type</option>
                                    <option value="sick">Sick Leave</option>
                                    <option value="vacation">Vacation</option>
                                    <option value="personal">Personal</option>
                                    <option value="emergency">Emergency</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="startDate" className="text-right">
                                    Start Date
                                </label>
                                <input
                                    id="startDate"
                                    name="startDate"
                                    type="date"
                                    value={formdata.startDate}
                                    onChange={handleformchange}
                                    className="col-span-3 border rounded-md px-3 py-2"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="endDate" className="text-right">
                                    End Date
                                </label>
                                <input
                                    id="endDate"
                                    name="endDate"
                                    type="date"
                                    value={formdata.endDate}
                                    onChange={handleformchange}
                                    className="col-span-3 border rounded-md px-3 py-2"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="reason" className="text-right">
                                    Reason
                                </label>
                                <textarea
                                    id="reason"
                                    name="reason"
                                    value={formdata.reason}
                                    onChange={handleformchange}
                                    className="col-span-3 border rounded-md px-3 py-2"
                                    placeholder="Leave reason..."
                                    rows={3}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Add Leave</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

// Add Request Dialog Box
export const AddRequestDialogBox = () => {
    const [formdata, setformdata] = useState({
        employeeId: "",
        requestType: "",
        title: "",
        description: "",
        priority: "medium",
    })

    const handleformchange = (event) => {
        CommonStateHandler(formdata, setformdata, event)
    }

    const handlesubmit = (event) => {
        event.preventDefault()
        console.log("Request form submitted:", formdata)
        // TODO: Add API call for creating request
    }

    return (
        <div className="AddRequest-content">
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="btn-sm btn-blue-700 text-md border-2 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md bg-blue-700 border-blue-700 hover:bg-transparent hover:text-blue-700">
                        Add Request
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Request</DialogTitle>
                        <DialogDescription>
                            Create a new request for an employee.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handlesubmit} className="space-y-4">
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="employeeId" className="text-right">
                                    Employee
                                </label>
                                <input
                                    id="employeeId"
                                    name="employeeId"
                                    value={formdata.employeeId}
                                    onChange={handleformchange}
                                    className="col-span-3 border rounded-md px-3 py-2"
                                    placeholder="Select Employee"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="requestType" className="text-right">
                                    Request Type
                                </label>
                                <select
                                    id="requestType"
                                    name="requestType"
                                    value={formdata.requestType}
                                    onChange={handleformchange}
                                    className="col-span-3 border rounded-md px-3 py-2"
                                >
                                    <option value="">Select Request Type</option>
                                    <option value="equipment">Equipment Request</option>
                                    <option value="training">Training Request</option>
                                    <option value="schedule">Schedule Change</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="title" className="text-right">
                                    Title
                                </label>
                                <input
                                    id="title"
                                    name="title"
                                    value={formdata.title}
                                    onChange={handleformchange}
                                    className="col-span-3 border rounded-md px-3 py-2"
                                    placeholder="Request title..."
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="priority" className="text-right">
                                    Priority
                                </label>
                                <select
                                    id="priority"
                                    name="priority"
                                    value={formdata.priority}
                                    onChange={handleformchange}
                                    className="col-span-3 border rounded-md px-3 py-2"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="description" className="text-right">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formdata.description}
                                    onChange={handleformchange}
                                    className="col-span-3 border rounded-md px-3 py-2"
                                    placeholder="Request description..."
                                    rows={3}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Add Request</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export const ProcessPayrollDialogBox = () => {
    const [open, setOpen] = useState(false)
    const [payrollData, setPayrollData] = useState({
        employeeIDs: [],
        basicpay: "",
        bonusePT: "",
        deductionPT: "",
        duedate: "",
        currency: "USD"
    })
    const [selectedEmployees, setSelectedEmployees] = useState([])
    const [availableEmployees, setAvailableEmployees] = useState([])
    const [isLoadingEmployees, setIsLoadingEmployees] = useState(false)
    const dispatch = useDispatch()
    const EmployeesState = useSelector((state) => state.EMployeesIDReducer || { isLoading: false, data: [] })

    useEffect(() => {
        if (open) {
            setIsLoadingEmployees(true)
            dispatch(HandleGetAllEmployeesIDs({ apiroute: "GETALL" }))
        }
    }, [open, dispatch])

    useEffect(() => {
        if (EmployeesState.data && EmployeesState.data.length > 0) {
            setAvailableEmployees(EmployeesState.data)
            setIsLoadingEmployees(false)
        }
    }, [EmployeesState.data])

    const handleEmployeeSelect = (employeeId, isSelected) => {
        if (isSelected) {
            setSelectedEmployees(prev => [...prev, employeeId])
            setPayrollData(prev => ({
                ...prev,
                employeeIDs: [...prev.employeeIDs, employeeId]
            }))
        } else {
            setSelectedEmployees(prev => prev.filter(id => id !== employeeId))
            setPayrollData(prev => ({
                ...prev,
                employeeIDs: prev.employeeIDs.filter(id => id !== employeeId)
            }))
        }
    }

    const handleSelectAll = () => {
        if (selectedEmployees.length === availableEmployees.length) {
            // Deselect all
            setSelectedEmployees([])
            setPayrollData(prev => ({ ...prev, employeeIDs: [] }))
        } else {
            // Select all
            const allIds = availableEmployees.map(emp => emp._id)
            setSelectedEmployees(allIds)
            setPayrollData(prev => ({ ...prev, employeeIDs: allIds }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (payrollData.employeeIDs.length === 0) {
            alert("Please select at least one employee")
            return
        }

        try {
            await dispatch(HandleProcessPayroll(payrollData)).unwrap()
            setOpen(false)
            setPayrollData({
                employeeIDs: [],
                basicpay: "",
                bonusePT: "",
                deductionPT: "",
                duedate: "",
                currency: "USD"
            })
            setSelectedEmployees([])
            // Refresh the salaries list
            dispatch(HandleGetAllSalaries())
        } catch (error) {
            console.error("Failed to process payroll:", error)
        }
    }

    const calculateNetPay = () => {
        if (payrollData.basicpay && payrollData.bonusePT && payrollData.deductionPT) {
            const basic = parseFloat(payrollData.basicpay) || 0
            const bonus = (basic * parseFloat(payrollData.bonusePT)) / 100
            const deduction = (basic * parseFloat(payrollData.deductionPT)) / 100
            return basic + bonus - deduction
        }
        return 0
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Process Payroll
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Process Payroll</DialogTitle>
                    <DialogDescription>
                        Select employees and set payroll details to process their salaries.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Employee Selection */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label className="text-base font-medium">Select Employees</Label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleSelectAll}
                            >
                                {selectedEmployees.length === availableEmployees.length ? "Deselect All" : "Select All"}
                            </Button>
                        </div>
                        
                        {isLoadingEmployees ? (
                            <div className="flex items-center justify-center py-4">
                                <div className="text-sm text-gray-500">Loading employees...</div>
                            </div>
                        ) : (
                            <div className="max-h-40 overflow-y-auto border rounded-md p-3 space-y-2">
                                {availableEmployees.map((employee) => (
                                    <div key={employee._id} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id={`employee-${employee._id}`}
                                            checked={selectedEmployees.includes(employee._id)}
                                            onChange={(e) => handleEmployeeSelect(employee._id, e.target.checked)}
                                            className="rounded"
                                        />
                                        <Label htmlFor={`employee-${employee._id}`} className="text-sm">
                                            {employee.firstname} {employee.lastname} - {employee.department?.name || "No Department"}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Payroll Details */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="basicpay">Basic Pay</Label>
                            <Input
                                id="basicpay"
                                type="number"
                                value={payrollData.basicpay}
                                onChange={(e) => setPayrollData(prev => ({ ...prev, basicpay: e.target.value }))}
                                placeholder="Enter basic pay"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="currency">Currency</Label>
                            <Select value={payrollData.currency} onValueChange={(value) => setPayrollData(prev => ({ ...prev, currency: value }))}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="USD">USD</SelectItem>
                                    <SelectItem value="EUR">EUR</SelectItem>
                                    <SelectItem value="GBP">GBP</SelectItem>
                                    <SelectItem value="BDT">BDT</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="bonusePT">Bonus Percentage</Label>
                            <Input
                                id="bonusePT"
                                type="number"
                                value={payrollData.bonusePT}
                                onChange={(e) => setPayrollData(prev => ({ ...prev, bonusePT: e.target.value }))}
                                placeholder="Enter bonus %"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="deductionPT">Deduction Percentage</Label>
                            <Input
                                id="deductionPT"
                                type="number"
                                value={payrollData.deductionPT}
                                onChange={(e) => setPayrollData(prev => ({ ...prev, deductionPT: e.target.value }))}
                                placeholder="Enter deduction %"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="duedate">Due Date</Label>
                        <Input
                            id="duedate"
                            type="date"
                            value={payrollData.duedate}
                            onChange={(e) => setPayrollData(prev => ({ ...prev, duedate: e.target.value }))}
                            required
                        />
                    </div>

                    {/* Net Pay Preview */}
                    {payrollData.basicpay && payrollData.bonusePT && payrollData.deductionPT && (
                        <div className="bg-blue-50 p-3 rounded-md">
                            <div className="text-sm font-medium text-blue-800">Net Pay Preview:</div>
                            <div className="text-lg font-bold text-blue-900">
                                {payrollData.currency} {calculateNetPay().toFixed(2)}
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={selectedEmployees.length === 0}>
                            Process Payroll ({selectedEmployees.length} employees)
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
