import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AdminPage from "./pages/AdminPage";
import {
  createHashRouter,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { loader as AdminLoader } from "./pages/AdminPage";
import { RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import { getCookie } from "./stores/Cookie";

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
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  useEffect(() => {
    async function verifyToken() {
      try {
        const res = await fetch(
          "https://PhoneShopBackEnd.onrender.com/auth/verify-token",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          window.alert("Please sign in first!");
          navigate("/login");
        }

        console.log("Response in verifyToken: ", await res.json());
      } catch (error) {
        window.alert("Please sign in first!");
        navigate("/login");
      } finally {
        setChecking(false);
      }
    }
    verifyToken();
  }, [navigate]);

  if (checking) return null;
  return <Outlet />;
}
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
