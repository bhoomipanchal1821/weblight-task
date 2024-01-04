import { configureStore } from '@reduxjs/toolkit';
import repositoriesReducer from './repositoriesSlice';



export const store = configureStore({
  reducer: {
    repositories: repositoriesReducer,
  
   
  
  },
});
