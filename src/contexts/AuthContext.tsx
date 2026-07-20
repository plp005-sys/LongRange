import React, { createContext, useContext, useState } from "react";

interface User {
  id: string;
  email?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Mock logged in user for now
  const [user, setUser] = useState<User | null>({ id: "1", email: "admin@example.com", role: "admin" });
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
