// src/components/Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Fixed import
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { login, resetPassword } = useAuth();
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError("");
			setLoading(true);
			await login(email, password);
			navigate("/");
		} catch (error) {
			setError("Failed to log in: " + error.message);
		}
		setLoading(false);
	}

	async function handlePasswordReset() {
		if (!email) {
			return setError("Please enter your email address");
		}

		try {
			setError("");
			setLoading(true);
			await resetPassword(email);
			setError("Password reset email sent. Check your inbox.");
		} catch (error) {
			setError("Failed to reset password: " + error.message);
		}
		setLoading(false);
	}

	return (
		<div className="login-container pt-40 pb-20 px-4">
			<div className="form-container max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
				<h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
				{error && <div className="alert alert-danger bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}
				<form onSubmit={handleSubmit}>
					<div className="form-group mb-4">
						<label className="block text-sm font-medium mb-1">Email</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
						/>
					</div>
					<div className="form-group mb-6">
						<label className="block text-sm font-medium mb-1">Password</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
						/>
					</div>
					<button 
						type="submit" 
						className="w-full bg-cyan-600 text-white py-2 px-4 rounded hover:bg-cyan-700 transition-colors" 
						disabled={loading}
					>
						{loading ? "Loading..." : "Log In"}
					</button>
				</form>
				<div className="forgot-password mt-4 text-center">
					<button
						className="text-cyan-600 hover:underline"
						onClick={handlePasswordReset}
						disabled={loading}
					>
						Forgot Password?
					</button>
				</div>
				<div className="signup-link mt-6 text-center">
					Need an account? <Link to="/signup" className="text-cyan-600 hover:underline">Sign Up</Link>
				</div>
			</div>
		</div>
	);
}