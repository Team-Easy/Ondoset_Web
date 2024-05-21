import React, { useState, useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import axios from "axios";

const PieChart = ({ refresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/admin/monitor/recording-path");
        if (response.data.code === "common_2000") {
          // 데이터가 성공적으로 받아와졌을 때 처리
          console.log(response.data.result);
          console.log(response.data.result.past);
          const data = [
            {
              id: "past",
              label: "Past",
              value: response.data.result.past,
              color: "hsl(104, 70%, 50%)",
            },
            {
              id: "ai",
              label: "AI",
              value: response.data.result.ai,
              color: "hsl(162, 70%, 50%)",
            },
            {
              id: "directly",
              label: "Directly",
              value: response.data.result.directly,
              color: "hsl(291, 70%, 50%)",
            },
          ];

          setChartData(data);
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
  }, [refresh]);

  return (
    <ResponsivePie
      data={chartData}
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
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
