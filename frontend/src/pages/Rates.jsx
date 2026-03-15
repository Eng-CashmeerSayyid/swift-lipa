export default function Rates({ country, rates }) {
  const allRates = rates?.rates || {};
  const updatedAt = rates?.updatedAt || rates?.updated || "";

  return (
    <div style={styles.page}>
      <div style={styles.headerCard}>
        <div style={styles.badge}>Live Exchange Rates</div>
        <h2 style={styles.title}>USD Base Rates</h2>
        <div style={styles.sub}>
          Selected currency: {country} • Updated:{" "}
          {updatedAt ? new Date(updatedAt).toLocaleString() : "Now"}
        </div>
      </div>

      <div style={styles.summaryGrid}>
        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>Base Currency</div>
          <div style={styles.summaryValue}>{rates?.base || "USD"}</div>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>Selected Currency</div>
          <div style={styles.summaryValue}>{country}</div>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>Selected Rate</div>
          <div style={styles.summaryValue}>
            {Number(allRates?.[country] || 0).toLocaleString()}
          </div>
        </div>
      </div>

      <div style={styles.grid}>
        {Object.entries(allRates).map(([code, value]) => {
          const numericValue = Number(value || 0);
          const inverse = numericValue ? (1 / numericValue).toFixed(6) : "0";

          return (
            <div
              key={code}
              style={{
                ...styles.card,
                ...(country === code ? styles.activeCard : {}),
              }}
            >
              <div style={styles.cardTop}>
                <div style={styles.code}>{code}</div>
                <div style={styles.base}>per 1 USD</div>
              </div>

              <div style={styles.value}>{numericValue.toLocaleString()}</div>

              <div style={styles.extra}>
                1 {code} ≈ {inverse} USD
              </div>

              {country === code && (
                <div style={styles.selectedBadge}>Selected</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: 12,
    color: "#fff",
  },

  headerCard: {
    padding: 22,
    borderRadius: 24,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    marginBottom: 18,
  },

  badge: {
    display: "inline-block",
    padding: "8px 12px",
    borderRadius: 999,
    background: "rgba(99,102,241,0.18)",
    color: "#c7d2fe",
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 14,
  },

  title: {
    margin: 0,
    fontSize: 28,
    fontWeight: 900,
  },

  sub: {
    marginTop: 8,
    color: "rgba(226,232,240,0.72)",
    fontSize: 13,
  },

  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 16,
    marginBottom: 18,
  },

  summaryCard: {
    padding: 18,
    borderRadius: 20,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
  },

  summaryLabel: {
    fontSize: 12,
    color: "rgba(226,232,240,0.68)",
  },

  summaryValue: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 900,
    color: "#fff",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 16,
  },

  card: {
    padding: 18,
    borderRadius: 22,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    position: "relative",
  },

  activeCard: {
    background:
      "linear-gradient(135deg, rgba(99,102,241,.22), rgba(139,92,246,.18))",
    border: "1px solid rgba(255,255,255,0.14)",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  code: {
    fontSize: 18,
    fontWeight: 900,
  },

  base: {
    fontSize: 12,
    color: "rgba(226,232,240,0.68)",
  },

  value: {
    marginTop: 18,
    fontSize: 30,
    fontWeight: 900,
  },

  extra: {
    marginTop: 10,
    fontSize: 12,
    color: "rgba(226,232,240,0.72)",
  },

  selectedBadge: {
    marginTop: 14,
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(16,185,129,0.18)",
    border: "1px solid rgba(16,185,129,0.24)",
    color: "#86efac",
    fontSize: 12,
    fontWeight: 700,
  },
};