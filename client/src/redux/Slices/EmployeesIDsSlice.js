import { createSlice } from '@reduxjs/toolkit';
import { HandleGetAllEmployeesIDs } from '../Thunks/EmployeesIDsThunk.js';
import { EmployeesIDsAsyncReducer } from '../AsyncReducers/asyncreducer.js';

const EmployeesIDsSlice = createSlice({
    name: 'EmployeesIDs',
    initialState: {
        data: null,
        isLoading: false,
        isSuccess: false,
        error: {
            status: false,
            message: null,
            content: null
        }
    },
    extraReducers: (builder) => {
        EmployeesIDsAsyncReducer(builder, HandleGetAllEmployeesIDs)
    }
})

export default EmployeesIDsSlice.reducer