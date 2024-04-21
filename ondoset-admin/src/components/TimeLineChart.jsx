import { ResponsiveLine } from "@nivo/line";
import { timeLinearLineData as data } from "../data/mockData";

const MAULineChart = () => {
  return (
    <ResponsiveLine
      animate
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
      // height={400}
      //   margin={{
      //     bottom: 60,
      //     left: 80,
      //     right: 20,
      //     top: 20,
      //   }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      pointBorderColor={{
        from: "color",
        modifiers: [["darker", 0.3]],
      }}
      pointBorderWidth={1}
      pointSize={16}
      pointSymbol={function noRefCheck() {}}
      useMesh
      // width={900}
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
