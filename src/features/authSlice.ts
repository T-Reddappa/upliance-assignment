import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const AUTH_TOKEN_KEY = "auth_token";
const USER_DATA_KEY = "user_data";

const mockUsers = [
  {
    id: "1",
    email: "upliance@gmail.com",
    password: "password123",
    name: "upliance",
  },
];

const mockAuthDelay = () => {
  return new Promise((resolve) => setTimeout(resolve, 1500));
};

const saveAuthData = (user: any, token: string) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
};

const clearAuthData = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);
};

const generateMockToken = (userId: string) => {
  return `mock-token-${userId}-${Date.now()}`;
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      await mockAuthDelay();
      const user = mockUsers.find(
        (user) => user.email === email && user.password === password
      );
      if (!user) {
        throw new Error("Invalid Credentials");
      }
      const { password: _, ...userWithoutPassword } = user;
      const token = generateMockToken(user.id);
      saveAuthData(userWithoutPassword, token);
      return { user: userWithoutPassword, token };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (
    {
      email,
      password,
      name,
    }: { email: string; password: string; name: string },
    { rejectWithValue }
  ) => {
    try {
      await mockAuthDelay();
      const existingUser = mockUsers.find((user) => user.email === email);
      if (existingUser) {
        throw new Error("Email already exists");
      }

      const newUser = {
        id: String(mockUsers.length + 1),
        email,
        password,
        name,
      };
      mockUsers.push(newUser);
      const { password: _, ...userWithoutPassword } = newUser;
      const token = generateMockToken(newUser.id);
      saveAuthData(userWithoutPassword, token);
      return { user: userWithoutPassword, token };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const initializeAuth = createAsyncThunk(
  "auth/initialize",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      const userData = localStorage.getItem(USER_DATA_KEY);

      if (!token || !userData) {
        throw new Error("No auth data found");
      }
      return {
        user: JSON.parse(userData),
        token,
      };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      clearAuthData();
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload as string;
      })
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      });
  },
});

export const { signOut, clearError } = authSlice.actions;
export default authSlice.reducer;
