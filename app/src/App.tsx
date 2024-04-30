import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "antd/dist/reset.css";
import Layout from "./components/Layout/Layout";

export const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Layout />
    {window.location.hostname === "localhost" && <ReactQueryDevtools />}
  </QueryClientProvider>
);
export default App;
