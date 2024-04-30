import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AmplifyProvider, Authenticator } from "@aws-amplify/ui-react";
import LoginTheme from "./components/LoginTheme/LoginTheme";
import configureAuth from "./configureEnvironment/configureAuth";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import "antd/dist/reset.css";
import { routes } from "./routes";

const { REACT_APP_SKIP_AUTH } = process.env;
export const shouldSkipAuth = REACT_APP_SKIP_AUTH === "SKIP";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

if (!shouldSkipAuth) {
  configureAuth();
}

const AuthenticatorWrapper = ({ children }) =>
  shouldSkipAuth
    ? children
    : React.createElement(Authenticator, { theme: LoginTheme, hideSignUp: true, children: ({ signOut, user }) => children } as never);

const router = createBrowserRouter(routes);

const App = () => (
  <AmplifyProvider>
    <AuthenticatorWrapper>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {window.location.hostname === "localhost" && <ReactQueryDevtools />}
      </QueryClientProvider>
    </AuthenticatorWrapper>
  </AmplifyProvider>
);
export default App;
