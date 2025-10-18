import React, { useState } from "react";
import { SignInScreen } from "@/components/SignInScreen";
import { MainApp } from "@/components/MainApp";
import { Toaster } from "@/components/ui/sonner";

interface User {
  name: string;
  email: string;
  avatar?: string;
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleSignIn = (userData: User) => {
    setUser(userData);
    // Store user in localStorage for persistence
    localStorage.setItem('reviewGreenUser', JSON.stringify(userData));
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('reviewGreenUser');
  };

  // Check for existing user on app load
  React.useEffect(() => {
    const savedUser = localStorage.getItem('reviewGreenUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('reviewGreenUser');
      }
    }
  });

  if (!user) {
    return (
      <>
        <SignInScreen onSignIn={handleSignIn} />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <MainApp user={user} onSignOut={handleSignOut} />
      <Toaster />
    </>
  );
}

export default App;