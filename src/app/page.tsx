"use client";

import { authClient } from "@/lib/auth-client"; //import the auth client
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input"; 

export default function Home() {
   const { data: session } = authClient.useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await authClient.signUp.email({
        name,
        email,
        password
      },{
        onError: (error) => {
          window.alert("Sign up failed: " + error.error.message);
          console.error("Sign up error:", error.error.message);
        },
        onSuccess: () => window.alert("Sign up successful!"),
      }
    )
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await authClient.signIn.email({
        email,
        password
      },{
        onError: (error) => {
          window.alert("Sign in failed: " + error.error.message);
          console.error("Sign in error:", error.error.message);
        },
        onSuccess: () => window.alert("Sign in successful!"),
      }
    )
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  if (session) {
    return (
      <div>
        <h1>Welcome, {session.user.name}!</h1>
        <p>Email: {session.user.email}</p>
        <Button onClick={() => authClient.signOut()}>
          Sign Out
        </Button>
        <p>Your session expires at: {new Date(session.session.expiresAt).toLocaleString()}</p>
      </div>
    );
  }
  
  return (
    <div>

   <div>
    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
    <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
    <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
    <Button onClick={handleSubmit}>
      Submit
    </Button>
   </div>

    {/* // This is the sign in form */}
    <div>
      <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <Button onClick={handleLogin}>
        Submit
      </Button>
    </div>

    </div>

  );
}
