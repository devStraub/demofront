import { Route } from "react-router-dom";
import { LoginPage } from "../features/auth/pages/LoginPage";


export const AuthRoutes = () => {
  return (
    <>
      <Route path="/login" element={<LoginPage />} />
    </>
  );
};