import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./Schedule.scss";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const API_KEY = "dffb5faf3da0fbd0a3322d7191b3c18f";

export const HourlyForecastChart = ({ city }) => {
  const [labels, setLabels] = useState([]);
  const [temps, setTemps] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        // беремо перші 16 точок (це ~48 годин по 3 години)
        const slice = data.list.slice(0, 16);

        const newLabels = slice.map((x) => {
          // "2026-02-28 12:00:00" -> "12 pm"
          const time = x.dt_txt.slice(11, 16); // HH:MM
          const h = Number(time.slice(0, 2));
          const ampm = h >= 12 ? "pm" : "am";
          const hour12 = h % 12 === 0 ? 12 : h % 12;
          return `${hour12} ${ampm}`;
        });

        const newTemps = slice.map((x) => Math.round(x.main.temp));

        setLabels(newLabels);
        setTemps(newTemps);
      });
  }, [city]);

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: temps,
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.35,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => `${value}°C`,
        },
        grid: {
          drawBorder: false,
        },
      },
      x: {
        grid: {
          drawBorder: false,
        },
      },
    },
  };

  return (
    <section className="hourly">
    <div className="container">
      <div className="hourly__wrapper">
        <h2 className="hourly__title">Hourly forecast</h2>
        <div className="hourly__chart">
          <Line data={data} options={options} />
        </div>
      </div>
      </div>
    </section>
  );
};