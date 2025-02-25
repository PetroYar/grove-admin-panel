import { useContext } from "react";
import { AuthContext } from "../store/authContext";

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
