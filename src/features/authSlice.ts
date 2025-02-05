import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AUTH_TOKEN_KEY,
  AuthState,
  clearAuthData,
  generateMockToken,
  mockAuthDelay,
  saveAuthData,
  USER_DATA_KEY,
} from "../utils/types";
import { Email } from "@mui/icons-material";

// Mock user database
const mockUsers = [
  {
    id: "1",
    email: "test@test.com",
    password: "password123",
    name: "Test User",
  },
  {
    id: "2",
    email: "upliance@gmail.com",
    password: "password123",
    name: "Upliance",
  },
];

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      await mockAuthDelay();
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        throw new Error("Invalid credentials");
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
      const existingUser = mockUsers.find((u) => u.email === email);
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

// New thunk to initialize auth state from localStorage
export const initializeAuth = createAsyncThunk(
  "auth/initialize",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      const userData = localStorage.getItem(USER_DATA_KEY);
      console.log(token, userData);

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
      // Sign In cases
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
      // Sign Up cases
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
      // Initialize auth cases
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
