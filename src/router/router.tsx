import { Navigate, createBrowserRouter } from "react-router-dom";
import { Signin } from "../pages/Signin";
import { Signup } from "../pages/Signup";
import { Home } from "../pages/Home";
import { Protected } from "./Protected";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/home",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
]);

export default router;
