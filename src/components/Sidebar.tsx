import SidebarButton from "./SidebarButton";
import { faHome, faCog, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
    return (
        <aside class="bg-base-100 flex flex-col items-start h-screen p-4">
            <a class="text-xl mb-4">Aurora</a>
        </aside>
    );
}
