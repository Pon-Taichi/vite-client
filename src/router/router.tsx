import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Signin } from "../pages/Signin";
import { Signup } from "../pages/Signup";
import { ProjectList } from "../pages/project/ProjectList";
import { Layout } from "../components/Layout";
import { ProjectNew } from "../pages/project/ProjectNew";
import { ProjectDashboard } from "../pages/project/ProjectDashboard";
import { getProject } from "../services/project";
import { Authorized } from "./Authorized";
import { NotAuthorized } from "./NotAuthorized";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/project" />} />

        <Route element={<NotAuthorized />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<Authorized />}>
          <Route path="/project">
            <Route index={true} element={<ProjectList />} />
            <Route path="new" element={<ProjectNew />} />
            <Route
              path=":project"
              element={<ProjectDashboard />}
              loader={({ params }) => {
                return getProject(params.project);
              }}
            />
          </Route>
        </Route>
      </Route>
    </>
  )
);

export default router;
