import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { api } from "../services/api";
import toast from "react-hot-toast";
import { loadingBus } from "../utils/loadingBus";

interface Admin {
  _id: string;
  username: string;
  email: string;
  role: "admin" | "super_admin";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

interface AuthContextType {
  admin: Admin | null;
  login: (credentials: { email: string; password: string }) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchProfile();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchProfile = async () => {
    // Show loader during initial profile fetch (first paint)
    loadingBus.start();
    try {
      const response = await api.get("/auth/profile");
      setAdmin(response.data.data.admin);
    } catch (error) {
      localStorage.removeItem("authToken");
      delete api.defaults.headers.common["Authorization"];
    } finally {
      setIsLoading(false);
      loadingBus.stop();
    }
  };

  const login = async (credentials: {
    email: string;
    password: string;
  }): Promise<boolean> => {
    try {
      const response = await api.post("/auth/login", credentials);
      const { token, admin: adminData } = response.data.data;

      localStorage.setItem("authToken", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Convert backend 'id' to '_id' for consistency
      const normalizedAdmin = {
        _id: adminData.id || adminData._id,
        username: adminData.username,
        email: adminData.email,
        role: adminData.role,
        isActive: adminData.isActive !== false,
        createdAt: adminData.createdAt || new Date().toISOString(),
        updatedAt: adminData.updatedAt || new Date().toISOString(),
        lastLogin: adminData.lastLogin,
      };

      setAdmin(normalizedAdmin);

      toast.success("Login successful!");
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    delete api.defaults.headers.common["Authorization"];
    setAdmin(null);
    toast.success("Logged out successfully");
  };

  const value = {
    admin,
    login,
    logout,
    isLoading,
    isAuthenticated: !!admin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
