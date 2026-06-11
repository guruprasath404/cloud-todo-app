import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function AuthPage() {
  const { login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLogin) await login(email, password);
      else await signup(email, password, name);
    } catch (err) {
      setError(err.message.replace("Firebase: ", "").replace(/\(.*\)/, "").trim());
    }
    setLoading(false);
  };

  return (
    <div className="auth-root">
      <div className="auth-left">
        <div className="auth-brand">
          <div className="brand-icon">✦</div>
          <h1 className="brand-name">Taskly</h1>
        </div>
        <div className="auth-hero">
          <h2>Organize your day,<br />own your time.</h2>
          <p>Tasks with priority, due dates, categories — synced to every device in real time.</p>
          <div className="feature-pills">
            <span>⚡ Real-time sync</span>
            <span>🔒 Private & secure</span>
            <span>📱 Works everywhere</span>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-tabs">
            <button className={isLogin ? "atab active" : "atab"} onClick={() => { setIsLogin(true); setError(""); }}>Sign In</button>
            <button className={!isLogin ? "atab active" : "atab"} onClick={() => { setIsLogin(false); setError(""); }}>Create Account</button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="field">
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            )}
            <div className="field">
              <label>Email</label>
              <input type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" placeholder="Min 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error && <div className="auth-error">⚠ {error}</div>}
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? <span className="spinner" /> : isLogin ? "Sign In →" : "Get Started →"}
            </button>
          </form>

          <p className="auth-switch">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => { setIsLogin(!isLogin); setError(""); }}>
              {isLogin ? "Sign up free" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
