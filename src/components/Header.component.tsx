import { ReactNode } from "react";

interface Types {
  title: string;
  more?: string;
  children?: ReactNode;
}

export default function Header({ title, more, children }: Types) {
  return (
    <div className={`flex items-center justify-between p-4 border-b shadow-sm ${more}`}>
      <h1 className="text-xl font-bold">{title}</h1>
      <div>
        {children}
      </div>
    </div>
  );
}
