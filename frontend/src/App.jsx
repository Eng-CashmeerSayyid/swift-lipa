import { useEffect, useState } from "react";
import AppShell from "./components/AppShell.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SendMoney from "./pages/SendMoney.jsx";
import Transactions from "./pages/Transactions.jsx";
import Rates from "./pages/Rates.jsx";
import Profile from "./pages/Profile.jsx";

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [country, setCountry] = useState("KES");
  const [rates, setRates] = useState({
    base: "USD",
    rates: {
      USD: 1,
      KES: 129,
      UGX: 3800,
      RWF: 1350,
      SSP: 2100,
      ETB: 57,
    },
  });
  const [wallets, setWallets] = useState({
    USD: 0,
    KES: 0,
    UGX: 0,
    RWF: 0,
    SSP: 0,
    ETB: 0,
  });
  const [kyc, setKyc] = useState({
    fullName: "",
    phone: "",
    idNumber: "",
    status: "Not Started",
    otpSent: false,
  });
  const [loading, setLoading] = useState(true);

  async function loadAppData() {
    try {
      setLoading(true);

      const [ratesRes, walletsRes, kycRes] = await Promise.all([
        fetch(`http://127.0.0.1:5050/rates?ts=${Date.now()}`),
        fetch(`http://127.0.0.1:5050/wallets?ts=${Date.now()}`),
        fetch(`http://127.0.0.1:5050/kyc?ts=${Date.now()}`),
      ]);

      const ratesData = await ratesRes.json();
      const walletsData = await walletsRes.json();
      const kycData = await kycRes.json();

      if (ratesData?.success) {
        setRates({
          base: ratesData.base,
          rates: ratesData.rates,
        });
      }

      if (walletsData?.success) {
        setWallets(walletsData.wallets || {});
      }

      if (kycData?.success) {
        setKyc(kycData.kyc || {});
      }
    } catch (error) {
      console.log("Failed to load app data", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAppData();
  }, []);

  function handleRefresh(data) {
    if (data?.wallets) {
      setWallets(data.wallets);
    } else {
      loadAppData();
    }
  }

  function updateKyc(newKyc) {
    setKyc(newKyc);
  }

  function markKycVerified(newKyc) {
    setKyc(newKyc);
  }

  const page =
    tab === "dashboard" ? (
      <Dashboard country={country} rates={rates} wallets={wallets} kyc={kyc} />
    ) : tab === "send" ? (
      <SendMoney
        country={country}
        rates={rates}
        wallets={wallets}
        kyc={kyc}
        onSuccess={handleRefresh}
      />
    ) : tab === "transactions" ? (
      <Transactions />
    ) : tab === "receive" ? (
      <Rates country={country} rates={rates} />
    ) : (
      <Profile
        wallets={wallets}
        kyc={kyc}
        updateKyc={updateKyc}
        markKycVerified={markKycVerified}
      />
    );

  if (loading) {
    return (
      <div style={styles.loadingPage}>
        <div style={styles.loadingCard}>
          <h2 style={styles.loadingTitle}>Swift Lipa</h2>
          <p style={styles.loadingText}>Loading your wallets...</p>
        </div>
      </div>
    );
  }

  const selectedBalance = Number(wallets?.[country] || 0);

  return (
    <AppShell
      tab={tab}
      setTab={setTab}
      country={country}
      setCountry={setCountry}
      walletBalance={`${country} ${selectedBalance.toLocaleString()}`}
    >
      {page}
    </AppShell>
  );
}

const styles = {
  loadingPage: {
    minHeight: "100vh",
    background: "#f5f7fb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
  },
  loadingCard: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "30px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  loadingTitle: {
    margin: "0 0 10px 0",
    fontSize: "30px",
    color: "#111827",
  },
  loadingText: {
    margin: 0,
    color: "#6b7280",
    fontSize: "15px",
  },
};