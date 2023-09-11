import { Navigate, createBrowserRouter } from "react-router-dom";
import { Signin } from "../pages/Signin";
import { Signup } from "../pages/Signup";
import { Project } from "../pages/Project";
import { Protected } from "./Protected";
import { Layout } from "../components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/project" /> },
      {
        path: "project",
        element: <Protected />,
        children: [
          {
            index: true,
            element: <Project />,
          },
        ],
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);

export default router;
