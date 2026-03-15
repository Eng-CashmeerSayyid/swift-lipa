import { useEffect, useMemo, useState } from "react";

export default function SendMoney({
  country = "KES",
  wallets = {},
  rates,
  onSuccess,
  kyc,
}) {
  const [recipient, setRecipient] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const [currency, setCurrency] = useState(country || "KES");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrency(country || "KES");
  }, [country]);

  const numericAmount = Number(amount || 0);
  const currentBalance = Number(wallets?.[currency] || 0);
  const isVerified = kyc?.status === "Verified";
  const usdRate = Number(rates?.rates?.[currency] || 1);

  const convertedUsd = useMemo(() => {
    if (!numericAmount || !usdRate) return 0;
    return numericAmount / usdRate;
  }, [numericAmount, usdRate]);

  async function handleSend(e) {
    e.preventDefault();
    setMessage("");

    if (!isVerified) {
      setMessage("Complete KYC before sending money");
      return;
    }

    if (!recipient || !recipientPhone || !recipientId || !amount) {
      setMessage("Fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:5050/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipient,
          recipientPhone,
          recipientId,
          currency,
          amount: numericAmount,
          note,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setMessage(data.message || "Send money failed");
        return;
      }

      setMessage(data.message || "Money sent successfully");

      setRecipient("");
      setRecipientPhone("");
      setRecipientId("");
      setAmount("");
      setNote("");

      if (onSuccess) onSuccess(data);
    } catch (error) {
      console.log(error);
      setMessage("Backend not reachable");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Send Money</h2>
        <p style={styles.subtext}>
          Balance: <strong>{currency} {currentBalance.toLocaleString()}</strong>
        </p>

        <form onSubmit={handleSend} style={styles.form}>
          <div style={styles.group}>
            <label style={styles.label}>Recipient Name</label>
            <input
              style={styles.input}
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter full name"
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Recipient Phone</label>
            <input
              style={styles.input}
              value={recipientPhone}
              onChange={(e) => setRecipientPhone(e.target.value)}
              placeholder="e.g. 0712345678"
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Recipient ID Number</label>
            <input
              style={styles.input}
              value={recipientId}
              onChange={(e) => setRecipientId(e.target.value)}
              placeholder="Enter ID number"
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Currency</label>
            <select
              style={styles.input}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {Object.keys(wallets || {}).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Amount</label>
            <input
              style={styles.input}
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>

          <div style={styles.preview}>
            <div>Approx USD: {convertedUsd.toFixed(2)}</div>
            <div>Available: {currency} {currentBalance.toLocaleString()}</div>
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Note</label>
            <textarea
              style={styles.textarea}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Optional note"
            />
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Sending..." : "Send Money"}
          </button>

          {!isVerified && (
            <div style={styles.warning}>
              Your account is not verified. Complete KYC to send money.
            </div>
          )}

          {message ? <div style={styles.message}>{message}</div> : null}
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "20px",
  },
  card: {
    maxWidth: "520px",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "18px",
    padding: "22px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  },
  title: {
    marginTop: 0,
    marginBottom: "8px",
    fontSize: "28px",
  },
  subtext: {
    marginTop: 0,
    marginBottom: "18px",
    color: "#555",
  },
  form: {
    display: "grid",
    gap: "14px",
  },
  group: {
    display: "grid",
    gap: "8px",
  },
  label: {
    fontWeight: "600",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid #d9d9d9",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    minHeight: "90px",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid #d9d9d9",
    fontSize: "15px",
    outline: "none",
    resize: "vertical",
    boxSizing: "border-box",
  },
  preview: {
    background: "#f7f8fc",
    borderRadius: "12px",
    padding: "12px 14px",
    fontSize: "14px",
    display: "grid",
    gap: "6px",
  },
  button: {
    background: "#111827",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "14px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
  },
  warning: {
    background: "#fff4e5",
    color: "#8a5700",
    padding: "12px",
    borderRadius: "12px",
    fontSize: "14px",
  },
  message: {
    background: "#eef7ee",
    color: "#176b2c",
    padding: "12px",
    borderRadius: "12px",
    fontSize: "14px",
  },
};