export default function ThemeToggle({ isDark, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        width: "56px",
        height: "28px",
        borderRadius: "999px",
        background: isDark ? "#238636" : "#d0d7de",
        cursor: "pointer",
        position: "relative",
        transition: "background 0.3s ease",
        flexShrink: 0,
        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)"
      }}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Sliding circle */}
      <div style={{
        position: "absolute",
        top: "3px",
        left: isDark ? "31px" : "3px",
        width: "22px",
        height: "22px",
        borderRadius: "50%",
        background: "#fff",
        transition: "left 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "13px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.3)"
      }}>
        {isDark ? "🌙" : "☀️"}
      </div>
    </div>
  )
}