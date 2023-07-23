import { configureStore } from '@reduxjs/toolkit';

import employeeReducer from './employeeSlice';
import errorReducer from './errorSlice';

export default configureStore({
  reducer: {
    employees: employeeReducer,
    error: errorReducer,
  },
  devTools: true
});