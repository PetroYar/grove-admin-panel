import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { getData } from "../../libs/services";

const ActivityChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData("/visit");
        const labels = data.map((item) => item.date.split("T")[0]);
        const values = data.map((item) => item.count);

        setChartData({
          labels,
          datasets: [
            {
              label: "Активність",
              data: values,
              borderColor: "rgb(119, 76, 43)",
              hoverBackgroundColor: "rgba(251 255 0 / 0.2)",
              tension: 0.4,
              fill: true,
              pointStyle: "circle",
              pointBackgroundColor: "rgb(119, 76, 43)",
              pointRadius: 3,
            },
          ],
        });
      } catch (error) {
        console.error(" Помилка завантаження:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: "100%", maxWidth: "400px" }}>
      {chartData ? <Line data={chartData} /> : <span>Loading...</span>}
    </div>
  );
};

export default ActivityChart;
