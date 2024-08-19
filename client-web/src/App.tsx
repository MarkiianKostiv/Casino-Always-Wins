import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { Rating } from "./pages/Rating";
import { UserProfile } from "./pages/UserProfile";
import { AboutUS } from "./pages/AboutUs";
import { TermsOfUse } from "./pages/TermsOfService";

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoute />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/rating", element: <Rating /> },
        { path: "/my-profile", element: <UserProfile /> },
      ],
    },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/sign-up", element: <SignUp /> },
    { path: "/privacy-policy", element: <PrivacyPolicy /> },
    { path: "/terms_of_service", element: <TermsOfUse /> },
    { path: "/about_us", element: <AboutUS /> },
    {
      path: "*",
      element: (
        <Navigate
          to='/'
          replace
        />
      ),
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
