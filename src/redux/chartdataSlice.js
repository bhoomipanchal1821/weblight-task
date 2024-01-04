import { createSlice } from "@reduxjs/toolkit";

const chartDataSlice = createSlice({
  name: "commitData",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchCommitDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCommitDataSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchCommitDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCommitDataStart,
  fetchCommitDataSuccess,
  fetchCommitDataFailure,
} = chartDataSlice.actions;

export default chartDataSlice.reducer;
