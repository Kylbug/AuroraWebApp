import { JSX, onMount, createSignal } from 'solid-js';

interface SidebarButtonProps {
    text: string;
    icon: JSX.Element;
    href: string;
}

function SidebarButton(props: SidebarButtonProps) {
    const [isActive, setIsActive] = createSignal(false);

    onMount(() => {
        setIsActive(window.location.pathname === props.href);
    });

    const handleClick = () => {
        window.location.href = props.href;
    };

    return (
        <button
            onClick={handleClick}
            class={`btn btn-ghost flex items-center justify-start ${isActive() ? 'btn-active' : ''}`}
        >
            <div class='flex items-center w-5 h-5'>
                <span>{props.icon}</span> 
            </div>
            <span class='ml-3'>{props.text}</span>
        </button>
    );
}

export default function Sidebar() {
    return (
        <aside class="bg-base-100 flex flex-col items-start h-screen">
            <div class="navbar bg-base-100">
                <a class="btn btn-ghost text-xl m-1 flex items-center justify-start">
                    <i class="fa-solid fa-eye text-3xl"></i>
                    <span class='ml-3'>
                        Aurora
                    </span>
                </a>
            </div>
            <div class='p-4'>
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
            </div>
        </aside>
    );
}