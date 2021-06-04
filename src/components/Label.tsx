import React from 'react';

interface LabelProps {
  label: string;
  children: React.ReactNode;
}

const Label = ({ label, children }: LabelProps) => (
  <li className="py-1">
    <span className="font-semibold">{label}: </span>
    {children}
  </li>
);

export default Label;
