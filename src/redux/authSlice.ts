import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuth: boolean;
}

const initialState: AuthState = {
  isAuth: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: { payload: boolean }) => {
      state.isAuth = action.payload;
    }
  }
});

export const { setAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
