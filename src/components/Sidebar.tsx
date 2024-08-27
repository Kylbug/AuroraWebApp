import { JSX } from 'solid-js';
import { A, useLocation } from 'solid-start';

interface SidebarButtonProps {
    text: string;
    icon: JSX.Element;
    href: string;
}

function SidebarButton(props: SidebarButtonProps) {
    const location = useLocation();

    return (
        <A
            href={props.href}
            class={`btn btn-ghost flex items-center justify-start ${location.pathname === props.href ? 'btn-active' : ''}`}
        >
            <span class="mr-2">{props.icon}</span> 
            <span>{props.text}</span>
        </A>
    );
}


export default function Sidebar() {
    return (
        <aside class="bg-base-100 flex flex-col items-start h-screen p-4">
            <a class="text-xl mb-4">Aurora</a>
            <div class="flex flex-col gap-2">
                <SidebarButton 
                    text="Home" 
                    icon={<i class="fa-solid fa-house"></i>} 
                    href="/" 
                />
                <SidebarButton 
                    text="Settings" 
                    icon={<i class="fa-solid fa-cog"></i>} 
                    href="/settings" 
                />
                <SidebarButton 
                    text="Profile" 
                    icon={<i class="fa-solid fa-user"></i>} 
                    href="/profile" 
                />
            </div>
        </aside>
    );
}

