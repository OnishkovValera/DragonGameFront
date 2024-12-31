import React from "react";
import { Navigate } from "react-router-dom";
import {useUserStore} from "../../store/globalStore.ts";

interface ProtectedRouteProps {
    redirectTo: string;
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
                                                           redirectTo,
                                                           children,
                                                       }) => {
    const currentUser = useUserStore((state) => state.user);
    console.log(currentUser);
    if (!currentUser) {
        return <Navigate to={redirectTo} />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;