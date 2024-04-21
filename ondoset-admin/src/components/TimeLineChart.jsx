import { ResponsiveLine } from "@nivo/line";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { timeLinearLineData as data } from "../data/mockData";

const MAULineChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
        tickValues: "every 2 days",
      }}
      axisLeft={{
        legend: "linear scale",
        legendOffset: 12,
      }}
      curve="monotoneX"
      data={data}
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
