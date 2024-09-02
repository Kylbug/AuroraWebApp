import { onMount } from 'solid-js'
import { themeChange } from 'theme-change'
onMount(async () => {
  themeChange();
})

export default function ThemeController() {
  return (
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn m-1">
        Theme
        <svg
          width="12px"
          height="12px"
          class="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048">
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul tabindex="0" class="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl">
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Light"
            value="europaLight" />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Dark"
            value="europaDark" />
        </li>
      </ul>
    </div>
  );
}
