import { createSlice } from '@reduxjs/toolkit';
import { Tokens, User } from '@/@types/auth';
import { api } from '@/app/services/auth.service';
import { RootState } from '@/app/store';

type AuthState = {
  user: User | null;
  tokens: Tokens | null;
  colorScheme: 'light' | 'dark';
};

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, tokens: null, colorScheme: 'light' } as AuthState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.tokens = null;
    },
    setColorScheme: (state, action) => {
      state.colorScheme = action.payload;
    },

    setAccessToken: (state, action) => {
      if (state.tokens) {
        state.tokens = action.payload;
      }
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
