
import styles from  './StatsCard.module.css'

const StatsCard = ({ count, icon, text }) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.info}>
        <p className={styles.count}>{count}</p>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
};

export default StatsCard