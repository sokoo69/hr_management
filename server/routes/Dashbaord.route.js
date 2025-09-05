import express from "express"
import { HandleHRDashboard, HandleEmployeeDashboard } from "../controllers/Dashboard.controller.js"
import { VerifyhHRToken, VerifyEmployeeToken } from "../middlewares/Auth.middleware.js"
import { RoleAuthorization } from "../middlewares/RoleAuth.middleware.js"

const router = express.Router()

router.get("/HR-dashboard", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleHRDashboard) 
router.get("/employee-dashboard", VerifyEmployeeToken, HandleEmployeeDashboard)

export default router