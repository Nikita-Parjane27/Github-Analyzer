import { useState } from "react"
import axios from "axios"
import UrlInput from "./components/UrlInput"
import AnalysisResult from "./components/AnalysisResult"
import LoadingSpinner from "./components/LoadingSpinner"
import ThemeToggle from "./components/ThemeToggle"

export default function App() {
  const [url, setUrl] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isDark, setIsDark] = useState(true)

  const t = themes[isDark ? "dark" : "light"]

  const analyze = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await axios.post("https://github-analyzer-y93z.onrender.com/", { url })
      setResult(res.data)
    } catch (e) {
      setError(e.response?.data?.detail || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: t.bg,
      color: t.text,
      padding: "40px 24px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      transition: "background 0.3s ease, color 0.3s ease"
    }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>

        {/* Navbar */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "26px" }}>🔍</span>
              <h1 style={{ fontSize: "26px", fontWeight: "700", margin: 0, color: t.text }}>
                GitHub Repo Analyzer
              </h1>
            </div>
            <p style={{ color: t.muted, margin: "4px 0 0 36px", fontSize: "14px" }}>
              AI-powered codebase breakdown
            </p>
          </div>

          {/* Toggle */}
          <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        </div>

        {/* Input */}
        <UrlInput url={url} setUrl={setUrl} onAnalyze={analyze} loading={loading} t={t} />

        {/* Error */}
        {error && (
          <div style={{
            background: isDark ? "#2d1117" : "#fff0f0",
            border: `1px solid ${isDark ? "#f8514926" : "#ffcccc"}`,
            borderRadius: "8px",
            padding: "12px 16px",
            color: isDark ? "#ff7b72" : "#cc0000",
            marginBottom: "16px",
            fontSize: "14px"
          }}>
            ⚠️ {error}
          </div>
        )}

        {loading && <LoadingSpinner t={t} />}
        {result && <AnalysisResult result={result} t={t} />}
      </div>
    </div>
  )
}

// ── Theme tokens ──────────────────────────────────────────
export const themes = {
  dark: {
    bg:          "#010409",
    card:        "#0d1117",
    cardInner:   "#161b22",
    border:      "#30363d",
    text:        "#e6edf3",
    muted:       "#8b949e",
    accent:      "#58a6ff",
    green:       "#238636",
    greenText:   "#ffffff",
    tag:         "#21262d",
    tagText:     "#8b949e",
    inputBg:     "#0d1117",
    disabledBg:  "#21262d",
    disabledText:"#8b949e",
  },
  light: {
    bg:          "#f6f8fa",
    card:        "#ffffff",
    cardInner:   "#f6f8fa",
    border:      "#d0d7de",
    text:        "#1f2328",
    muted:       "#656d76",
    accent:      "#0969da",
    green:       "#1a7f37",
    greenText:   "#ffffff",
    tag:         "#eaeef2",
    tagText:     "#57606a",
    inputBg:     "#ffffff",
    disabledBg:  "#eaeef2",
    disabledText:"#8c959f",
  }
}