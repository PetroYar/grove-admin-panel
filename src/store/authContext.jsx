import { createContext, useState, useEffect } from "react";
import { getData, postData } from "../libs/services";
import { useNavigate } from "react-router";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getAdmin();
  }, []);

  const getAdmin = async () => {
    try {
      const req = await getData("/admin");
      setAdmin(req);
      navigate("/");
    } catch (error) {
      console.error(error);
      setAdmin(null);
    }
  };

  const handleLogin = async (name, password) => {
    const credentials = { name, password };

    try {
      const req = await postData("/admin/login", credentials);
      localStorage.setItem("token", req.token);
      getAdmin();
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const cxv = {
    admin,
    handleLogin,
    getAdmin,
  };
  return <AuthContext.Provider value={cxv}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
