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
        if (!email || !password) {
            setError("Please enter email and password");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const response = await authApi.login({ email, password });
            login(response.accessToken); // 👈 not response.data.accessToken
            navigate({ to: "/dashboard" });
        } catch (err: any) {
            setError(err?.message ?? "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020816] flex items-center justify-center">
            <div className="bg-[#0f1729] border border-gray-800 rounded-2xl p-10 w-full max-w-md shadow-2xl">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl font-bold">BM</span>
                    </div>
                    <h1 className="text-white text-2xl font-bold">Bhadrapur MIS</h1>
                    <p className="text-gray-400 text-sm mt-1">Municipality Information System</p>
                </div>

                {error && (
                    <div className="bg-red-900/30 border border-red-700 text-red-400 text-sm rounded-lg px-4 py-3 mb-6">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className="text-gray-400 text-sm mb-1 block">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                        placeholder="Enter your email"
                        className="w-full bg-[#1a2540] border border-gray-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="text-gray-400 text-sm mb-1 block">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                        placeholder="Enter your password"
                        className="w-full bg-[#1a2540] border border-gray-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
                    />
                </div>

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-lg py-3 transition-colors"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </div>
        </div>
    );
}