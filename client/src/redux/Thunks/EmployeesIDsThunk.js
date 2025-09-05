import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/APIService";
import { EmployeesIDsEndPoints } from "../apis/APIsEndpoints";

export const HandleGetAllEmployeesIDs = createAsyncThunk("HandleGetAllEmployeesIDs", async (fetchdata, { rejectWithValue }) => {
    try {
        const { apiroute } = fetchdata
        const response = await apiService.get(`${EmployeesIDsEndPoints[apiroute]}`, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})