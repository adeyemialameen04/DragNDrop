import { useState } from "react";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Password from "./Password";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Successfully signed in");
      // If successful, user is logged in
    } catch (error: any) {
      // Handle different error codes using a switch case
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("User not found. Please check your email and try again.");
          break;
        case "auth/wrong-password":
          toast.error("Incorrect password. Please try again.");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email address. Please enter a valid email.");
          break;
        default:
          toast.error("An error occurred. Please try again later.");
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
        <h1>Signin</h1>
        <form onSubmit={handleLogin}>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Type your email here ..."
          />
          <Password password={password} setPassword={setPassword} />
          <button disabled={loading || !password} type="submit">
            {loading ? "Loading ..." : "Log In"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
