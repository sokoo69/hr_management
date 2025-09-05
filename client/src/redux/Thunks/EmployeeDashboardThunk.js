import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { EmployeeDashboardEndPoints } from "../apis/APIsEndpoints";

export const HandleGetEmployeeDashboard = createAsyncThunk("HandleGetEmployeeDashboard", async (DashboardData, { rejectWithValue }) => {
    try {
        const { apiroute } = DashboardData
        const response = await apiService.get(`${EmployeeDashboardEndPoints[apiroute]}`, { 
            withCredentials: true
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data); 
    }
})
