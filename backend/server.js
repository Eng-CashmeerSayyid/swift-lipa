import express from "express";
import cors from "cors";

const app = express();
const PORT = 5050;

app.use(cors());
app.use(express.json());

const rates = {
  base: "USD",
  rates: {
    USD: 1,
    KES: 129,
    UGX: 3800,
    RWF: 1350,
    SSP: 2100,
    ETB: 57,
  },
};

let wallets = {
  USD: 1200,
  KES: 25000,
  UGX: 0,
  RWF: 0,
  SSP: 0,
  ETB: 0,
};

let kyc = {
  fullName: "Yasmin Said",
  phone: "0712345678",
  idNumber: "12345678",
  status: "Verified",
  otpSent: true,
};

let transactions = [
  {
    id: 1,
    type: "topup",
    currency: "KES",
    amount: 25000,
    recipient: "My Wallet",
    note: "Opening balance",
    status: "Completed",
    createdAt: new Date().toISOString(),
  },
];

app.get("/", (req, res) => {
  res.json({ ok: true, message: "Swift Lipa API running" });
});

app.get("/rates", (req, res) => {
  res.json({
    success: true,
    ...rates,
  });
});

app.get("/wallets", (req, res) => {
  res.json({
    success: true,
    wallets,
  });
});

app.get("/kyc", (req, res) => {
  res.json({
    success: true,
    kyc,
  });
});

app.get("/transactions", (req, res) => {
  res.json({
    success: true,
    count: transactions.length,
    transactions: transactions.slice().reverse(),
  });
});

app.post("/topup", (req, res) => {
  const { currency, amount, note } = req.body;

  const numericAmount = Number(amount);

  if (!currency || !wallets.hasOwnProperty(currency)) {
    return res.status(400).json({
      success: false,
      message: "Invalid currency",
    });
  }

  if (!numericAmount || numericAmount <= 0) {
    return res.status(400).json({
      success: false,
      message: "Enter a valid amount",
    });
  }

  wallets[currency] += numericAmount;

  const transaction = {
    id: Date.now(),
    type: "topup",
    currency,
    amount: numericAmount,
    recipient: "My Wallet",
    note: note || "Wallet top up",
    status: "Completed",
    createdAt: new Date().toISOString(),
  };

  transactions.push(transaction);

  res.json({
    success: true,
    message: `${currency} wallet topped up successfully`,
    wallets,
    transaction,
  });
});

app.post("/send", (req, res) => {
  const {
    recipient,
    recipientPhone,
    recipientId,
    currency,
    amount,
    note,
  } = req.body;

  const numericAmount = Number(amount);

  if (kyc.status !== "Verified") {
    return res.status(403).json({
      success: false,
      message: "Complete KYC before sending money",
    });
  }

  if (!recipient || !recipient.trim()) {
    return res.status(400).json({
      success: false,
      message: "Recipient name is required",
    });
  }

  if (!recipientPhone || !recipientPhone.trim()) {
    return res.status(400).json({
      success: false,
      message: "Recipient phone is required",
    });
  }

  if (!recipientId || !recipientId.trim()) {
    return res.status(400).json({
      success: false,
      message: "Recipient ID is required",
    });
  }

  if (!currency || !wallets.hasOwnProperty(currency)) {
    return res.status(400).json({
      success: false,
      message: "Invalid currency selected",
    });
  }

  if (!numericAmount || numericAmount <= 0) {
    return res.status(400).json({
      success: false,
      message: "Enter a valid amount",
    });
  }

  if (wallets[currency] < numericAmount) {
    return res.status(400).json({
      success: false,
      message: `Insufficient ${currency} balance`,
    });
  }

  wallets[currency] -= numericAmount;

  const transaction = {
    id: Date.now(),
    type: "send",
    currency,
    amount: numericAmount,
    recipient,
    recipientPhone,
    recipientId,
    note: note || "Money transfer",
    status: "Completed",
    createdAt: new Date().toISOString(),
  };

  transactions.push(transaction);

  res.json({
    success: true,
    message: `${numericAmount} ${currency} sent to ${recipient}`,
    wallets,
    transaction,
  });
});

app.post("/kyc/save", (req, res) => {
  const { fullName, phone, idNumber, idFront, idBack } = req.body;

  kyc = {
    ...kyc,
    fullName: fullName || kyc.fullName,
    phone: phone || kyc.phone,
    idNumber: idNumber || kyc.idNumber,
    idFront: idFront || "",
    idBack: idBack || "",
    status: "Pending",
    otpSent: true,
  };

  res.json({
    success: true,
    message: "KYC submitted successfully",
    kyc,
  });
});

app.post("/kyc/verify-otp", (req, res) => {
  const { otpCode } = req.body;

  if (!otpCode || otpCode.length < 4) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP code",
    });
  }

  kyc = {
    ...kyc,
    status: "Verified",
  };

  res.json({
    success: true,
    message: "Phone verified successfully",
    kyc,
  });
});

app.listen(PORT, () => {
  console.log(`Swift Lipa API running on http://localhost:${PORT}`);
});