import { useMemo, useState } from "react";
import { topUpWallet } from "../services/api.js";

export default function Wallet({ wallets = {}, onSuccess, country = "KES" }) {
  const [currency, setCurrency] = useState(country || "KES");
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("M-Pesa");
  const [reference, setReference] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const numericAmount = Number(amount || 0);
  const currentBalance = Number(wallets?.[currency] || 0);

  const projectedBalance = useMemo(() => {
    if (!numericAmount || numericAmount <= 0) return currentBalance;
    return currentBalance + numericAmount;
  }, [numericAmount, currentBalance]);

  async function handleTopUp() {
    if (!numericAmount || numericAmount <= 0) {
      setMessage("Enter valid amount");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const data = await topUpWallet({
        currency,
        amount: numericAmount,
        source,
        reference: reference.trim(),
      });

      setAmount("");
      setReference("");
      setMessage(`Top up successful: ${data.transaction.amount} ${currency}`);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setMessage(error.message || "Top up failed");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    padding: "14px 16px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  };

  const cardStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    padding: "20px",
  };

  const labelStyle = {
    fontSize: "13px",
    opacity: 0.75,
    marginBottom: "8px",
    color: "#dbe4f0",
  };

  return (
    <div style={{ display: "grid", gap: "18px" }}>
      <div style={cardStyle}>
        <h2 style={{ marginTop: 0, color: "#fff", marginBottom: "8px" }}>
          Top Up Wallet
        </h2>

        <div style={{ color: "#dbe4f0", opacity: 0.8, marginBottom: "18px" }}>
          Add money to your Swift Lipa wallet
        </div>

        <div style={{ display: "grid", gap: "14px", maxWidth: "460px" }}>
          <div>
            <div style={labelStyle}>Currency</div>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={inputStyle}
            >
              <option value="USD" style={{ color: "#000" }}>USD</option>
              <option value="KES" style={{ color: "#000" }}>KES</option>
              <option value="UGX" style={{ color: "#000" }}>UGX</option>
              <option value="RWF" style={{ color: "#000" }}>RWF</option>
              <option value="TZS" style={{ color: "#000" }}>TZS</option>
              <option value="SSP" style={{ color: "#000" }}>SSP</option>
            </select>
          </div>

          <div>
            <div style={labelStyle}>Top Up Method</div>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              style={inputStyle}
            >
              <option value="M-Pesa" style={{ color: "#000" }}>M-Pesa</option>
              <option value="Bank Transfer" style={{ color: "#000" }}>Bank Transfer</option>
              <option value="Card" style={{ color: "#000" }}>Card</option>
              <option value="Cash Deposit" style={{ color: "#000" }}>Cash Deposit</option>
            </select>
          </div>

          <div>
            <div style={labelStyle}>Amount</div>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <div style={labelStyle}>Reference</div>
            <input
              placeholder="Optional payment reference"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: "16px",
              padding: "16px",
              display: "grid",
              gap: "8px",
              color: "#fff",
            }}
          >
            <div>
              Current Balance: {currency} {currentBalance.toLocaleString()}
            </div>
            <div>
              Top Up Amount: {currency}{" "}
              {numericAmount ? numericAmount.toLocaleString() : 0}
            </div>
            <div style={{ fontWeight: 800 }}>
              New Balance: {currency} {projectedBalance.toLocaleString()}
            </div>
          </div>

          <button
            onClick={handleTopUp}
            disabled={loading}
            style={{
              padding: "14px",
              border: "none",
              borderRadius: "14px",
              background: "#1d8cf8",
              color: "#fff",
              fontWeight: "700",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Processing..." : "Top Up"}
          </button>
        </div>
      </div>

      <div style={cardStyle}>
        <h3 style={{ marginTop: 0, color: "#fff" }}>Wallet Balances</h3>

        <div style={{ display: "grid", gap: "10px", color: "#dbe4f0" }}>
          <div>USD: {Number(wallets.USD || 0).toLocaleString()}</div>
          <div>KES: {Number(wallets.KES || 0).toLocaleString()}</div>
          <div>UGX: {Number(wallets.UGX || 0).toLocaleString()}</div>
          <div>RWF: {Number(wallets.RWF || 0).toLocaleString()}</div>
          <div>TZS: {Number(wallets.TZS || 0).toLocaleString()}</div>
          <div>SSP: {Number(wallets.SSP || 0).toLocaleString()}</div>
        </div>
      </div>

      {message && (
        <div
          style={{
            padding: "14px 16px",
            borderRadius: "14px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#fff",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}