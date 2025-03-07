import React, { useEffect, useState } from "react";
import { Layers, Package, Users } from "lucide-react";
import styles from "./Deshboard.module.css";
import ActivityChart from "../../components/activityChart/ActivityChart";
import { getData } from "../../libs/services";
import StatsCard from "../../components/statsCard/StatsCard";

const Deshboard = (props) => {
  const [stats,setStats] = useState(0)
  useEffect(() => {
    const getCountUsers = async (params) => {
      try {
        const res = await getData("/stats");
       setStats(res)
      } catch (error) {
        console.log(error);
      }
    };
    getCountUsers();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.statsContainer}>
        <StatsCard
          count={stats?.users}
          icon={<Users className={styles.icon} />}
          text="Користувачі"
        />
        <StatsCard
          count={stats?.products}
          icon={<Package className={styles.icon} />}
          text="Продукти"
        />
        <StatsCard
          count={stats?.categories}
          icon={<Layers className={styles.icon} />}
          text="Категорії"
        />
      </div>
      <ActivityChart />
    </div>
  );
};

export default Deshboard;
