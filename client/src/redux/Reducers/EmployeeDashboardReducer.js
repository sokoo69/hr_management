import { createSlice } from "@reduxjs/toolkit";
import { HandleGetEmployeeDashboard } from "../Thunks/EmployeeDashboardThunk";

const initialState = {
    data: null,
    isLoading: false,
    error: {
        status: false,
        message: ""
    }
}

const EmployeeDashboardSlice = createSlice({
    name: "EmployeeDashboardReducer",
    initialState,
    reducers: {
        clearEmployeeDashboardError: (state) => {
            state.error = {
                status: false,
                message: ""
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(HandleGetEmployeeDashboard.pending, (state) => {
                state.isLoading = true
                state.error = {
                    status: false,
                    message: ""
                }
            })
            .addCase(HandleGetEmployeeDashboard.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload.data
                state.error = {
                    status: false,
                    message: ""
                }
            })
            .addCase(HandleGetEmployeeDashboard.rejected, (state, action) => {
                state.isLoading = false
                state.error = {
                    status: true,
                    message: action.payload?.message || "Failed to load employee dashboard data"
                }
            })
    }
})

export const { clearEmployeeDashboardError } = EmployeeDashboardSlice.actions
export default EmployeeDashboardSlice.reducer
