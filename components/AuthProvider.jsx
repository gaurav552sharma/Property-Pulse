"use client";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
export default AuthProvider;
// This component wraps the application in a SessionProvider from next-auth, allowing access to authentication state throughout the app.
