export interface ButtonBase {
  text?: string;
  disabled?: boolean;
  show?: boolean;
  onClick?: () => void;
}

export interface ButtonAppearance {
  variant?: 'primary' | 'secondary' | 'accent' | 'contact' | 'product';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface ButtonBehavior {
  onClick?: () => void;
  disabled?: boolean;
}

export interface ButtonConfig {
  style?: React.CSSProperties;
}