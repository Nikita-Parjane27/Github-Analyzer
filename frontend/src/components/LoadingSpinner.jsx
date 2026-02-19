export default function LoadingSpinner({ t }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 0",
      gap: "16px"
    }}>
      <div style={{
        width: "36px",
        height: "36px",
        border: `3px solid ${t.border}`,
        borderTop: `3px solid ${t.accent}`,
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite"
      }} />
      <p style={{ color: t.muted, fontSize: "14px", margin: 0 }}>
        Fetching repo and running AI analysis...
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}