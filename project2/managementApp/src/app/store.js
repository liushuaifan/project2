import { configureStore } from '@reduxjs/toolkit';

import employeeReducer from './employeeSlice';
import hrReducer from './hrSlice'
import errorReducer from './errorSlice';

export default configureStore({
  reducer: {
    employees: employeeReducer,
    hrs: hrReducer,
    error: errorReducer,
  },
  devTools: true
});