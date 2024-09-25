import { A, useLocation } from "@solidjs/router";
import { JSX } from "solid-js";

interface SidebarButton {
  text: string;
  icon: JSX.Element;
  href: string;
}

export default function SelectTableComponent(props: {tables: {name: string}[], errorMessage: string | null;}) {
  const location = useLocation();

  const sidebarButtons: SidebarButton[] = props.tables
    .filter(table => table.name !== "users")
    .map(table => ({
      text: table.name,
      icon: <i class="fa-solid fa-table"></i>, 
      href: `/tableManager/${table.name}`, 
    }));

  return (
    <div class="flex flex-row h-full">
      <div class="w-64 p-4 h-full flex-shrink-0">
        {props.errorMessage ? (
          <div class="alert alert-error">{props.errorMessage}</div>
        ) : (
          <>
            <ul class="pt-3 space-y-2">
              {sidebarButtons.map((button) => (
                <li>
                  <A
                    href={button.href}
                    class="btn no-animation btn-outline btn-sm btn-block flex justify-start items-center"
                    classList={{ "btn-active": location.pathname === button.href }}
                  >
                    <span class="mr-2">{button.icon}</span>
                    {button.text}
                  </A>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div class="divider divider-horizontal m-0 bg-base-100 h-full w-[1px]"/>
    </div>
  );
}
