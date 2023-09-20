import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import "./auth.css";
const Auth = () => {
  const [tab, setTab] = useState("sigin");

  const toggleTab = (selectedTab: string) => {
    setTab(selectedTab);
  };

  return (
    <main className="auth__main">
      <div className="container auth">
        <div className="tabs">
          <button
            onClick={() => toggleTab("sigin")}
            className={tab === "sigin" ? "active" : ""}
          >
            Signup
          </button>
          <button
            onClick={() => toggleTab("signup")}
            className={tab === "signup" ? "active" : ""}
          >
            Signin
          </button>
        </div>
        {tab === "sigin" ? <SignUp /> : <Login />}
      </div>
    </main>
  );
};

export default Auth;
