// "use client";
// /* eslint-disable @typescript-eslint/no-explicit-any */

// import {
//   createContext,
//   ReactNode,
//   useState,
//   useContext,
//   useEffect,
// } from "react";
// import Cookies from "js-cookie";

// interface AuthContextType {
//   isAuthenticated: boolean;
//   user: any;
//   setUser: React.Dispatch<React.SetStateAction<any>>;
//   logout: () => void;
// }

// const initialValue = {
//   isAuthenticated: false,
//   user: null,
//   setUser: () => {},
//   logout: () => {},
// };

// export const AuthContext = createContext<AuthContextType>(initialValue);

// const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     () => !!Cookies.get("access_token")
//   );
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const localUser = localStorage.getItem("user");
//     if (localUser !== undefined && !user) {
//       setUser(() => JSON.parse(localUser as string));
//     }
//     setIsAuthenticated(() => !!Cookies.get("access_token"));
//   }, [user]);

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//     Cookies.remove("access_token");
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, setUser, user, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;

// export const useAuth = () => {
//   if (!AuthContext) {
//     console.log("useAuth must be used inside Auth provider");
//   }
//   return useContext(AuthContext);
// };
"use client";

import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  isAuthenticated: boolean;
  user: unknown;
  setUser: React.Dispatch<React.SetStateAction<unknown>>;
  logout: () => void;
  loading: boolean;
}

const initialValue: AuthContextType = {
  isAuthenticated: false,
  user: null,
  setUser: () => {},
  logout: () => {},
  loading: true,
};

export const AuthContext = createContext<AuthContextType>(initialValue);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!Cookies.get("access_token")
  );
  const [user, setUser] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localUser = localStorage.getItem("user");

    if (localUser && localUser !== "undefined" && !user) {
      try {
        setUser(JSON.parse(localUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        localStorage.removeItem("user");
      }
    }

    setIsAuthenticated(!!Cookies.get("access_token"));
    setLoading(false);
  }, [user]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    Cookies.remove("access_token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setUser, user, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
