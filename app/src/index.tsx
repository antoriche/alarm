import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import "./index.css";

import dayjsCustomParseFormat from "dayjs/plugin/customParseFormat";
import dayjsRelativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(dayjsCustomParseFormat);
dayjs.extend(dayjsRelativeTime);

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
