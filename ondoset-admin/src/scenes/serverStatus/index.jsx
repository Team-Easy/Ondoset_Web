import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Typography,
  useTheme,
  SvgIcon,
} from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions, mainServerErrorData } from "../../data/mockData";
import axios from "axios";
import StatBox from "../../components/StatBox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import UpdateIcon from "@mui/icons-material/Update";

const ServerStatus = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [aiModelStatus, setAiModelStatus] = useState("Unknown"); // 초기 상태값을 Unknown으로 설정
  const [databaseStatus, setDatabaseStatus] = useState("Unknown"); // 초기 상태값을 Unknown으로 설정
  const [forecastStatus, setForecastStatus] = useState("Unknown"); // 초기 상태값을 Unknown으로 설정

  useEffect(() => {
    // 컴포넌트가 마운트될 때 한 번만 GET 요청을 보내고 AI 모델의 상태를 가져옴
    const fetchData = async () => {
      try {
        const response = await axios.get("/admin/monitor/ai");
        const { result } = response.data;
        setAiModelStatus(result); // 응답에서 추출한 result 값을 상태에 저장

        const dbResponse = await axios.get("/admin/monitor/db");
        const { result: dbResult } = dbResponse.data;
        setDatabaseStatus(dbResult); // 응답에서 추출한 결과값을 상태에 저장

        const forecastResponse = await axios.get("/admin/monitor/weather");
        const { result: forecastResult } = forecastResponse.data;
        setForecastStatus(forecastResult); // 응답에서 추출한 결과값을 상태에 저장
      } catch (error) {
        console.error("Error fetching AI model status:", error);
      }
    };

    fetchData(); // fetchData 함수 호출
  }, []); // 빈 배열을 전달하여 useEffect가 컴포넌트가 마운트될 때 한 번만 실행되도록 설정

  const handleUpdateAiModelStatus = async () => {
    try {
      const aiResponse = await axios.get("/admin/monitor/ai");
      const { result } = aiResponse.data;
      setAiModelStatus(result);
      console.log("AI 페칭 완료");
    } catch (error) {
      console.error("Error updating database status:", error);
    }
  };

  const handleUpdateDatabaseStatus = async () => {
    try {
      const dbResponse = await axios.get("/admin/monitor/db");
      const { result: dbResult } = dbResponse.data;
      setDatabaseStatus(dbResult);
      console.log("DB 페칭 완료");
    } catch (error) {
      console.error("Error updating database status:", error);
    }
  };

  const handleUpdateForecastStatus = async () => {
    try {
      const forecastResponse = await axios.get("/admin/monitor/weather");
      const { result: forecastResult } = forecastResponse.data;
      setForecastStatus(forecastResult);
      console.log("기상청 페칭 완료");
    } catch (error) {
      console.error("Error updating forecast status:", error);
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
        {/* Col 0 */}
        {/* Main Server Error */}
        <Box
          gridColumn="span 8"
          gridRow="span 6"
          backgroundColor={colors.primary[400]}
          padding="0px 15px 0px 15px"
          overflow="auto"
          sx={{
            boxShadow: "0px 0px 6px rgba(0,0,0,0.2)",
            borderRadius: "5px",
            height: "100%",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            colors={colors.grey[100]}
            p="15px 0px 15px 0px"
          >
            <Typography
              variant="h3"
              fontWeight="bold"
              textAlign="right"
              sx={{ color: colors.grey[100] }}
            >
              Main Server Current Error
            </Typography>

            <Button
              startIcon={
                <UpdateIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
              style={{
                color: colors.grey[100],
              }}
            >
              Update Status
            </Button>
          </Box>

          <Divider />

          {mainServerErrorData.map((errorData, i) => (
            <Box key={`${i}`} alignContent={"center"}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                p="15px"
              >
                <SvgIcon
                  sx={{
                    blockSize: "90px",
                    minBlockSize: "90px",
                    minInlineSize: "90px",
                    overflow: "visible",
                    alignContent: "flex-start",
                  }}
                >
                  <RunningWithErrorsIcon
                    sx={{ color: colors.blueAccent[600], fontSize: "94px" }}
                  />
                </SvgIcon>

                <Box>
                  <Typography
                    color={colors.grey[500]}
                    variant="h5"
                    fontWeight="600"
                    align="right"
                  >
                    Main Server Error Log
                  </Typography>
                  <Typography color={colors.grey[500]} align="right">
                    Error Level : {errorData.level}
                  </Typography>
                  <Typography variant="h3" fontWeight="600" align="right">
                    Error Location: {errorData.location}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" justifyContent="center">
                <Divider width="95%" />
              </Box>
            </Box>
          ))}
        </Box>
        {/* Main Server Status */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
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
            title="Normal"
            subtitle="Main Server Health"
            icon={
              <CheckCircleIcon
                sx={{ color: colors.blueAccent[600], fontSize: "94px" }}
              />
            }
          />
        </Box> */}
        {/* AI Model Service Health */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
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

        {/* ROW 2 */}
        {/* Database ServiceHealth */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
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
            title={databaseStatus} // Database 서비스의 상태를 title에 반영
            subtitle="Database Service Health"
            icon={
              databaseStatus === "Normal" ? ( // Database 서비스 상태에 따라 아이콘 변경
                <CheckCircleIcon
                  sx={{ color: colors.blueAccent[600], fontSize: "94px" }}
                />
              ) : (
                <RunningWithErrorsIcon
                  sx={{ color: colors.blueAccent[600], fontSize: "26px" }}
                />
              )
            }
            onUpdateStatus={handleUpdateDatabaseStatus}
          />
        </Box>
        {/* Forecast Service Health */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
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
            title={forecastStatus} // Forecast 서비스의 상태를 title에 반영
            subtitle="Forecast Service Health"
            icon={
              forecastStatus === "Normal" ? ( // Forecast 서비스 상태에 따라 아이콘 변경
                <CheckCircleIcon
                  sx={{ color: colors.blueAccent[600], fontSize: "94px" }}
                />
              ) : (
                <RunningWithErrorsIcon
                  sx={{ color: colors.blueAccent[600], fontSize: "26px" }}
                />
              )
            }
            onUpdateStatus={handleUpdateForecastStatus}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ServerStatus;
