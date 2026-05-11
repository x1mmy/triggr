type LogoMarkProps = {
  size?: number;
  color?: string;
};

export function LogoMark({ size = 22, color = '#F0F0EE' }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <line x1="22" y1="2" x2="8" y2="34" stroke={color} strokeWidth="3" strokeLinecap="square" />
      <line x1="30" y1="2" x2="16" y2="34" stroke={color} strokeWidth="3" strokeLinecap="square" />
    </svg>
  );
}
