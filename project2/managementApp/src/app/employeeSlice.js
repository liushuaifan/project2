import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createEmployee, deleteEmployee, fetchEmployees, updateEmployee } from '../services/employee';
import { removeError, addError } from './errorSlice';

const initialState = {
  employees: [],
  status: 'idle'
};

export const createEmployeeAction = createAsyncThunk(
  'employees/createEmployee',
  async (data, thunkAPI) => {
    try {
      const employee = await createEmployee(data);
      thunkAPI.dispatch(removeError());
      return employee;
    } catch (error) {
      const { employee } = error;
      thunkAPI.dispatch(addError(employee));
      return thunkAPI.rejectWithValue(employee);
    }
  }
);


export const fetchEmployeesAction = createAsyncThunk(
  'employees/fetchEmployees',
  async (data, thunkAPI) => {
    try {
      const employees = await fetchEmployees(data);
      // thunkAPI.dispatch(removeError());
      return employees;
    } catch (error) {
      const { employee } = error;
      thunkAPI.dispatch(addError(employee));
      return thunkAPI.rejectWithValue(employee);
    }
  }
);
export const updateEmployeeAction = createAsyncThunk(
  'employees/updateEmployees',
  async (data, thunkAPI) => {
    try {
      // console.log("updateEmployeeAction is called");
      // console.log("data is: ", data)
      const employees = await updateEmployee(data);
      // thunkAPI.dispatch(removeError());
      return employees;
    } catch (error) {
      const { employee } = error;
      thunkAPI.dispatch(addError(employee));
      return thunkAPI.rejectWithValue(employee);
    }
  }
);

export const deleteEmployeeAction = createAsyncThunk(
  'employees/deleteEmployees',
  async (data, thunkAPI) => {
    try {
      // console.log("deleteEmployeeAction is called");
      // console.log("data is: ", data)
      const employees = await deleteEmployee(data);
      // thunkAPI.dispatch(removeError());
      return employees;
    } catch (error) {
      const { employee } = error;
      thunkAPI.dispatch(addError(employee));
      return thunkAPI.rejectWithValue(employee);
    }
  }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    // loadEmployees: (state, action) => {
    //   state.status = 'pending';
    //   state.employees = action.payload;
    // }
  },
  extraReducers: builder => {
    builder.addCase(fetchEmployeesAction.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.employees = action.payload;
      console.log('fetchEmployeesAction succeeded');
    });
    builder.addCase(fetchEmployeesAction.rejected, (state, action) => {
      state.status = 'failed';
      state.employees = action.payload;
      console.log('fetchEmployeesAction failed');
    });
    builder.addCase(fetchEmployeesAction.pending, (state, action) => {
      state.status = 'pending';
      state.employees = action.payload;
      console.log('fetchEmployeesAction pending');
    });
    builder.addCase(createEmployeeAction.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.employees.push(action.payload);
    });
    builder.addCase(createEmployeeAction.rejected, (state, action) => {
      state.status = 'failed';
    });
    builder.addCase(createEmployeeAction.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(updateEmployeeAction.fulfilled, (state, action) => {
      state.status = 'succeeded';
      console.log(state.employees)
      console.log(action.payload)
      state.employees = state.employees.map(employee =>
        employee._id === action.payload._id ? action.payload : employee
      );
    });
    builder.addCase(updateEmployeeAction.rejected, (state, action) => {
      state.status = 'failed';
    });
    builder.addCase(updateEmployeeAction.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(deleteEmployeeAction.fulfilled, (state, action) => {
      state.status = 'succeeded';
    });
    builder.addCase(deleteEmployeeAction.rejected, (state, action) => {
      state.status = 'failed';
    });
    builder.addCase(deleteEmployeeAction.pending, (state, action) => {
      state.status = 'pending';
    });
  }
});

// export const { loadEmployees } = employeeSlice.actions;

export default employeeSlice.reducer;
