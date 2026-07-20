import { createRoute } from "@tanstack/react-router";
import DashboardPage from "../pages/DashboardPage";
import { rootRoute } from "./rootRoute";

export const dashboardRoute = createRoute({ getParentRoute: () => rootRoute, path: "/dashboard", component: DashboardPage });
