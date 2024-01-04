import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const GITHUB_API_URL = 'https://api.github.com/search/repositories?q=created:%3E2017-10-22&sort=stars&order=desc';

export const fetchRepositories = createAsyncThunk('repositories/fetchRepositories', async (params) => {
  const url = new URL(GITHUB_API_URL);
  url.search = new URLSearchParams(params).toString();

  const response = await fetch(url);
  const data = await response.json();

  return data.items;
});

const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRepositories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchRepositories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default repositoriesSlice.reducer;
