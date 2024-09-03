import { A, useLocation } from "@solidjs/router";
import { JSX, createSignal } from 'solid-js';

interface SidebarButton {
  text: string;
  icon: JSX.Element;
  href: string;
}

export default function TableManagerSidebar() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = createSignal("");

  const sidebarButtons: SidebarButton[] = [
    {
      text: "Personen",
      icon: <i class="fa-solid fa-users"></i>,
      href: "/table-manager/person",
    },
    {
      text: "Kunden",
      icon: <i class="fa-solid fa-address-book"></i>,
      href: "/table-manager/other-table",
    },
  ];

  const filteredButtons = () => {
    const query = searchQuery().toLowerCase();
    return sidebarButtons.filter(button =>
      button.text.toLowerCase().includes(query)
    );
  };

  return (
    <div class="flex flex-row h-full">
      <div class="w-64 p-4 h-full flex-shrink-0">
        <input 
          type="text" 
          placeholder="Search tables..." 
          class="input input-ghost input-sm w-full max-w-xs" 
          value={searchQuery()}
          onInput={(e) => setSearchQuery(e.currentTarget.value)}
        />
        <div class="divider m-0 h-0 pt-3"></div>
        <ul class="pt-3 space-y-2">
          {filteredButtons().map((button) => (
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
      </div>
      <div class="divider divider-horizontal m-0 bg-base-100 h-full w-[1px]"/>
    </div>
  );
}
