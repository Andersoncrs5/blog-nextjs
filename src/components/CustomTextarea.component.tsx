import React from 'react';

interface CustomTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  more?: string
  nameLabel?: string
}

const CustomTextarea: React.FC<CustomTextareaProps> = ({ nameLabel = '' ,value, onChange, placeholder = '', rows = 4, more = '' }) => {
  return (
    <div>
      <label htmlFor={nameLabel}>{nameLabel || 'NO NAME' }</label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 resize-none w-full ${more}`}
      />
    </div>
  );
};

export default CustomTextarea;
// 