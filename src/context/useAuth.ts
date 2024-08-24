import { useContext } from "react";
import { AuthContext } from "./authContext";

const useAuth = () => {
    const userData = useContext(AuthContext);
    return userData;
};

export default useAuth;