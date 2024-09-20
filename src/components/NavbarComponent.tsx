import { createMemo } from 'solid-js';
import { useLocation } from '@solidjs/router';
import ThemeToggleComponent from './ThemeToggleComponent';

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRouteName(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) {
    return 'Dashboard';
  }
  return capitalizeFirstLetter(segments[segments.length - 1]);
}

export default function Navbar() {
  const location = useLocation();
  
  // Create a reactive value that updates automatically when location.pathname changes
  const routeName = createMemo(() => getRouteName(location.pathname));

  return (
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a class="text-2xl ml-4 text-base-content">{routeName()}</a>
      </div>
      <div class="flex-none gap-2">
        <div class="form-control">
          <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
        </div>
        <div class="ml-1 mr-1">
          <ThemeToggleComponent />
        </div>
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <a class="justify-between">
                Profile
                <span class="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
