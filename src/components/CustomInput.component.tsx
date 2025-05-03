import React from 'react';

interface CustomInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type: string;
  more?: string;
  id?: string;
  nameLabel?: string
}

const CustomInput: React.FC<CustomInputProps> = ({ nameLabel = '' ,id = '' ,value, onChange, placeholder = '', type = 'text', more = '' }) => {
  return (
    <div>
      <label htmlFor={nameLabel}>{nameLabel || 'NO NAME' }</label>
      <input
        type={type}
        id={id}
        name={nameLabel}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border rounded px-3 py-2 w-[100%] outline-none focus:ring-2 focus:ring-blue-500 ${more}`}
      />
    </div>
    
  );
};

export default CustomInput;
