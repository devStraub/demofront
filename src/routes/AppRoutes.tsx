import { Routes } from "react-router-dom";
import { AuthRoutes } from "./AuthRoutes";
import { PrivateRoutes } from "./PrivateRoutes";

export const AppRoutes = () => {
  return (
    <Routes>
      {AuthRoutes()}
      {PrivateRoutes()}
    </Routes>
  );
};