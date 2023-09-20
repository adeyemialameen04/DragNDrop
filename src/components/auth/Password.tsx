import { useState } from "react";
import "./auth.css";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";

type PasswordProps = {
  password: string;
  setPassword: (value: string) => void;
};

const Password = ({ password, setPassword }: PasswordProps) => {
  const [visibility, setVisibility] = useState(false);

  return (
    <div className="password__container">
      <input
        type={visibility ? "text" : "password"}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Password"
      />
      <div onClick={() => setVisibility((prev) => !prev)} className="eye">
        {visibility ? <AiOutlineEyeInvisible /> : <AiFillEye />}
      </div>
    </div>
  );
};

export default Password;
