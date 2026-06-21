export default function LocationBar({ location, onLocationChange, user }) {
  return (
    <div className="location-bar">
      <div className="location-bar__pin" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <label className="location-bar__field">
        <span className="location-bar__label">Your location</span>
        <input
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          placeholder="Area, city, pincode — e.g. Powai, Mumbai 400076"
        />
      </label>
      {user && (
        <div className="location-bar__user">
          <span className={`role-pill role-pill--${user.role}`}>{user.role}</span>
        </div>
      )}
    </div>
  );
}
