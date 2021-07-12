import React, { useEffect, useState } from "react";
import "./styles.css";
import BodyText from "../BodyText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icon from "@fortawesome/free-solid-svg-icons";

interface ITextInput {
  value: string;
  placeholder?: string;
  label?: string;
  onChange: (event: any) => void;
  password?: boolean;
  email?: boolean;
  error?: boolean;
  textField?: boolean;
  autoComplete?: boolean;
  handleKeyDown?: (e: { key: string }) => void;
  readonly?: boolean;
}

const TextInput: React.FC<ITextInput> = ({
  value,
  label,
  placeholder,
  onChange,
  password,
  email,
  error,
  textField,
  autoComplete,
  handleKeyDown,
  readonly,
}) => {
  const [countLines, setCountLines] = useState(1);
  const [showPassword, setShowPassword] = useState(!password);

  useEffect(() => {
    let lines = value.split(/\r|\r\n|\n/);
    setCountLines(lines.length < 15 ? lines.length * lines.length : 200);
  }, [value]);

  return (
    <div className="textInputContainer">
      {label ? (
        <div className="textInputLabelWrapper">
          <BodyText bold={true}>{label}</BodyText>
        </div>
      ) : null}
      {textField ? (
        <textarea
          className={error ? "textInputError" : "textInput"}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          style={{
            height: countLines < 4 ? 100 : countLines + 100,
          }}
        />
      ) : (
        <input
          className={error ? "textInputError" : "textInput"}
          type={!showPassword ? "password" : email ? "email" : "text"}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          autoComplete={autoComplete ? "on" : "off"}
          onKeyDown={handleKeyDown}
          readOnly={readonly}
        />
      )}
      {password ? (
        <span
          className="textInputEyeWrapper"
          onClick={() => setShowPassword(!showPassword)}
        >
          <FontAwesomeIcon
            style={{ position: "absolute" }}
            color="var(--primary-text)"
            size="1x"
            icon={Icon[showPassword ? "faEyeSlash" : "faEye"]}
            transform={{ rotate: 0 }}
          />
        </span>
      ) : null}
    </div>
  );
};

export default TextInput;
