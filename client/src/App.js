import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./App.css";

export function transformDataForHighcharts(data) {
  const temperatures = data.entries.map(({ temperature }) => {
    return temperature;
  });

  const startTime = new Date(data.entries[0].time).getTime();
  const endTime = new Date(
    data.entries[data.entries.length - 1].time
  ).getTime();

  return {
    temperatures,
    startTime,
    endTime,
    maxTemperature: data.maxTemperature,
    minTemperature: data.minTemperature,
  };
}

function show({ target }) {
  const series = target.xAxis.series;
  let i = target.xAxis.length;
  let otherSeries;

  while (i--) {
    otherSeries = series[i];
    if (otherSeries !== target.xAxis.series && otherSeries.visible) {
      otherSeries.hide();
    }
  }
}

function legendItemClick({ target }) {
  if (target.visible) {
    return false;
  }
}

function formatYaxisLabels(thing) {
  console.log(thing);
  return "";
}

function App() {
  const [hasError, setError] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/data");
        const json = await res.json();
        const transformedData = transformDataForHighcharts(json);
        setData(transformedData);
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, []);
  const date = Date.UTC(2018, 2, 21);
  const options = {
    credits: {
      enabled: false,
    },
    title: { text: "" },
    series: [
      {
        name: "Temperature",
        data: data.temperatures,
        pointStart: data.startTime,
        pointInterval: 1000 * 60 * 60,
        type: "spline",
        tooltip: {
          valueDecimals: 1,
        },
        events: {
          show: show,
          legendItemClick: legendItemClick,
        },
      },
    ],
    xAxis: {
      type: "datetime",
      tickInterval: 1000 * 60 * 60,
      title: { text: "" },
    },
    yAxis: {
      type: "linear",
      min: data.minTemperature,
      max: data.maxTemperature,
      title: { text: "" },
      labels: {
        format: `{value}C`,
      },
    },
    legend: {
      enabled: false,
    },
  };
  return (
    <div className="app">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default App;
