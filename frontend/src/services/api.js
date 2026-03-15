const API_BASE = "http://127.0.0.1:5050";

async function handleResponse(res) {
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export async function getRates() {
  const res = await fetch(`${API_BASE}/rates`);
  return handleResponse(res);
}

export async function getWallet() {
  const res = await fetch(`${API_BASE}/wallet`);
  return handleResponse(res);
}

export async function getTransactions() {
  const res = await fetch(`${API_BASE}/transactions?ts=${Date.now()}`);
  return handleResponse(res);
}

export async function getLedger() {
  const res = await fetch(`${API_BASE}/ledger?ts=${Date.now()}`);
  return handleResponse(res);
}

export async function topUpWallet(payload) {
  const res = await fetch(`${API_BASE}/topup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
}

export async function sendMoney(payload) {
  const res = await fetch(`${API_BASE}/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
}

export async function getKyc() {
  const res = await fetch(`${API_BASE}/kyc`);
  return handleResponse(res);
}

export async function saveKyc(payload) {
  const res = await fetch(`${API_BASE}/kyc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
}

export async function verifyOtp(payload) {
  const res = await fetch(`${API_BASE}/kyc/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
}

export async function approveKyc(payload = {}) {
  const res = await fetch(`${API_BASE}/kyc/approve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
}