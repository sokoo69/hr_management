import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { SalaryEndPoints } from "../apis/APIsEndpoints";

export const HandleGetAllSalaries = createAsyncThunk("HandleGetAllSalaries", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(SalaryEndPoints.GETALL, { 
            withCredentials: true
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: "Failed to fetch salaries" }); 
    }
})

export const HandleCreateSalary = createAsyncThunk("HandleCreateSalary", async (salaryData, { rejectWithValue }) => {
    try {
        const response = await apiService.post(SalaryEndPoints.CREATE, salaryData, { 
            withCredentials: true
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: "Failed to create salary" }); 
    }
})

export const HandleGetSalary = createAsyncThunk("HandleGetSalary", async (salaryID, { rejectWithValue }) => {
    try {
        const response = await apiService.get(SalaryEndPoints.GETONE(salaryID), { 
            withCredentials: true
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: "Failed to fetch salary" }); 
    }
})

export const HandleUpdateSalary = createAsyncThunk("HandleUpdateSalary", async (salaryData, { rejectWithValue }) => {
    try {
        const response = await apiService.patch(SalaryEndPoints.UPDATE, salaryData, { 
            withCredentials: true
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: "Failed to update salary" }); 
    }
})

export const HandleDeleteSalary = createAsyncThunk("HandleDeleteSalary", async (salaryID, { rejectWithValue }) => {
    try {
        const response = await apiService.delete(SalaryEndPoints.DELETE(salaryID), { 
            withCredentials: true
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: "Failed to delete salary" }); 
    }
})

export const HandleProcessPayroll = createAsyncThunk("HandleProcessPayroll", async (payrollData, { rejectWithValue }) => {
    try {
        const response = await apiService.post(SalaryEndPoints.PROCESS_PAYROLL, payrollData, { 
            withCredentials: true
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: "Failed to process payroll" }); 
    }
})
