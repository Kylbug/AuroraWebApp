import { A, useLocation } from "@solidjs/router";
import { JSX, createSignal, onMount } from 'solid-js';
import { TableService } from '~/services/tableService';

interface SidebarButton {
  text: string;
  icon: JSX.Element;
  href: string;
}

export default function ThemeToggleComponent() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = createSignal("");
  const [sidebarButtons, setSidebarButtons] = createSignal<SidebarButton[]>([]);
  const [isLoading, setIsLoading] = createSignal(true);
  const [errorMessage, setErrorMessage] = createSignal<string | null>(null);

  // TableService-Instanz erstellen
  const tableService = new TableService();

  // Daten laden und Authentifizierungsstatus prüfen
  onMount(async () => {
    try {
      setIsLoading(true);
      const tables = await tableService.getAllTables(); // Prüft automatisch Authentifizierung
      const buttons = tables.map((table) => ({
        text: table.name,
        icon: <i class="fa-solid fa-table"></i>, 
        href: `/table-manager/${table.name}`, 
      }));
      setSidebarButtons(buttons);
    } catch (error) {
      // Fehlerbehandlung, falls nicht authentifiziert oder anderer Fehler auftritt
      setErrorMessage("Failed to load tables or not authenticated.");
      console.error("Error loading tables:", error);
    } finally {
      setIsLoading(false);
    }
  });

  const filteredButtons = () => {
    const query = searchQuery().toLowerCase();
    return sidebarButtons().filter(button =>
      button.text.toLowerCase().includes(query)
    );
  };

  if (isLoading()) {
    return <div>Loading...</div>; // Ladeanzeige während des Ladens
  }

  if (errorMessage()) {
    return <div class="alert alert-error">{errorMessage()}</div>; // Fehlermeldung anzeigen, wenn ein Fehler auftritt
  }

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
