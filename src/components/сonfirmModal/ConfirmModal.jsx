import React from "react";

import styles from  "./ConfirmModal.module.css";
import Button from "../button/Button";

const ConfirmModal = ({message,onCancel,onConfirm}) => {
  return (
    <div className={styles.popup}>
      <p>{message}</p>
      <div className={styles.buttons}>
        <Button onClick={onConfirm} className={styles.confirm}>
          Так
        </Button>
        <Button onClick={onCancel} className={styles.cancel}>
          Ні
        </Button>
      </div>
    </div>
  );
};

export default ConfirmModal;
