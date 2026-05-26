import { SVGProps } from "react";

export const EarnCoinIcon = ({
  size = 24,
  strokeWidth = 2,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M14.5 9.5c-.5-1-1.5-1.5-2.7-1.5-1.6 0-2.8.9-2.8 2.1 0 1.1.9 1.7 2.5 2l1 .2c1.6.3 2.5.9 2.5 2 0 1.2-1.2 2.2-2.8 2.2-1.3 0-2.3-.5-2.8-1.5" />
    <path d="M12 6.5v11" />
  </svg>
);

export default EarnCoinIcon;
