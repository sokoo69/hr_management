import { createSlice } from "@reduxjs/toolkit";
import { HandleGetAllSalaries, HandleCreateSalary, HandleGetSalary, HandleUpdateSalary, HandleDeleteSalary, HandleProcessPayroll } from "../Thunks/SalaryThunk";

const initialState = {
    data: [],
    currentSalary: null,
    isLoading: false,
    error: {
        status: false,
        message: ""
    }
}

const SalarySlice = createSlice({
    name: "SalaryReducer",
    initialState,
    reducers: {
        clearSalaryError: (state) => {
            state.error = {
                status: false,
                message: ""
            }
        },
        clearCurrentSalary: (state) => {
            state.currentSalary = null
        }
    },
    extraReducers: (builder) => {
        builder
            // Get All Salaries
            .addCase(HandleGetAllSalaries.pending, (state) => {
                state.isLoading = true
                state.error = {
                    status: false,
                    message: ""
                }
            })
            .addCase(HandleGetAllSalaries.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload.data || []
                state.error = {
                    status: false,
                    message: ""
                }
            })
            .addCase(HandleGetAllSalaries.rejected, (state, action) => {
                state.isLoading = false
                state.error = {
                    status: true,
                    message: action.payload?.message || "Failed to load salaries"
                }
            })
            // Create Salary
            .addCase(HandleCreateSalary.pending, (state) => {
                state.isLoading = true
                state.error = {
                    status: false,
                    message: ""
                }
            })
            .addCase(HandleCreateSalary.fulfilled, (state, action) => {
                state.isLoading = false
                state.data.push(action.payload.data)
                state.error = {
                    status: false,
                    message: ""
                }
            })
            .addCase(HandleCreateSalary.rejected, (state, action) => {
                state.isLoading = false
                state.error = {
                    status: true,
                    message: action.payload?.message || "Failed to create salary"
                }
            })
            // Get Single Salary
            .addCase(HandleGetSalary.pending, (state) => {
                state.isLoading = true
                state.error = {
                    status: false,
                    message: ""
                }
            })
            .addCase(HandleGetSalary.fulfilled, (state, action) => {
                state.isLoading = false
                state.currentSalary = action.payload.data
                state.error = {
                    status: false,
                    message: ""
                }
            })
            .addCase(HandleGetSalary.rejected, (state, action) => {
                state.isLoading = false
                state.error = {
                    status: true,
                    message: action.payload?.message || "Failed to fetch salary"
                }
            })
            // Update Salary
            .addCase(HandleUpdateSalary.pending, (state) => {
                state.isLoading = true
                state.error = {
                    status: false,
                    message: ""
                }
            })
            .addCase(HandleUpdateSalary.fulfilled, (state, action) => {
                state.isLoading = false
                const updatedSalary = action.payload.data
                const index = state.data.findIndex(salary => salary._id === updatedSalary._id)
                if (index !== -1) {
                    state.data[index] = updatedSalary
                }
                state.error = {
                    status: false,
                    message: ""
                }
            })
            .addCase(HandleUpdateSalary.rejected, (state, action) => {
                state.isLoading = false
                state.error = {
                    status: true,
                    message: action.payload?.message || "Failed to update salary"
                }
            })
            // Delete Salary
            .addCase(HandleDeleteSalary.pending, (state) => {
                state.isLoading = true
                state.error = {
                    status: false,
                    message: ""
                }
            })
            .addCase(HandleDeleteSalary.fulfilled, (state, action) => {
                state.isLoading = false
                const deletedSalaryId = action.payload.data._id
                state.data = state.data.filter(salary => salary._id !== deletedSalaryId)
                state.error = {
                    status: false,
                    message: ""
                }
            })
            .addCase(HandleDeleteSalary.rejected, (state, action) => {
                state.isLoading = false
                state.error = {
                    status: true,
                    message: action.payload?.message || "Failed to delete salary"
                }
            })
            // Process Payroll
            .addCase(HandleProcessPayroll.pending, (state) => {
                state.isLoading = true
                state.error = {
                    status: false,
                    message: ""
                }
            })
            .addCase(HandleProcessPayroll.fulfilled, (state, action) => {
                state.isLoading = false
                // Add the newly created salaries to the data array
                if (action.payload.data && action.payload.data.processedSalaries) {
                    action.payload.data.processedSalaries.forEach(item => {
                        state.data.push(item.salary)
                    })
                }
                state.error = {
                    status: false,
                    message: ""
                }
            })
            .addCase(HandleProcessPayroll.rejected, (state, action) => {
                state.isLoading = false
                state.error = {
                    status: true,
                    message: action.payload?.message || "Failed to process payroll"
                }
            })
    }
})

export const { clearSalaryError, clearCurrentSalary } = SalarySlice.actions
export default SalarySlice.reducer
