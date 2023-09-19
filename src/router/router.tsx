import { Navigate, createBrowserRouter } from "react-router-dom";
import { Signin } from "../pages/Signin";
import { Signup } from "../pages/Signup";
import { ProjectList } from "../pages/project/ProjectList";
import { Protected } from "./Protected";
import { Layout } from "../components/Layout";
import { ProjectNew } from "../pages/project/ProjectNew";
import { ProjectDashboard } from "../pages/project/ProjectDashboard";
import { Container } from "@chakra-ui/react";
import { getProject } from "../services/project";

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
            element: <ProjectList />,
          },
          {
            path: "new",
            element: <ProjectNew />,
          },
        ],
      },
      {
        path: ":project",
        element: <ProjectDashboard />,
        loader: async ({ params }) => {
          return await getProject(params.project);
        },
        errorElement: <Container>Not Found</Container>,
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
