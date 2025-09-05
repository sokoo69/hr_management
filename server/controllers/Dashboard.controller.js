import { Employee } from "../models/Employee.model.js"
import { Department } from "../models/Department.model.js"
import { Leave } from "../models/Leave.model.js"
import { Salary } from "../models/Salary.model.js"
import { Notice } from "../models/Notice.model.js"
import { GenerateRequest } from "../models/GenerateRequest.model.js"
import { Balance } from "../models/Balance.model.js"

export const HandleHRDashboard = async (req, res) => {
    try {
        const employees = await Employee.countDocuments({ organizationID: req.ORGID })
        const departments = await Department.countDocuments({ organizationID: req.ORGID })
        const leaves = await Leave.countDocuments({ organizationID: req.ORGID })
        const requestes = await GenerateRequest.countDocuments({ organizationID: req.ORGID })
        const balance = await Balance.find({ organizationID: req.ORGID })
        const notices = await Notice.find({ organizationID: req.ORGID }).sort({ createdAt: -1 }).limit(10).populate("createdby", "firstname lastname")

        return res.status(200).json({ success: true, data: { employees: employees, departments: departments, leaves: leaves, requestes: requestes, balance: balance, notices: notices } })
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error, message: "internal server error" })
    }
}

export const HandleEmployeeDashboard = async (req, res) => {
    try {
        // Get employee-specific data
        const employee = await Employee.findById(req.EMid).select('firstname lastname email departmentID')
        const employeeLeaves = await Leave.find({ employeeID: req.EMid })
        const employeeRequests = await GenerateRequest.find({ employeeID: req.EMid })
        const employeeBalance = await Balance.find({ employeeID: req.EMid })
        const notices = await Notice.find({ organizationID: req.ORGID }).sort({ createdAt: -1 }).limit(10).populate("createdby", "firstname lastname")

        return res.status(200).json({ 
            success: true, 
            data: { 
                employee: employee,
                leaves: employeeLeaves, 
                requests: employeeRequests, 
                balance: employeeBalance, 
                notices: notices 
            } 
        })
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error, message: "internal server error" })
    }
}