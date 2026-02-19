export default function AnalysisResult({ result, t }) {
  if (!result) return null

  const repoName = result?.meta?.repo_name || result?.repo_name || "Unknown"
  const stars    = result?.meta?.stars ?? result?.stars ?? 0
  const languages = result?.meta?.languages || result?.languages || {}
  const analysisText = result?.analysis?.raw || result?.analysis || "No analysis returned."

  const sections = analysisText.split(/(?=###\s)/).filter(Boolean)

  return (
    <div style={{
      background: t.card,
      border: `1px solid ${t.border}`,
      borderRadius: "12px",
      padding: "24px",
      marginTop: "24px",
      transition: "background 0.3s ease"
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "12px",
        marginBottom: "24px",
        paddingBottom: "16px",
        borderBottom: `1px solid ${t.border}`
      }}>
        <h2 style={{ color: t.text, fontSize: "20px", fontWeight: "700", margin: 0 }}>
          {repoName}
        </h2>
        <span style={{ color: "#f0b429", fontSize: "14px" }}>
          ⭐ {Number(stars).toLocaleString()}
        </span>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {Object.keys(languages).map(lang => (
            <span key={lang} style={{
              background: t.tag,
              color: t.tagText,
              padding: "2px 10px",
              borderRadius: "20px",
              fontSize: "12px",
              border: `1px solid ${t.border}`,
              transition: "background 0.3s ease"
            }}>
              {lang}
            </span>
          ))}
        </div>
      </div>

      {/* Sections */}
      {sections.length > 1 ? sections.map((section, i) => {
        const lines = section.trim().split("\n")
        const heading = lines[0].replace(/^###\s*/, "").replace(/\*\*/g, "")
        const body = lines.slice(1).join("\n").trim().replace(/\*\*/g, "")

        return (
          <div key={i} style={{
            background: t.cardInner,
            border: `1px solid ${t.border}`,
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "12px",
            transition: "background 0.3s ease"
          }}>
            <h3 style={{
              color: t.accent,
              fontSize: "12px",
              fontWeight: "600",
              marginBottom: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              margin: "0 0 10px 0"
            }}>
              {heading}
            </h3>
            <p style={{
              color: t.muted,
              fontSize: "14px",
              lineHeight: "1.7",
              margin: 0,
              whiteSpace: "pre-wrap"
            }}>
              {body}
            </p>
          </div>
        )
      }) : (
        <div style={{
          color: t.muted,
          fontSize: "14px",
          lineHeight: "1.8",
          whiteSpace: "pre-wrap"
        }}>
          {analysisText}
        </div>
      )}
    </div>
  )
}