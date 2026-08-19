"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSignUp() {
    setError("");
    try {
      if (confirmPassword !== password) {
        setError("Passwords do not match");
        return;
      }
      const requestBody = {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      };

      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      } else {
        alert(`${data.message}\nRedirecting to Login Page...`);
        router.replace("/login");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  }

  function emailInputHandler(email: string) {
    setError("");
    setEmail(email);
  }

  function passwordInputHandler(password: string) {
    setError("");
    setPassword(password);
  }

  function confirmPasswordInputHandler(confirmPassword: string) {
    setError("");
    setConfirmPassword(confirmPassword);
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-1/4 h-1/2 flex flex-col items-center p-4 gap-5">
        <Image
          src={"/assets/Cura.png"}
          width={200}
          height={200}
          alt={"CURA LOGO"}
        ></Image>
        <div className="text-center">
          <h1 className="text-2xl">CURA</h1>
          <h1 className="text-lg italic">Care for your family</h1>
        </div>
        <div className="flex gap-2 text-right">
          <div className="flex flex-col gap-2 mt-1">
            <h1>Email</h1>
            <h1>Password</h1>
            <h1>Confirm Password</h1>
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              value={email}
              className="border rounded-lg pl-1 pr-1"
              placeholder="abc@def.com"
              onChange={(e) => emailInputHandler(e.target.value)}
            ></input>
            <input
              type="password"
              value={password}
              className="border rounded-lg pl-1 pr-1"
              placeholder="●●●●●●●●"
              onChange={(e) => passwordInputHandler(e.target.value)}
            ></input>
            <input
              type="password"
              value={confirmPassword}
              className="border rounded-lg pl-1 pr-1"
              placeholder="●●●●●●●●"
              onChange={(e) => {
                confirmPasswordInputHandler(e.target.value);
              }}
            ></input>
          </div>
        </div>
        {error && <h1 className="text-red-500 italic">{`*${error}`}</h1>}
        <button
          className="bg-[#AAD4E4] pl-4 pr-4 pb-2 pt-2 rounded-lg cursor-pointer"
          onClick={handleSignUp}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}
