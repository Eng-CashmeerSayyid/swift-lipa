export default function AppShell({
  tab,
  setTab,
  country,
  setCountry,
  children,
  walletBalance,
  kycStatus,
}) {
  const navItems = [
    { key: "dashboard", label: "Home", icon: "🏠" },
    { key: "send", label: "Send", icon: "💸" },
    { key: "wallet", label: "Wallet", icon: "💳" },
    { key: "transactions", label: "Activity", icon: "📜" },
    { key: "receive", label: "Rates", icon: "💱" },
    { key: "profile", label: "Profile", icon: "👤" },
  ];

  function getKycColor() {
    if (kycStatus === "Verified") return "#86efac";
    if (kycStatus === "Pending") return "#fcd34d";
    return "#fca5a5";
  }

  function getKycBg() {
    if (kycStatus === "Verified") return "rgba(16,185,129,0.15)";
    if (kycStatus === "Pending") return "rgba(245,158,11,0.15)";
    return "rgba(239,68,68,0.15)";
  }

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <aside style={styles.sidebar}>
          <div>
            <div style={styles.brandWrap}>
              <div style={styles.logo}>S</div>
              <div>
                <div style={styles.brand}>Swift Lipa</div>
                <div style={styles.brandSub}>Fast Exchange & Transfer</div>
              </div>
            </div>

            <div style={styles.balanceCard}>
              <div style={styles.balanceLabel}>Wallet Balance</div>
              <div style={styles.balanceAmount}>
                ${Number(walletBalance || 0).toFixed(2)}
              </div>
            </div>

            <div
              style={{
                ...styles.kycCard,
                background: getKycBg(),
                border: `1px solid ${getKycColor()}`,
              }}
            >
              <div style={styles.kycLabel}>KYC Status</div>
              <div style={{ ...styles.kycValue, color: getKycColor() }}>
                {kycStatus || "Unverified"}
              </div>
            </div>

            <div style={styles.countryBox}>
              <div style={styles.selectLabel}>Country</div>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                style={styles.select}
              >
                <option value="KES">Kenya</option>
                <option value="UGX">Uganda</option>
                <option value="RWF">Rwanda</option>
                <option value="TZS">Tanzania</option>
                <option value="SSP">South Sudan</option>
                <option value="USD">United States</option>
              </select>
            </div>

            <nav style={styles.nav}>
              {navItems.map((item) => {
                const active = tab === item.key;

                return (
                  <button
                    key={item.key}
                    onClick={() => setTab(item.key)}
                    style={{
                      ...styles.navBtn,
                      ...(active ? styles.navBtnActive : {}),
                    }}
                  >
                    <span style={styles.navIcon}>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div style={styles.bottomCard}>
            <div style={styles.bottomTitle}>Swift Lipa</div>
            <div style={styles.bottomText}>
              Cross-border payments for East Africa.
            </div>
          </div>
        </aside>

        <main style={styles.main}>
          <div style={styles.topbar}>
            <div>
              <div style={styles.topbarTitle}>Welcome back</div>
              <div style={styles.topbarSub}>
                Move money across borders with ease
              </div>
            </div>

            <div style={styles.statusPill}>● Secure Transfer</div>
          </div>

          <div style={styles.content}>{children}</div>
        </main>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(1200px 700px at 10% -10%, rgba(99,102,241,.20), transparent 55%), radial-gradient(1000px 700px at 100% 0%, rgba(16,185,129,.14), transparent 55%), linear-gradient(180deg, #081120 0%, #0b1020 100%)",
    padding: 20,
  },

  shell: {
    minHeight: "calc(100vh - 40px)",
    display: "grid",
    gridTemplateColumns: "280px 1fr",
    gap: 18,
  },

  sidebar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    background: "rgba(8,15,30,0.82)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 28,
    padding: 18,
    backdropFilter: "blur(14px)",
    boxShadow: "0 18px 50px rgba(0,0,0,0.28)",
  },

  brandWrap: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },

  logo: {
    width: 48,
    height: 48,
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
    color: "#fff",
    fontWeight: 900,
    fontSize: 20,
    boxShadow: "0 10px 22px rgba(99,102,241,.35)",
  },

  brand: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 900,
    lineHeight: 1.1,
  },

  brandSub: {
    color: "rgba(226,232,240,0.72)",
    fontSize: 12,
    marginTop: 2,
  },

  balanceCard: {
    background: "linear-gradient(135deg, rgba(99,102,241,.22), rgba(139,92,246,.16))",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
  },

  balanceLabel: {
    color: "rgba(226,232,240,0.72)",
    fontSize: 12,
  },

  balanceAmount: {
    color: "#fff",
    fontSize: 28,
    fontWeight: 900,
    marginTop: 6,
  },

  kycCard: {
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
  },

  kycLabel: {
    fontSize: 12,
    color: "rgba(226,232,240,0.72)",
    marginBottom: 6,
  },

  kycValue: {
    fontSize: 16,
    fontWeight: 800,
  },

  countryBox: {
    marginBottom: 18,
  },

  selectLabel: {
    color: "rgba(226,232,240,0.72)",
    fontSize: 12,
    marginBottom: 8,
  },

  select: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    fontSize: 14,
    outline: "none",
  },

  nav: {
    display: "grid",
    gap: 10,
  },

  navBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 14px",
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.04)",
    color: "#dbe4f0",
    cursor: "pointer",
    fontSize: 15,
    textAlign: "left",
  },

  navBtnActive: {
    background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.16)",
    boxShadow: "0 10px 24px rgba(99,102,241,.28)",
  },

  navIcon: {
    fontSize: 16,
  },

  bottomCard: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 20,
    padding: 14,
  },

  bottomTitle: {
    color: "#fff",
    fontWeight: 800,
    marginBottom: 6,
  },

  bottomText: {
    color: "rgba(226,232,240,0.72)",
    fontSize: 13,
    lineHeight: 1.5,
  },

  main: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 28,
    padding: 18,
    backdropFilter: "blur(14px)",
    boxShadow: "0 18px 50px rgba(0,0,0,0.24)",
  },

  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
    paddingBottom: 14,
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },

  topbarTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: 900,
  },

  topbarSub: {
    color: "rgba(226,232,240,0.72)",
    fontSize: 13,
    marginTop: 4,
  },

  statusPill: {
    padding: "10px 14px",
    borderRadius: 999,
    background: "rgba(16,185,129,0.15)",
    color: "#86efac",
    fontSize: 13,
    fontWeight: 700,
    border: "1px solid rgba(16,185,129,0.24)",
  },

  content: {
    minHeight: "calc(100vh - 140px)",
  },
};