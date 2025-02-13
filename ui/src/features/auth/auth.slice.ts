import { createSlice } from '@reduxjs/toolkit';
import { Tokens, User } from '@/@types/auth';
import { api } from '@/app/services/auth.service';
import { RootState } from '@/app/store';

type AuthState = {
  user: User | null;
  tokens: Tokens | null;
};

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, tokens: null } as AuthState,
  reducers: {
    logout: (state) => {
      window.location.href = '/';
      state.user = null;
      state.tokens = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.tokens = payload.tokens;
      state.user = payload.user;
    });
    builder.addMatcher(api.endpoints.signUp.matchFulfilled, (state, { payload }) => {
      state.tokens = payload.tokens;
      state.user = payload.user;
    });
  },
});

export default slice.reducer;
export const authActions = slice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
