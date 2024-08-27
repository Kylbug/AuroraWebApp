import { JSX, createSignal } from 'solid-js';
import { useLocation } from '@solidjs/router';

interface NormalButtonProps {
    text: string;
    icon: JSX.Element;
    href: string;
}

interface DropdownButtonProps {
    text: string;
    icon: JSX.Element;
    href: string;
    subItems: DropdownItem[];
}

interface DropdownItem {
    text: string;
    href: string;
}

function NormalButton(props: NormalButtonProps) {
    const location = useLocation();
    const isActive = () => location.pathname === props.href;

    return (
        <div class="tooltip tooltip-right" data-tip={props.text}>
            <a href={props.href}>
                <button
                    class={`btn btn-ghost m-1 ml-3 mr-3 ${isActive() ? 'btn-active' : ''}`}
                >
                    <div class='flex items-center justify-center w-5 h-5'>
                        <span>{props.icon}</span> 
                    </div>
                </button>
            </a>
        </div>
    );
}

function DropdownButton(props: DropdownButtonProps) {
    const location = useLocation();

    const isActive = () => {
        return (
            location.pathname.startsWith(props.href) ||
            props.subItems.some((item) => location.pathname === item.href)
        );
    };

    const isSubItemActive = (href: string) => {
        return location.pathname === href;
    };

    return (
        <div class="tooltip tooltip-right text-neutral-content" data-tip={props.text}>
            <div class='dropdown dropdown-bottom dropdown-hover'>
                <a href={props.href}>
                    <div tabIndex={0} role='button' class={`btn btn-ghost m-1 ml-3 mr-3 ${isActive() ? 'btn-active' : ''}`}>
                        <div class='flex items-center justify-center w-5 h-5'>
                            <span>{props.icon}</span> 
                        </div>
                    </div>
                </a>
                <ul tabIndex={0} class='dropdown-content menu bg-base-100 rounded-box z-[1] w-56 p-2 pt-2 ml-8 shadow-2xl'>
                    {props.subItems.map((item) => (
                        <li class={`mt-1 mb-1 `}>
                            <a href={item.href}>{item.text}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}



export default function Sidebar() {
    return (
        <aside class="bg-base-100 flex flex-col items-center h-screen">
            <div class="bg-base-100 mt-4 mb-4">
                <a class="">
                    <i class="fa-solid fa-chart-simple text-4xl"></i>
                </a>
            </div>
            <div class='h-full flex flex-col justify-start'>
                <div class="flex flex-col">
                    <NormalButton 
                        text="Dashboard" 
                        icon={<i class="fa-solid fa-house"></i>} 
                        href="/" 
                    />
                    <NormalButton 
                        text="Table Manager" 
                        icon={<i class="fa-solid fa-cog"></i>} 
                        href="/tableManager"
                    />
                    <DropdownButton 
                        text="User Management" 
                        icon={<i class="fa-solid fa-user"></i>} 
                        href="/userManagement" 
                        subItems={[
                            { text: "User", href: "/userManagement/user" },
                            { text: "Roles", href: "/userManagement/roles" },
                        ]}
                    />
                </div>
            </div>
        </aside>
    );
}
