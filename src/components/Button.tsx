import { ButtonProps } from "../definitions";

const Button = (p: ButtonProps): JSX.Element => {
  return (
    <button className={`bg-${p.color} rounded-full px-4 py-1 font-semibold`} onClick={p.onClick}>
      {p.children}
    </button>
  );
};

Button.defaultProps = {
  color: "dark",
};

export default Button;
