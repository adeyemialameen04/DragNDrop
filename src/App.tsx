import { useContext } from "react";
import Auth from "./components/auth/Auth";
import Home from "./components/home/Home";
import { UserContext } from "./utils/context/UserContext";

function App() {
  const { currentUser } = useContext(UserContext);

  return (
    <>
      <>{currentUser ? <Home /> : <Auth />}</>
    </>
  );
}

export default App;
