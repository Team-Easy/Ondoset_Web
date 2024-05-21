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

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [mainStatus, setMainStatus] = useState("Unknown"); // 초기 상태값을 Unknown으로 설정
  const [reportedOOTDCount, setReportedOOTDCount] = useState(0);
  const [mainServerErrorCount, setMainServerErrorCount] = useState(0);
  const [refetchLineChart, setRefetchLineChart] = useState(false);
  const [refetchPieChart, setRefetchPieChart] = useState(false);

  useEffect(() => {
    fetchMainStatus();
    fetchReportedOOTDCount();
    fetchMainServerError();
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

  const fetchReportedOOTDCount = () => {
    axios
      .get("/admin/report")
      .then((response) => {
        const reportedOOTDCount = response.data.result.length;
        setReportedOOTDCount(reportedOOTDCount);
      })
      .catch((error) => {
        console.error("Error fetching reported OOTD count:", error);
      });
  };

  const fetchMainServerError = async () => {
    try {
      const mainServerErrorResponse = await axios.get("/admin/monitor/main");
      const { result: mainServerErrorResult } = mainServerErrorResponse.data;
      setMainServerErrorCount(mainServerErrorResult.length);
      console.log("메인 서버 에러 페칭 완료");
    } catch (error) {
      console.error("Error updating mainServer status:", error);
    }
  };

  const handleUpdateLineChart = () => {
    setRefetchLineChart((prev) => !prev);
  };

  const handleUpdatePieChart = () => {
    setRefetchPieChart((prev) => !prev);
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
        {/* Main Server Status */}
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
            title={mainStatus}
            subtitle="Main Server Health"
            icon={
              mainStatus === "Normal" ? ( // 모델 상태에 따라 아이콘 변경
                <CheckCircleIcon
                  sx={{ color: colors.blueAccent[600], fontSize: "94px" }}
                />
              ) : (
                <RunningWithErrorsIcon
                  sx={{ color: colors.blueAccent[600], fontSize: "26px" }}
                />
              )
            }
            onUpdateStatus={fetchMainStatus}
          />
        </Box>
        {/* Reported OOTD */}
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
            title={reportedOOTDCount}
            subtitle="Reported OOTD Count"
            icon={
              <AssignmentIcon
                sx={{ color: colors.blueAccent[600], fontSize: "26px" }}
              />
            }
            onUpdateStatus={fetchReportedOOTDCount}
          />
        </Box>
        {/* Error */}
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
            title={mainServerErrorCount}
            subtitle="Error"
            icon={
              <RunningWithErrorsIcon
                sx={{ color: colors.blueAccent[600], fontSize: "26px" }}
              />
            }
            onUpdateStatus={fetchMainServerError}
          />
        </Box>

        {/* ROW 2 */}
        {/* MAU line chart */}
        <Box
          gridColumn="span 6"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          sx={{
            boxShadow: "0px 0px 6px rgba(0,0,0,0.2)",
            borderRadius: "5px",
            height: "100%",
          }}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.grey[100]}
              >
                Monthly Active Users
              </Typography>
              <Typography variant="h6" color={colors.greenAccent[500]}>
                Last 5 months
              </Typography>
            </Box>
          </Box>
          <Box height="70%" width="100%">
            <MAULineChart refresh={refetchLineChart} />
            {/* <LineChart /> */}
          </Box>
          <Box m={"15px"}>
            <Divider />

            <Box display="flex" mt="4px" mb="20px" alignItems="center">
              <Button
                startIcon={
                  <UpdateIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
                style={{
                  color: colors.grey[100],
                }}
                onClick={handleUpdateLineChart}
              >
                Update Status
              </Button>
            </Box>
          </Box>
        </Box>
        {/* CAT Pie Chart */}
        <Box
          gridColumn="span 6"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          sx={{
            boxShadow: "0px 0px 6px rgba(0,0,0,0.2)",
            borderRadius: "5px",
            height: "100%",
          }}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.grey[100]}
              >
                Combination Add Types
              </Typography>
              <Typography variant="h6" color={colors.greenAccent[500]}>
                Last 5 months
              </Typography>
            </Box>
          </Box>
          <Box height="70%">
            <PieChart refresh={refetchPieChart} />
          </Box>
          <Box m={"15px"}>
            <Divider />

            <Box display="flex" mt="4px" mb="20px" alignItems="center">
              <Button
                startIcon={
                  <UpdateIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
                style={{
                  color: colors.grey[100],
                }}
                onClick={handleUpdatePieChart}
              >
                Update Status
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
