// File: TextInput.tsx

import React, { ChangeEvent } from "react";

interface TextInputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  className?: string;
  disable?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  type,
  placeholder,
  value,
  name,
  className,
  disable,
  onChange,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      disabled={disable}
      onChange={onChange}
      className={className}
    />
  );
};

export default TextInput;
