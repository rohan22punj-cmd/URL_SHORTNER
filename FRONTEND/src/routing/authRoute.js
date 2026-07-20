import { createRoute } from "@tanstack/react-router";
import AuthPage from "../pages/authPage";
import { rootRoute } from "./rootRoute";

export const authRoute = createRoute({ getParentRoute: () => rootRoute, path: "/auth", component: AuthPage });
