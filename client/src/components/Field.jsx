import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Field = ({ label, name, type = "text", hint, ...rest }) => {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={isPassword && visible ? "text" : type}
          aria-describedby={hint ? `${name}-hint` : undefined}
          className={`input ${isPassword ? "pr-11" : ""}`}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-md text-graphite hover:text-ink"
          >
            {visible ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
          </button>
        )}
      </div>
      {hint && (
        <p id={`${name}-hint`} className="mt-1.5 text-xs text-graphite">
          {hint}
        </p>
      )}
    </div>
  );
};

export default Field;
