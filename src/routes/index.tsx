import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AutRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { useAuth } from "../hooks/auth";

export function Routes() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      {user.id ? <AppRoutes /> : <AutRoutes />}
    </NavigationContainer>
  );
}
