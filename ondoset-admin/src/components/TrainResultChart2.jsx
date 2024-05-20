import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import axios from "axios";

const TRCLineChart2 = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [chartData, setChartData] = useState([]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get("/admin/monitor/active-user");
  //         if (response.data.code === "common_2000") {
  //           // 데이터가 성공적으로 받아와졌을 때 처리
  //           console.log(response.data.result);
  //           const result = response.data.result.map((item, index) => ({
  //             x: index * 20, // 0부터 20씩 증가하는 값으로 설정
  //             y: item, // y값은 받아온 값 그대로 사용
  //           }));
  //           setChartData([{ id: "active-users", data: result }]);
  //         } else {
  //           // 요청 실패시 에러 처리
  //           console.error("Failed to fetch data:", response.data.message);
  //         }
  //       } catch (error) {
  //         // 네트워크 오류 등으로 인한 요청 실패시 에러 처리
  //         console.error("Failed to fetch data:", error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  useEffect(() => {
    // 더미 데이터 생성 함수
    const generateDummyData = () => {
      const data = [];
      for (let i = 0; i < 100; i++) {
        data.push((Math.random() * 200) / 3); // 0부터 200까지의 무작위 값 생성
      }
      return data;
    };

    const fetchData = async () => {
      try {
        // 더미 데이터 생성
        const dummyData = generateDummyData();
        // 더미 데이터를 차트 데이터 형식으로 변환
        const result = dummyData.map((item, index) => ({
          x: index, // 0부터 20씩 증가하는 값으로 설정
          y: item, // y값은 더미 데이터 값 그대로 사용
        }));
        setChartData([{ id: "active-users", data: result }]);
      } catch (error) {
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
        legend: "time scale",
        legendOffset: -12,
        tickValues: [0, 20, 40, 60], // 0부터 20씩 증가하는 값 설정
      }}
      axisLeft={{
        legend: "linear scale",
        legendOffset: 12,
        format: (value) => `${value}`, // y축의 값 형식을 설정
      }}
      curve="monotoneX"
      data={chartData}
      enablePointLabel={false}
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
    />
  );
};

export default TRCLineChart2;
