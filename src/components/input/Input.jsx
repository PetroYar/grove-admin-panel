import styles from './Input.module.css'

const Input = ({ label, onChange, textarea, error,className, ...props }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <label>{label}</label>
      {!textarea ? (
        <input onChange={onChange} {...props} />
      ) : (
        <textarea
          style={{ resize: "none" }}
          onChange={onChange}
          {...props}
        ></textarea>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Input;
