import { useMemo } from "react";

export default function Dashboard({ country = "KES", rates, wallets = {}, kyc = {} }) {
  const currencies = useMemo(() => Object.keys(wallets || {}), [wallets]);

  const currentBalance = Number(wallets?.[country] || 0);
  const usdRate = Number(rates?.rates?.[country] || 1);

  const totalUsdValue = useMemo(() => {
    return Object.entries(wallets || {}).reduce((sum, [currency, amount]) => {
      const rate = Number(rates?.rates?.[currency] || 1);
      if (!rate) return sum;
      return sum + Number(amount || 0) / rate;
    }, 0);
  }, [wallets, rates]);

  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <div style={styles.heroBadge}>Swift Lipa</div>
        <h1 style={styles.heroTitle}>Fast Exchange and Transfer</h1>
        <p style={styles.heroText}>
          Send money across East Africa, manage multi-currency wallets, and track
          every transaction in one place.
        </p>

        <div style={styles.heroGrid}>
          <div style={styles.heroCard}>
            <div style={styles.cardLabel}>Selected Wallet</div>
            <div style={styles.cardValue}>
              {country} {currentBalance.toLocaleString()}
            </div>
            <div style={styles.cardSub}>
              USD Rate: {usdRate.toLocaleString()}
            </div>
          </div>

          <div style={styles.heroCard}>
            <div style={styles.cardLabel}>Estimated Total Value</div>
            <div style={styles.cardValue}>USD {totalUsdValue.toFixed(2)}</div>
            <div style={styles.cardSub}>
              Across {currencies.length} wallet{currencies.length === 1 ? "" : "s"}
            </div>
          </div>

          <div style={styles.heroCard}>
            <div style={styles.cardLabel}>KYC Status</div>
            <div
              style={{
                ...styles.statusPill,
                ...(kyc?.status === "Verified"
                  ? styles.statusVerified
                  : kyc?.status === "Pending"
                  ? styles.statusPending
                  : styles.statusUnverified),
              }}
            >
              {kyc?.status || "Not Started"}
            </div>
            <div style={styles.cardSub}>
              {kyc?.fullName ? kyc.fullName : "Complete profile verification"}
            </div>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Wallet Overview</h2>
          <p style={styles.sectionText}>Your balances across supported currencies</p>
        </div>

        <div style={styles.walletGrid}>
          {currencies.map((currency) => {
            const balance = Number(wallets?.[currency] || 0);
            const rate = Number(rates?.rates?.[currency] || 1);
            const usdValue = rate ? balance / rate : 0;

            return (
              <div
                key={currency}
                style={{
                  ...styles.walletCard,
                  ...(currency === country ? styles.walletCardActive : {}),
                }}
              >
                <div style={styles.walletTop}>
                  <div style={styles.walletCode}>{currency}</div>
                  {currency === country ? (
                    <div style={styles.activeTag}>Selected</div>
                  ) : null}
                </div>

                <div style={styles.walletBalance}>
                  {currency} {balance.toLocaleString()}
                </div>

                <div style={styles.walletUsd}>≈ USD {usdValue.toFixed(2)}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={styles.bottomGrid}>
        <div style={styles.infoCard}>
          <h3 style={styles.infoTitle}>What you can do</h3>
          <div style={styles.infoList}>
            <div style={styles.infoItem}>Top up wallets instantly</div>
            <div style={styles.infoItem}>Send money securely</div>
            <div style={styles.infoItem}>Track all wallet activity</div>
            <div style={styles.infoItem}>Verify your account with KYC</div>
          </div>
        </div>

        <div style={styles.infoCard}>
          <h3 style={styles.infoTitle}>Account Snapshot</h3>
          <div style={styles.snapshotRow}>
            <span style={styles.snapshotLabel}>Account Holder</span>
            <span style={styles.snapshotValue}>{kyc?.fullName || "Not set"}</span>
          </div>
          <div style={styles.snapshotRow}>
            <span style={styles.snapshotLabel}>Phone</span>
            <span style={styles.snapshotValue}>{kyc?.phone || "Not set"}</span>
          </div>
          <div style={styles.snapshotRow}>
            <span style={styles.snapshotLabel}>Status</span>
            <span style={styles.snapshotValue}>{kyc?.status || "Not started"}</span>
          </div>
          <div style={styles.snapshotRow}>
            <span style={styles.snapshotLabel}>Base Rate</span>
            <span style={styles.snapshotValue}>{rates?.base || "USD"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "20px",
    display: "grid",
    gap: "20px",
    background: "#f5f7fb",
    minHeight: "100%",
  },

  hero: {
    background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
    borderRadius: "24px",
    padding: "28px",
    color: "#ffffff",
    boxShadow: "0 16px 40px rgba(15, 23, 42, 0.18)",
  },

  heroBadge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.14)",
    color: "#ffffff",
    fontSize: "13px",
    fontWeight: "700",
    marginBottom: "14px",
  },

  heroTitle: {
    margin: "0 0 10px 0",
    fontSize: "34px",
    lineHeight: 1.15,
    color: "#ffffff",
  },

  heroText: {
    margin: "0 0 22px 0",
    fontSize: "15px",
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.88)",
    maxWidth: "720px",
  },

  heroGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "14px",
  },

  heroCard: {
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(8px)",
    borderRadius: "18px",
    padding: "18px",
  },

  cardLabel: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.75)",
    marginBottom: "10px",
  },

  cardValue: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: "8px",
  },

  cardSub: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.8)",
  },

  statusPill: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "110px",
    padding: "10px 14px",
    borderRadius: "999px",
    fontWeight: "700",
    fontSize: "14px",
    marginBottom: "10px",
  },

  statusVerified: {
    background: "#dcfce7",
    color: "#166534",
  },

  statusPending: {
    background: "#fef3c7",
    color: "#92400e",
  },

  statusUnverified: {
    background: "#fee2e2",
    color: "#991b1b",
  },

  section: {
    background: "#ffffff",
    borderRadius: "22px",
    padding: "22px",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
  },

  sectionHeader: {
    marginBottom: "18px",
  },

  sectionTitle: {
    margin: "0 0 6px 0",
    color: "#0f172a",
    fontSize: "24px",
  },

  sectionText: {
    margin: 0,
    color: "#64748b",
    fontSize: "14px",
  },

  walletGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
    gap: "14px",
  },

  walletCard: {
    border: "1px solid #e5e7eb",
    borderRadius: "18px",
    padding: "18px",
    background: "#f8fafc",
  },

  walletCardActive: {
    border: "1px solid #1d4ed8",
    background: "#eff6ff",
  },

  walletTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "14px",
  },

  walletCode: {
    fontSize: "16px",
    fontWeight: "800",
    color: "#0f172a",
  },

  activeTag: {
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "700",
    background: "#dbeafe",
    color: "#1d4ed8",
  },

  walletBalance: {
    fontSize: "22px",
    fontWeight: "800",
    color: "#111827",
    marginBottom: "8px",
  },

  walletUsd: {
    fontSize: "13px",
    color: "#64748b",
  },

  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
  },

  infoCard: {
    background: "#ffffff",
    borderRadius: "22px",
    padding: "22px",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
  },

  infoTitle: {
    margin: "0 0 16px 0",
    color: "#0f172a",
    fontSize: "20px",
  },

  infoList: {
    display: "grid",
    gap: "10px",
  },

  infoItem: {
    padding: "12px 14px",
    borderRadius: "14px",
    background: "#f8fafc",
    color: "#334155",
    fontSize: "14px",
    fontWeight: "600",
  },

  snapshotRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    padding: "12px 0",
    borderBottom: "1px solid #eef2f7",
  },

  snapshotLabel: {
    color: "#64748b",
    fontSize: "14px",
  },

  snapshotValue: {
    color: "#0f172a",
    fontSize: "14px",
    fontWeight: "700",
    textAlign: "right",
  },
};