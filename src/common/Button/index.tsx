import { StyledButton } from "./styles";
import { ButtonProps } from "../types";

export const Button = ({ color, children, onClick, className }: ButtonProps) => (
  <StyledButton color={color} onClick={onClick} className={className}>
    {children}
  </StyledButton>
);
