import { Route } from "react-router-dom";
import { PrivateRoute } from "../features/auth/components/PrivateRoute";
import { MainLayout } from "../layouts/MainLayout";
import { HomePage } from "../features/home/pages/HomePage";


// páginas


export const PrivateRoutes = () => {
    return (
        <Route
            path="/"
            element={
                <PrivateRoute>
                    <MainLayout />
                </PrivateRoute>
            }
        >
            <Route index element={<HomePage />} />
        </Route>
    );
};