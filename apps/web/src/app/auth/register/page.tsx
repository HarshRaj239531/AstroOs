"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, AlertCircle, Github } from "lucide-react";
import { Button, Card, Input } from "@repo/ui";
import { useAstraStore } from "@/store";
import { validateEmail, validatePassword, createMockUser } from "@repo/shared";

export default function RegisterPage() {
  const router = useRouter();
  const { setCurrentUser } = useAstraStore();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFirstNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    let hasError = false;

    if (!firstName.trim()) {
      setFirstNameError("First name is required.");
      hasError = true;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters.");
      hasError = true;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      hasError = true;
    }

    if (hasError) return;

    setIsLoading(true);
    // Simulate user creation
    setTimeout(() => {
      const newUser = createMockUser("usr-temp", `${firstName} ${lastName}`, email);
      setCurrentUser(newUser);
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 py-12 relative overflow-hidden">
      {/* Decorative background vectors */}
      <div className="absolute top-0 right-1/4 h-80 w-80 rounded-full bg-indigo-200/20 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-cyan-200/20 blur-3xl -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Link href="/" className="flex items-center justify-center gap-2 font-bold text-2xl text-slate-900 mb-8">
          <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md">
            <Sparkles className="h-5 w-5" />
          </div>
          <span>Astra<span className="text-indigo-600">OS</span></span>
        </Link>

        <Card className="bg-white border-slate-200/80 shadow-xl p-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-slate-950">Create an Account</h2>
            <p className="text-xs text-slate-400 mt-1">Get started with a single unified workspace profile.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="First Name"
                placeholder="Harsh"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={firstNameError}
                disabled={isLoading}
                required
              />
              <Input
                label="Last Name"
                placeholder="Raj"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <Input
              type="email"
              label="Email Address"
              placeholder="harsh@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              disabled={isLoading}
              required
            />

            <Input
              type="password"
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              disabled={isLoading}
              required
            />

            <Input
              type="password"
              label="Confirm Password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={confirmPasswordError}
              disabled={isLoading}
              required
            />

            <div className="text-xs text-slate-400 select-none">
              <label className="flex items-start gap-2 cursor-pointer leading-tight">
                <input type="checkbox" required className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20" />
                <span>I accept the Terms of Service and Privacy Policy.</span>
              </label>
            </div>

            <Button type="submit" isLoading={isLoading} className="w-full mt-2 h-11">
              Create Account
            </Button>
          </form>

          {/* Social Logins */}
          <div className="relative my-6 text-center text-xs text-slate-400">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100" /></div>
            <span className="relative bg-white px-3 font-semibold uppercase tracking-wider text-[10px]">Or register with</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const mock = createMockUser("usr-google", "Google User", "google@example.com");
                setCurrentUser(mock);
                router.push("/dashboard");
              }}
              className="flex items-center justify-center gap-1.5 h-10 border-slate-200"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              <span className="text-xs">Google</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const mock = createMockUser("usr-github", "GitHub User", "github@example.com");
                setCurrentUser(mock);
                router.push("/dashboard");
              }}
              className="flex items-center justify-center gap-1.5 h-10 border-slate-200"
            >
              <Github className="h-4 w-4" />
              <span className="text-xs">GitHub</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const mock = createMockUser("usr-ms", "Microsoft User", "ms@example.com");
                setCurrentUser(mock);
                router.push("/dashboard");
              }}
              className="flex items-center justify-center gap-1.5 h-10 border-slate-200"
            >
              <svg className="h-4 w-4 text-sky-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" />
              </svg>
              <span className="text-xs">Microsoft</span>
            </Button>
          </div>

          <div className="mt-8 text-center text-xs text-slate-500">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-indigo-600 font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
