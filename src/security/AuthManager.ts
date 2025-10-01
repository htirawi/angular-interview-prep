/**
 * Authentication and Authorization System
 * Provides secure user session management
 */

export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin" | "moderator";
  permissions: string[];
  lastLogin: Date;
  isActive: boolean;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  tokenType: "Bearer";
}

export interface AuthState {
  user: User | null;
  token: AuthToken | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export class AuthManager {
  private state: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };

  private readonly TOKEN_KEY = "auth_token";
  private readonly USER_KEY = "user_data";
  private readonly REFRESH_KEY = "refresh_token";

  async login(email: string, password: string): Promise<void> {
    this.setState({ isLoading: true, error: null });

    try {
      // Simulate API call - replace with actual authentication
      const response = await this.mockAuthAPI(email, password);

      if (response.success) {
        const { user, token } = response.data;

        // Store tokens securely
        this.storeTokens(token);
        this.storeUser(user);

        this.setState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        throw new Error(response.error || "Login failed");
      }
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error.message : "Login failed",
        isLoading: false,
      });
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      // Clear stored data
      this.clearStoredData();

      // Reset state
      this.setState({
        user: null,
        token: null,
        isAuthenticated: false,
        error: null,
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  async refreshToken(): Promise<boolean> {
    const refreshToken = this.getStoredRefreshToken();
    if (!refreshToken) return false;

    try {
      const response = await this.mockRefreshAPI(refreshToken);

      if (response.success) {
        const { token } = response.data;
        this.storeTokens(token);
        this.setState({ token });
        return true;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      this.logout();
    }

    return false;
  }

  hasPermission(permission: string): boolean {
    if (!this.state.user) return false;
    return this.state.user.permissions.includes(permission) || this.state.user.role === "admin";
  }

  hasRole(role: string): boolean {
    return this.state.user?.role === role;
  }

  isTokenExpired(): boolean {
    if (!this.state.token) return true;
    return new Date() >= this.state.token.expiresAt;
  }

  async checkAuthStatus(): Promise<void> {
    const token = this.getStoredToken();
    const user = this.getStoredUser();

    if (token && user) {
      if (this.isTokenExpired()) {
        const refreshed = await this.refreshToken();
        if (!refreshed) {
          this.logout();
          return;
        }
      }

      this.setState({
        user,
        token,
        isAuthenticated: true,
      });
    }
  }

  // Private methods
  private setState(updates: Partial<AuthState>): void {
    this.state = { ...this.state, ...updates };
  }

  private storeTokens(token: AuthToken): void {
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(token));
    localStorage.setItem(this.REFRESH_KEY, token.refreshToken);
  }

  private storeUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  private getStoredToken(): AuthToken | null {
    try {
      const tokenData = localStorage.getItem(this.TOKEN_KEY);
      return tokenData ? JSON.parse(tokenData) : null;
    } catch {
      return null;
    }
  }

  private getStoredUser(): User | null {
    try {
      const userData = localStorage.getItem(this.USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  }

  private getStoredRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_KEY);
  }

  private clearStoredData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
  }

  // Mock API methods - replace with actual API calls
  private async mockAuthAPI(email: string, password: string): Promise<unknown> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock successful login for demo
    if (email === "admin@example.com" && password === "admin123") {
      return {
        success: true,
        data: {
          user: {
            id: "1",
            email: "admin@example.com",
            name: "Admin User",
            role: "admin",
            permissions: ["read", "write", "delete", "admin"],
            lastLogin: new Date(),
            isActive: true,
          },
          token: {
            accessToken: "mock_access_token",
            refreshToken: "mock_refresh_token",
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
            tokenType: "Bearer",
          },
        },
      };
    }

    return {
      success: false,
      error: "Invalid credentials",
    };
  }

  private async mockRefreshAPI(_refreshToken: string): Promise<unknown> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      data: {
        token: {
          accessToken: "new_mock_access_token",
          refreshToken: "new_mock_refresh_token",
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
          tokenType: "Bearer",
        },
      },
    };
  }

  // Getters
  getState(): AuthState {
    return { ...this.state };
  }

  getCurrentUser(): User | null {
    return this.state.user;
  }

  isAuthenticated(): boolean {
    return this.state.isAuthenticated;
  }
}

// Singleton instance
export const authManager = new AuthManager();
