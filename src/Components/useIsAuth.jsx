import React, { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

function useIsAuth() {
    const { user } = useContext(AuthContext);
    const isAuthenticated = user !== null ? true : false;
    return isAuthenticated
}
export default useIsAuth