import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import Home from "./Pages/Home.jsx";
import Registration from "./Pages/Registration.jsx";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Config from "./Pages/Config.jsx";
import { CardsContextProvider } from "./Components/Context/CardsContext.jsx";
import AnimalDetails from "./Pages/AnimalDetails.jsx";
import { AuthContextProvider } from "./Components/Context/AuthContext.jsx";
import ProtectedRoute from "./Components/ProtectedRoute";
import Profile from "./Pages/Profile.jsx";
import { FilterContextProvider } from "./Components/Context/FIlterContext.jsx";
import PasswordReset from "./Pages/PasswordReset.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/content",
    element: (
      <ProtectedRoute>
        <Config />
      </ProtectedRoute>
    ),
  },
  {
    path: "/animals/:animalId",
    element: (
      <ProtectedRoute>
        <AnimalDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/password-reset",
    element: <PasswordReset />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <FilterContextProvider>
        <RouterProvider router={router} />
      </FilterContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
