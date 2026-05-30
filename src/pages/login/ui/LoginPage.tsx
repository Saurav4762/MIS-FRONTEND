import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { authApi } from "@shared/api/auth.api";
import { useAuthStore } from "@shared/store/auth-store";

export function LoginPage() {
    const navigate = useNavigate();
    const login = useAuthStore((s) => s.login);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email.trim() || !password) {
            setError("Please enter your email and password");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const response = await authApi.login({ email: email.trim(), password });
            login(response.accessToken);
            navigate({ to: "/dashboard" });
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Invalid email or password";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex"
            style={{ backgroundColor: "#f8fafc", fontFamily: "Nunito, sans-serif" }}
        >
            {/* Left panel */}
            <div
                className="hidden lg:flex flex-col justify-between w-[420px] shrink-0 p-10"
                style={{ backgroundColor: "#0ea5e9" }}
            >
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white/20 rounded-[10px] flex items-center justify-center">
                        <span className="text-white text-sm font-extrabold">BM</span>
                    </div>
                    <span className="text-white text-[15px] font-bold">Bhadrapur MIS</span>
                </div>
                <div>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-[0.15em] mb-3">Municipality Information System</p>
                    <h2 className="text-white text-[32px] font-semibold leading-10 tracking-tight mb-4">
                        Managing civic data,<br />one record at a time.
                    </h2>
                    <p className="text-white/70 text-[15px] leading-relaxed">
                        A unified platform for field data collection, master data management, and municipal administration.
                    </p>
                </div>
                <p className="text-white/40 text-[13px]">© 2026 Bhadrapur Municipality</p>
            </div>

            {/* Right panel */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-[400px]">

                    {/* Mobile logo */}
                    <div className="flex items-center gap-3 mb-8 lg:hidden">
                        <div
                            className="w-9 h-9 rounded-[10px] flex items-center justify-center"
                            style={{ backgroundColor: "#0ea5e9" }}
                        >
                            <span className="text-white text-sm font-extrabold">BM</span>
                        </div>
                        <span className="text-[#0f172a] text-[15px] font-bold">Bhadrapur MIS</span>
                    </div>

                    <h1
                        className="text-[#0f172a] text-[24px] font-semibold tracking-tight mb-1"
                    >
                        Welcome back
                    </h1>
                    <p className="text-[#64748b] text-[15px] mb-8">Sign in to your account to continue</p>

                    {/* Error */}
                    {error && (
                        <div
                            className="flex items-start gap-3 rounded-[10px] px-4 py-3 mb-6 text-[13px]"
                            style={{
                                backgroundColor: "#fef2f2",
                                border: "1px solid #fee2e2",
                                color: "#dc2626",
                            }}
                        >
                            <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" strokeWidth="1.85"/>
                                <path d="M12 8v4m0 4h.01" strokeWidth="1.85" strokeLinecap="round"/>
                            </svg>
                            {error}
                        </div>
                    )}

                    {/* Email */}
                    <div className="mb-4">
                        <label
                            className="block text-[13px] font-bold mb-1.5"
                            style={{ color: "#1e293b" }}
                        >
                            Email address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                            placeholder="you@example.com"
                            style={{
                                width: "100%",
                                height: "44px",
                                backgroundColor: "#ffffff",
                                border: "1.5px solid #cbd5e1",
                                borderRadius: "10px",
                                padding: "0 14px",
                                fontSize: "15px",
                                color: "#0f172a",
                                outline: "none",
                                transition: "border-color 150ms ease, box-shadow 150ms ease",
                                fontFamily: "Nunito, sans-serif",
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = "#0ea5e9";
                                e.target.style.boxShadow = "0 0 0 4px rgba(14,165,233,0.18)";
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = "#cbd5e1";
                                e.target.style.boxShadow = "none";
                            }}
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label
                            className="block text-[13px] font-bold mb-1.5"
                            style={{ color: "#1e293b" }}
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                            placeholder="••••••••"
                            style={{
                                width: "100%",
                                height: "44px",
                                backgroundColor: "#ffffff",
                                border: "1.5px solid #cbd5e1",
                                borderRadius: "10px",
                                padding: "0 14px",
                                fontSize: "15px",
                                color: "#0f172a",
                                outline: "none",
                                transition: "border-color 150ms ease, box-shadow 150ms ease",
                                fontFamily: "Nunito, sans-serif",
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = "#0ea5e9";
                                e.target.style.boxShadow = "0 0 0 4px rgba(14,165,233,0.18)";
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = "#cbd5e1";
                                e.target.style.boxShadow = "none";
                            }}
                        />
                    </div>

                    {/* Sign In */}
                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        style={{
                            width: "100%",
                            height: "44px",
                            backgroundColor: loading ? "#7dd3fc" : "#0ea5e9",
                            color: "#ffffff",
                            fontSize: "15px",
                            fontWeight: "700",
                            borderRadius: "10px",
                            border: "none",
                            cursor: loading ? "not-allowed" : "pointer",
                            transition: "background-color 150ms ease",
                            fontFamily: "Nunito, sans-serif",
                            boxShadow: "0 1px 3px rgba(15,23,42,0.06)",
                        }}
                        onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#0284c7"; }}
                        onMouseLeave={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#0ea5e9"; }}
                    >
                        {loading ? "Signing in…" : "Sign In"}
                    </button>

                    {/* Back */}
                    <button
                        onClick={() => navigate({ to: "/public" })}
                        style={{
                            width: "100%",
                            height: "44px",
                            backgroundColor: "#ffffff",
                            color: "#334155",
                            fontSize: "15px",
                            fontWeight: "700",
                            borderRadius: "10px",
                            border: "1px solid #e2e8f0",
                            cursor: "pointer",
                            marginTop: "12px",
                            transition: "background-color 150ms ease",
                            fontFamily: "Nunito, sans-serif",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f8fafc"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#ffffff"; }}
                    >
                        ← Back to Public Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}