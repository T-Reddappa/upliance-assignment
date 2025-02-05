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

export const AUTH_TOKEN_KEY = "auth_token";
export const USER_DATA_KEY = "user_data";

export const mockAuthDelay = () =>
  new Promise((resolve) => setTimeout(resolve, 1000));

export const saveAuthData = (user: any, token: string) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
};

export const clearAuthData = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);
};

export const generateMockToken = (userId: string) => {
  return `mock-token-${userId}-${Date.now()}`;
};
