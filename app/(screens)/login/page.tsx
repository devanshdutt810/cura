"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const route = useRouter();

  async function handleLogin() {
    try {
      const requestBody = {
        email: email,
        password: password,
      };

      if (!email || !password) {
        setError("Please provide email & password.");
        return;
      }

      const response = await fetch("/api/auth/login", {
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
      }
      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    }
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
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              value={email}
              className="border rounded-lg pl-1 pr-1"
              placeholder="abc@def.com"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              type="password"
              value={password}
              className="border rounded-lg pl-1 pr-1"
              placeholder="●●●●●●●●"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
        </div>
        {error && <h1 className="text-red-500 italic">{`*${error}`}</h1>}

        <button
          className="bg-[#AAD4E4] pl-4 pr-4 pb-2 pt-2 rounded-lg cursor-pointer"
          onClick={handleLogin}
        >
          Login
        </button>
        <div className="flex flex-col gap-1">
          <button className="text-[#1B5D9D] cursor-pointer">
            Forgot Password?
          </button>
          <button
            className="text-[#1B5D9D] cursor-pointer"
            onClick={() => {
              route.push("/sign-up");
            }}
          >
            Don&apos;t have an account?
          </button>
        </div>
      </div>
    </div>
  );
}
