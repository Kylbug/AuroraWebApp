export default function SearchBarComponent({ search, setSearch }: { search: string; setSearch: (value: string) => void }) {
    return (
      <input
        type="text"
        value={search}
        onInput={(e) => setSearch(e.currentTarget.value)}
        placeholder="Search..."
        class="input input-bordered input-sm w-1/2"
      />
    );
  }
  