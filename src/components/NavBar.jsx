import { HeartIcon } from "@heroicons/react/24/outline";
function Navbar({ searchresualt, children }) {
  return (
    <nav className="navbar">
      <div className="navbar__logo">logo</div>
      {children}
      <div className="navbar__result">
        found <strong style={{fontStyle:"italic"}}>{searchresualt}</strong> characters
      </div>
    </nav>
  );
}

export default Navbar;

export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      type="text"
      className="text-field"
      placeholder="search..."
    />
  );
}
export function Favourite({ fav_number, onShowFav }) {
  return (
    <button onClick={() => onShowFav()}>
      <HeartIcon className="icon" />
      <span className="badge">{fav_number}</span>
    </button>
  );
}
