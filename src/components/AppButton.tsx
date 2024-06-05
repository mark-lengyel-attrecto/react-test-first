import { ReactNode } from "react";
import { Button } from "react-bootstrap";
import { Variant } from "react-bootstrap/esm/types";

interface AppButtonProps {
  variant: Variant;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  children?: ReactNode;
  size?: "lg" | "sm";
}

const AppButton: React.FC<AppButtonProps> = ({
  variant,
  onClick,
  className,
  disabled,
  children,
  size,
}) => {
  return (
    <Button
      size={size}
      className={className}
      variant={variant}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default AppButton;
