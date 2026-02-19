export default function UrlInput({ url, setUrl, onAnalyze, loading, t }) {
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
      <input
        style={{
          flex: 1,
          background: t.inputBg,
          border: `1px solid ${t.border}`,
          borderRadius: "8px",
          padding: "12px 16px",
          color: t.text,
          fontSize: "14px",
          outline: "none",
          transition: "background 0.3s ease, border 0.3s ease"
        }}
        placeholder="https://github.com/owner/repo"
        value={url}
        onChange={e => setUrl(e.target.value)}
        onKeyDown={e => e.key === "Enter" && !loading && onAnalyze()}
      />
      <button
        style={{
          background: loading ? t.disabledBg : t.green,
          color: loading ? t.disabledText : t.greenText,
          border: `1px solid ${t.border}`,
          borderRadius: "8px",
          padding: "12px 24px",
          fontSize: "14px",
          fontWeight: "600",
          cursor: loading ? "not-allowed" : "pointer",
          whiteSpace: "nowrap",
          transition: "background 0.3s ease"
        }}
        onClick={onAnalyze}
        disabled={loading || !url.trim()}
      >
        {loading ? "Analyzing..." : "🔍 Analyze"}
      </button>
    </div>
  )
}