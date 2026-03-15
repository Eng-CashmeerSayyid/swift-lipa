import { useEffect, useMemo, useState } from "react";

export default function Profile({ wallets = {}, kyc = {}, updateKyc, markKycVerified }) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    idNumber: "",
    idFront: "",
    idBack: "",
    otpCode: "",
  });

  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      fullName: kyc?.fullName || "",
      phone: kyc?.phone || "",
      idNumber: kyc?.idNumber || "",
      idFront: kyc?.idFront || "",
      idBack: kyc?.idBack || "",
      otpCode: "",
    }));
    setOtpSent(Boolean(kyc?.otpSent));
  }, [kyc]);

  const totalWallets = useMemo(() => {
    return Object.values(wallets || {}).reduce((sum, value) => {
      const num = Number(value) || 0;
      return sum + num;
    }, 0);
  }, [wallets]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSaveKyc() {
    const payload = {
      fullName: form.fullName,
      phone: form.phone,
      idNumber: form.idNumber,
      idFront: form.idFront,
      idBack: form.idBack,
      otpSent: true,
      verified: false,
    };

    if (typeof updateKyc === "function") {
      updateKyc(payload);
    }

    setOtpSent(true);
    setMessage("KYC saved. OTP sent.");
  }

  function handleVerifyOtp() {
    if (form.otpCode === "1234") {
      if (typeof markKycVerified === "function") {
        markKycVerified();
      }
      setMessage("Phone verified successfully.");
    } else {
      setMessage("Invalid OTP. Use 1234 for demo.");
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Profile & KYC</h2>
        <p style={styles.sub}>Complete KYC to unlock transfers</p>

        <div style={styles.grid}>
          <div>
            <label style={styles.label}>Full name</label>
            <input
              style={styles.input}
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label style={styles.label}>Phone</label>
            <input
              style={styles.input}
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="e.g. +254700000000"
            />
          </div>

          <div>
            <label style={styles.label}>ID number</label>
            <input
              style={styles.input}
              name="idNumber"
              value={form.idNumber}
              onChange={handleChange}
              placeholder="Enter ID number"
            />
          </div>

          <div>
            <label style={styles.label}>ID front image URL</label>
            <input
              style={styles.input}
              name="idFront"
              value={form.idFront}
              onChange={handleChange}
              placeholder="Paste image URL"
            />
          </div>

          <div>
            <label style={styles.label}>ID back image URL</label>
            <input
              style={styles.input}
              name="idBack"
              value={form.idBack}
              onChange={handleChange}
              placeholder="Paste image URL"
            />
          </div>

          <div>
            <label style={styles.label}>Demo OTP</label>
            <input
              style={styles.input}
              name="otpCode"
              value={form.otpCode}
              onChange={handleChange}
              placeholder="Enter 1234"
            />
          </div>
        </div>

        <div style={styles.actions}>
          <button style={styles.button} onClick={handleSaveKyc} disabled={loading}>
            Save KYC
          </button>

          <button style={styles.button} onClick={handleVerifyOtp} disabled={!otpSent || loading}>
            Verify OTP
          </button>
        </div>

        {message ? <div style={styles.message}>{message}</div> : null}

        <div style={styles.summary}>
          <div style={styles.summaryCard}>
            <div style={styles.summaryLabel}>Wallet Total</div>
            <div style={styles.summaryValue}>{totalWallets.toFixed(2)}</div>
          </div>

          <div style={styles.summaryCard}>
            <div style={styles.summaryLabel}>KYC Status</div>
            <div style={styles.summaryValue}>{kyc?.verified ? "Verified" : "Pending"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "20px",
  },
  card: {
    maxWidth: "760px",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "18px",
    padding: "24px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  title: {
    margin: 0,
    fontSize: "28px",
  },
  sub: {
    marginTop: "8px",
    color: "#666",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #d0d7de",
    outline: "none",
    boxSizing: "border-box",
  },
  actions: {
    display: "flex",
    gap: "12px",
    marginTop: "20px",
  },
  button: {
    padding: "12px 18px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
  },
  message: {
    marginTop: "16px",
    padding: "12px",
    borderRadius: "12px",
    background: "#f3f4f6",
  },
  summary: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginTop: "24px",
  },
  summaryCard: {
    padding: "16px",
    borderRadius: "14px",
    background: "#f8fafc",
  },
  summaryLabel: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "8px",
  },
  summaryValue: {
    fontSize: "22px",
    fontWeight: "700",
  },
};