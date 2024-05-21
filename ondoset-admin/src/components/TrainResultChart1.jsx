import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import { tokens } from "../theme";
import { Box, Typography, useTheme } from "@mui/material";
import axios from "axios";

const TRCLineChart1 = ({ refetchTrigger }) => {
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
    const fetchData = async () => {
      try {
        const response = await axios.get("/admin/ai/train");
        if (response.data.code === "common_2000") {
          const rawData = response.data.result.results;
          const chartData = transformDataToChartFormat(rawData);
          setChartData(chartData);
        } else {
          console.error("Failed to fetch data:", response.data.message);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [refetchTrigger]);

  const transformDataToChartFormat = (data) => {
    // let types = []
    // if (option === true) {
    //   types = [ "train_loss"];
    // } else {
    //   types = [
    //     "validation_loss",
    //     "validation precision",
    //     "validation recall",
    //     "validataion f1_score",
    //   ];
    // }
    const types = ["train_loss"];

    const chartData = types.map((type) => ({
      id: type,
      data: data
        .filter((item) => item.type === type)
        .map((item) => ({
          x: item.epoch,
          y: item.value,
        })),
    }));

    return chartData;
  };

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
        tooltip: {
          container: {
            background: colors.grey[900],
            color: colors.grey[100],
            fontSize: "13px",
          },
        },
      }}
      axisBottom={{
        legend: "epoch",
        legendOffset: -12,
        tickValues: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200],
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
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: -80,
          translateY: -20,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          // itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          itemBackground: colors.grey[900],
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default TRCLineChart1;
