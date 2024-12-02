import React, { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import { Navigate } from "react-router-dom";
import useIsAuth from "./useIsAuth";

function ProtectedRoute({ children }) {
    const { user, userChecked } = useContext(AuthContext);

    return userChecked ? (
        user ? (
            <>
                {children}
            </>
        ) : (
            <Navigate to={'/'} replace={true} />
        )
    ) : null; 
}

export default ProtectedRoute;

