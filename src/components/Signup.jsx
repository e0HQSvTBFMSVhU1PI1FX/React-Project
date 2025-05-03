import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Fixed import
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { signup } = useAuth();
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		if (password !== confirmPassword) {
			return setError("Passwords do not match");
		}

		try {
			setError("");
			setLoading(true);
			await signup(email, password);
			navigate("/");
		} catch (error) {
			setError("Failed to create an account: " + error.message);
		}
		setLoading(false);
	}

	return (
		<div className="signup-container pt-40 pb-20 px-4">
			<div className="form-container max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
				<h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
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
					<div className="form-group mb-4">
						<label className="block text-sm font-medium mb-1">Password</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
						/>
					</div>
					<div className="form-group mb-6">
						<label className="block text-sm font-medium mb-1">Confirm Password</label>
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
						/>
					</div>
					<button 
						type="submit" 
						className="w-full bg-cyan-600 text-white py-2 px-4 rounded hover:bg-cyan-700 transition-colors" 
						disabled={loading}
					>
						{loading ? "Loading..." : "Sign Up"}
					</button>
				</form>
				<div className="login-link mt-6 text-center">
					Already have an account? <Link to="/login" className="text-cyan-600 hover:underline">Log In</Link>
				</div>
			</div>
		</div>
	);
}