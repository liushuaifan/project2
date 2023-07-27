import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createHr, deleteHr, fetchHrs, updateHr } from '../services/hr';
import { removeError, addError } from './errorSlice';

const initialState = {
  hrs: [],
  status: 'idle'
};

export const createHrAction = createAsyncThunk(
  'hrs/createHr',
  async (data, thunkAPI) => {
    try {
      const hr = await createHr(data);
      thunkAPI.dispatch(removeError());
      return hr;
    } catch (error) {
      const { hr } = error;
      thunkAPI.dispatch(addError(hr));
      return thunkAPI.rejectWithValue(hr);
    }
  }
);


export const fetchHrsAction = createAsyncThunk(
  'hrs/fetchHrs',
  async (data, thunkAPI) => {
    try {
      const hrs = await fetchHrs(data);
      // thunkAPI.dispatch(removeError());
      return hrs;
    } catch (error) {
      const { hr } = error;
      thunkAPI.dispatch(addError(hr));
      return thunkAPI.rejectWithValue(hr);
    }
  }
);
export const updateHrAction = createAsyncThunk(
  'hrs/updateHrs',
  async (data, thunkAPI) => {
    try {
      // console.log("updateHrAction is called");
      // console.log("data is: ", data)
      const hrs = await updateHr(data);
      // thunkAPI.dispatch(removeError());
      return hrs;
    } catch (error) {
      const { hr } = error;
      thunkAPI.dispatch(addError(hr));
      return thunkAPI.rejectWithValue(hr);
    }
  }
);

export const deleteHrAction = createAsyncThunk(
  'hrs/deleteHrs',
  async (data, thunkAPI) => {
    try {
      // console.log("deleteHrAction is called");
      // console.log("data is: ", data)
      const hrs = await deleteHr(data);
      // thunkAPI.dispatch(removeError());
      return hrs;
    } catch (error) {
      const { hr } = error;
      thunkAPI.dispatch(addError(hr));
      return thunkAPI.rejectWithValue(hr);
    }
  }
);

const hrSlice = createSlice({
  name: 'hrs',
  initialState,
  reducers: {
    // loadHrs: (state, action) => {
    //   state.status = 'pending';
    //   state.hrs = action.payload;
    // }
  },
  extraReducers: builder => {
    builder.addCase(fetchHrsAction.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.hrs = action.payload;
      console.log('fetchHrsAction succeeded');
    });
    builder.addCase(fetchHrsAction.rejected, (state, action) => {
      state.status = 'failed';
      state.hrs = action.payload;
    });
    builder.addCase(fetchHrsAction.pending, (state, action) => {
      state.status = 'pending';
      state.hrs = action.payload;
    });
    builder.addCase(createHrAction.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.hrs.push(action.payload);
    });
    builder.addCase(createHrAction.rejected, (state, action) => {
      state.status = 'failed';
    });
    builder.addCase(createHrAction.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(updateHrAction.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.hrs = state.hrs.map(hr =>
        hr._id === action.payload._id ? action.payload : hr
      );
    });
    builder.addCase(updateHrAction.rejected, (state, action) => {
      state.status = 'failed';
    });
    builder.addCase(updateHrAction.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(deleteHrAction.fulfilled, (state, action) => {
      state.status = 'succeeded';
    });
    builder.addCase(deleteHrAction.rejected, (state, action) => {
      state.status = 'failed';
    });
    builder.addCase(deleteHrAction.pending, (state, action) => {
      state.status = 'pending';
    });
  }
});

// export const { loadHrs } = hrSlice.actions;

export default hrSlice.reducer;