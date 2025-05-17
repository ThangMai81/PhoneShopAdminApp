import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AdminPage from "./pages/AdminPage";
import { createHashRouter, Navigate, Outlet } from "react-router-dom";
import { loader as AdminLoader } from "./pages/AdminPage";
import { RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";

const router = createHashRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <AdminPage />,
        loader: AdminLoader,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

function ProtectedRoute() {
  const token = localStorage.getItem("admin-token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
