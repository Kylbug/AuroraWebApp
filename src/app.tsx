import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Navbar from "~/components/Navbar";
import Sidebar from "~/components/Sidebar";
import "./app.css";

export default function App() {
  return (
    <Router
      root={props => (
        <div class="flex h-screen bg-base-100">
          <Sidebar />
          <div class="divider divider-horizontal m-0 bg-base-100 w-0"/>
          <div class="flex flex-col flex-1">
            <Navbar />
            <div class="divider m-0 bg-base-100 h-0"/>
            <div class="flex-1 p-4 overflow-auto text-base-content">
              <Suspense>{props.children}</Suspense>
            </div>
          </div>
        </div>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
