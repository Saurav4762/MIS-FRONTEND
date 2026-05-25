import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { authApi } from "@shared/api/auth.api";
import { useAuthStore } from "@shared/store/auth-store";
import { publicDashboardApi } from "@pages/public-dashboard/api/public-dashboard.api";

const DEFAULT_MUNICIPALITY_ID = "9e725b30-d809-4448-a3ce-a98eac07dd06";

export function LoginPage() {
    const navigate = useNavigate();
    const login = useAuthStore((s) => s.login);
    const [municipalityName, setMunicipalityName] = useState("Municipality MIS");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        publicDashboardApi.getMunicipality(DEFAULT_MUNICIPALITY_ID)
            .then(res => setMunicipalityName(res.nameEn ?? "Municipality MIS"))
            .catch(() => {});
    }, []);

    const handleLogin = async () => {
        if (!email.trim() || !password) {
            setError("Please enter email and password");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const response = await authApi.login({ email: email.trim(), password });
            login(response.accessToken);
            navigate({ to: "/dashboard" });
        } catch (err: any) {
            setError(err?.message ?? "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl">

                {/* Card */}
                <div className="bg-white border border-gray-200 rounded-2xl p-12 shadow-lg md:p-14">

                    {/* Logo + Name */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                            <span className="text-white text-2xl font-bold">BM</span>
                        </div>
                        <h1 className="text-gray-900 text-2xl font-bold">{municipalityName}</h1>
                        <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-6">
                            {error}
                        </div>
                    )}

                    {/* Email */}
                    <div className="mb-4">
                        <label className="text-gray-700 text-sm font-medium mb-1 block">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                            placeholder="Enter your email"
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label className="text-gray-700 text-sm font-medium mb-1 block">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                            placeholder="Enter your password"
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Button */}
                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-lg py-3 transition-colors shadow-sm"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>

                    {/* Back */}
                    <button
                        onClick={() => navigate({
                            to: "/public/$municipalityId",
                            params: { municipalityId: DEFAULT_MUNICIPALITY_ID }
                        })}
                        className="w-full mt-4 text-gray-400 hover:text-gray-600 text-sm transition-colors text-center"
                    >
                        ← Back to public dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}