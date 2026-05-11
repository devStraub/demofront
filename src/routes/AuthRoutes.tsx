import { Route } from "react-router-dom";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { AuthLayout } from "../layouts/AuthLayout";
import { RegisterPage } from "../features/auth/pages/RegisterPage";


export const AuthRoutes = () => {
  return (
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Route>
  );
};