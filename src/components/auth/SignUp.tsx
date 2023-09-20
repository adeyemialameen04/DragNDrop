import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../config/firebase";
import toast from "react-hot-toast";
import "./auth.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const clearErrorMessage = () => {
    setErrorMessage("");
  };

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    clearErrorMessage();
    try {
      if (email.trim() === "" || password.trim() === "") {
        setErrorMessage("Email and password are required.");
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Sign-up successful!");
      setPassword("");
      setEmail("");
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use":
          // Email is already in use, inform the user
          toast.error("User already exists pls signin");
          break;
        case "auth/invalid-email":
          // Invalid email format
          toast.error("Invalid email format.");
          break;
        case "auth/operation-not-allowed":
          // Email/password sign-up is not allowed
          toast.error("Email/password sign-up is not allowed.");
          break;
        case "auth/weak-password":
          // Weak password, provide feedback to user
          toast.error("Password is too weak.");
          break;
        case "auth/network-request-failed":
          // Network issue or Firebase down
          toast.error("Network error. Please check your internet connection.");
          break;
        case "auth/user-disabled":
          // User account is disabled by an admin
          toast.error("Your account has been disabled.");
          break;
        case "auth/invalid-argument":
          // Programming error, check your code
          toast.error("Invalid argument error.");
          break;
        case "auth/too-many-requests":
          // Rate limiting, ask user to try later
          toast.error("Too many sign-up requests. Please try again later.");
          break;
        case "auth/user-token-expired":
          // User's token has expired, prompt to sign in again
          toast.error("Your session has expired. Please sign in again.");
          break;
        case "auth/app-deleted":
          // Firebase project deleted
          toast.error("Firebase project associated with the app is deleted.");
          break;
        default:
          // Handle other errors
          toast.error("An error occurred during sign-up.");
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth__main">
      <div className="container auth__container">
        <h1>Welcome DragNview</h1>
        <h1>Signup</h1>
        <form onSubmit={handleAuth}>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearErrorMessage();
            }}
            type="email"
            placeholder="Type your email here ..."
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              clearErrorMessage();
            }}
            placeholder="Password"
          />
          <button disabled={loading || !password} type="submit">
            {loading ? "Loading" : "Signup"}
          </button>
        </form>
        <>{errorMessage && <p>{errorMessage}</p>}</>
      </div>
    </main>
  );
};

export default SignUp;
