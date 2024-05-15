import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import axios from "axios";

const MAULineChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/admin/monitor/active-user");
        if (response.data.code === "common_2000") {
          // 데이터가 성공적으로 받아와졌을 때 처리
          const result = response.data.result.map((item) => ({
            x: new Date(item.period * 1000), // UNIX 타임스탬프를 Date 객체로 변환
            y: item.count,
          }));
          setChartData([{ id: "active-users", data: result }]);
        } else {
          // 요청 실패시 에러 처리
          console.error("Failed to fetch data:", response.data.message);
        }
      } catch (error) {
        // 네트워크 오류 등으로 인한 요청 실패시 에러 처리
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveLine
      animate
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      axisBottom={{
        format: "%b %d",
        legend: "time scale",
        legendOffset: -12,
        tickValues: "every month",
      }}
      axisLeft={{
        legend: "linear scale",
        legendOffset: 12,
      }}
      curve="monotoneX"
      data={chartData}
      enablePointLabel
      enableTouchCrosshair
      margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
      pointBorderColor={{
        from: "color",
        modifiers: [["darker", 0.3]],
      }}
      pointBorderWidth={1}
      pointSize={16}
      pointSymbol={function noRefCheck() {}}
      useMesh
      xFormat="time:%Y-%m-%d"
      xScale={{
        format: "%Y-%m-%d",
        precision: "day",
        type: "time",
        useUTC: false,
      }}
      yScale={{
        type: "linear",
      }}
    />
  );
};

export default MAULineChart;
