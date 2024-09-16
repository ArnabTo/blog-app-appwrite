// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from './features/authSlice';

// const store = configureStore({
//     reducer:{
//         auth: authReducer,
//     }
// })

// export default store;

import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice';
import blogSupportReducer from './features/blogSuppoertSlice';
export const makeStore = () => {
  return configureStore({
    reducer: {
        auth: authReducer,
        blogSupport: blogSupportReducer
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']