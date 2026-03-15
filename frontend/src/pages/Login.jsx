import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  function handleLogin() {
    localStorage.setItem("swiftLipa_loggedIn", "yes");
    navigate("/dashboard");
  }

  return (
    <div className="page">
      <div className="shell" style={{ maxWidth: 420 }}>
        <div className="topbar" style={{ justifyContent: "center" }}>
          <h2>Swift Lipa</h2>
        </div>

        <div style={{ marginTop: 12 }} className="topbar">
          <div style={{ width: "100%" }}>
            <p style={{ opacity: 0.8, marginTop: 0 }}>Welcome back</p>
            <button className="cardBtn" style={{ width: "100%" }} onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}