import styles from "./Button.module.css";

const Button = ({ onClick,className, children,type }) => {
  return (
    <button onClick={onClick} type={type} className={`${styles.button} ${className}`}>{children}</button>
  );
};

export default Button;
