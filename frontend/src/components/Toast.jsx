export default function Toast({ message, type = "info", onClose }) {
  if (!message) return null;

  return (
    <div className={`toast toast--${type}`} role="status">
      <span className="toast__message">{message}</span>
      {onClose && (
        <button type="button" className="toast__close" onClick={onClose} aria-label="Dismiss">
          ×
        </button>
      )}
    </div>
  );
}
