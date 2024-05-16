import { useState, useEffect } from "react";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import MAULineChart from "../../components/TimeLineChart";
import PieChart from "../../components/PieChart";
import StatBox from "../../components/StatBox";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import UpdateIcon from "@mui/icons-material/Update";
import axios from "axios";

const ManageAiModel = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [mainStatus, setMainStatus] = useState("Unknown"); // 초기 상태값을 Unknown으로 설정
  const [aiModelStatus, setAiModelStatus] = useState("Unknown"); // 초기 상태값을 Unknown으로 설정
  const [reportedOOTDCount, setReportedOOTDCount] = useState(0);
  const [mainServerErrorCount, setMainServerErrorCount] = useState(0);

  useEffect(() => {
    fetchMainStatus();
    handleUpdateAiModelStatus();
  }, []);

  const fetchMainStatus = async () => {
    try {
      const response = await axios.get("/admin/monitor/db");
      const { result: result } = response.data;
      setMainStatus(result);
    } catch (error) {
      console.error("Error updating database status:", error);
    }
  };

  const handleUpdateAiModelStatus = async () => {
    try {
      const aiResponse = await axios.get("/admin/monitor/ai");
      const { result } = aiResponse.data;
      setAiModelStatus(result);
      console.log("AI 페칭 완료");
    } catch (error) {
      console.error("Error updating AiModel status:", error);
    }
  };

  return (
    <Box m="20px">
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="100px"
        gap="20px"
      >
        {/* ROW 1 */}
        {/* AI Model Service Health */}
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
          sx={{
            boxShadow: "0px 0px 6px rgba(0,0,0,0.2)",
            borderRadius: "5px",
            height: "100%",
          }}
        >
          <StatBox
            title={aiModelStatus} // AI 모델의 상태를 title에 반영
            subtitle="AI Model Service Health"
            icon={
              aiModelStatus === "Normal" ? ( // AI 모델 상태에 따라 아이콘 변경
                <CheckCircleIcon
                  sx={{ color: colors.blueAccent[600], fontSize: "94px" }}
                />
              ) : (
                <RunningWithErrorsIcon
                  sx={{ color: colors.blueAccent[600], fontSize: "26px" }}
                />
              )
            }
            onUpdateStatus={handleUpdateAiModelStatus}
          />
        </Box>
        {/* AI Selection */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
          sx={{
            boxShadow: "0px 0px 6px rgba(0,0,0,0.2)",
            borderRadius: "5px",
            height: "100%",
          }}
        ></Box>
        {/* ROW 2 */}
        {/* AI Performance */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
          sx={{
            boxShadow: "0px 0px 6px rgba(0,0,0,0.2)",
            borderRadius: "5px",
            height: "100%",
          }}
        ></Box>
        {/* ROW 3 */}
        {/* AI Train */}
        <Box
          gridColumn="span 12"
          gridRow="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
          sx={{
            boxShadow: "0px 0px 6px rgba(0,0,0,0.2)",
            borderRadius: "5px",
            height: "100%",
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export default ManageAiModel;
