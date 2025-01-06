import React from "react";
import {Navigate} from "react-router-dom";
import {useUserStore} from "../../store/globalStore.ts";

interface ProtectedRouteProps {
    redirectTo: string;
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
                                                           redirectTo,
                                                           children
                                                       }) => {


    const {authorized, setAuthorized} = useUserStore();

    if (authorized) {
        return <>{children}</>;
    }
    return <Navigate to={redirectTo}/>;
}

export default ProtectedRoute;