import { ChangeEvent } from "react";
import "./style.css";

const FormInput = ({
  type,
  value,
  changeHandler,
  placeholder,
  name,
  minLength,
}: {
  type: string;
  value: string;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name: string;
  minLength?: number;
}) => {
  return (
    <div className="pos-rel w-100p my-1-5">
      <input
        type={type}
        className="input std-input"
        placeholder={placeholder}
        value={value}
        name={name}
        minLength={minLength}
        onChange={changeHandler}
        required
        autoComplete="off"
      />
    </div>
  );
};

export { FormInput };
