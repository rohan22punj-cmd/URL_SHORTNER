import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./rootRoute";
import { homePageRoute } from "./homePage";
import { authRoute } from "./authRoute";
import { dashboardRoute } from "./dashBoard";

export const routeTree = rootRoute.addChildren([
  homePageRoute,
  authRoute,
  dashboardRoute,
]);

export const router = createRouter({ routeTree });
