import { useEffect, useState } from "react";
import { getTransactions } from "../services/api.js";

export default function Transactions({ refreshKey = 0 }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadTransactions() {
    try {
      setLoading(true);
      const data = await getTransactions();
      setTransactions(data.transactions || []);
      setMessage("");
    } catch (error) {
      console.log(error);
      setMessage(error.message || "Failed to load activity");
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTransactions();
  }, [refreshKey]);

  const cardStyle = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "18px",
    padding: "16px",
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "14px",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "20px" }}>Recent Activity</h2>

        <button
          onClick={loadTransactions}
          style={{
            border: "none",
            padding: "10px 14px",
            borderRadius: "12px",
            background: "#1d8cf8",
            color: "#fff",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          Refresh
        </button>
      </div>

      {loading && (
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            padding: "16px",
            borderRadius: "16px",
          }}
        >
          Loading activity...
        </div>
      )}

      {!loading && message && (
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            padding: "16px",
            borderRadius: "16px",
          }}
        >
          {message}
        </div>
      )}

      {!loading && !message && transactions.length === 0 && (
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            padding: "16px",
            borderRadius: "16px",
          }}
        >
          No transactions yet
        </div>
      )}

      {!loading && !message && transactions.length > 0 && (
        <div style={{ display: "grid", gap: "12px" }}>
          {transactions.map((item) => (
            <div key={item.id} style={cardStyle}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: "16px", fontWeight: "800" }}>
                    {item.type === "SEND" ? "Send Money" : "Top Up"}
                  </div>

                  <div
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.7)",
                      marginTop: "4px",
                    }}
                  >
                    {item.recipient || "Wallet Activity"}
                  </div>
                </div>

                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "800",
                    color: item.type === "SEND" ? "#ff9b9b" : "#8ff7d8",
                  }}
                >
                  {item.type === "SEND" ? "-" : "+"}
                  {item.currency} {Number(item.amount || 0).toLocaleString()}
                </div>
              </div>

              <div
                style={{
                  marginTop: "12px",
                  display: "grid",
                  gap: "6px",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.72)",
                }}
              >
                <div>Status: {item.status || "COMPLETED"}</div>
                <div>Fee: {Number(item.fee || 0).toLocaleString()} {item.currency}</div>
                <div>Total: {Number(item.total || item.amount || 0).toLocaleString()} {item.currency}</div>
                <div>Reference: {item.reference || "-"}</div>
                <div>
                  {item.date ? new Date(item.date).toLocaleString() : "Just now"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}