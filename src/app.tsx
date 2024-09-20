import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import NavbarComponent from "~/components/NavbarComponent";
import SidebarComponent from "~/components/SidebarComponent";
import AuthGuardLayout from "~/layouts/AuthGuardLayout";
import "./app.css";

export default function App() {
  return (
    <Router
      root={props => (
        <AuthGuardLayout>
        <div class="flex h-screen bg-base-100">
          <SidebarComponent />
          <div class="divider divider-horizontal m-0 bg-base-100 w-0"/>
          <div class="flex flex-col flex-1">
            <NavbarComponent />
            <div class="divider m-0 bg-base-100 h-0"/>
            <div class="flex-1 overflow-auto text-base-content">
              <Suspense>{props.children}</Suspense>
            </div>
          </div>
        </div>
        </AuthGuardLayout>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
