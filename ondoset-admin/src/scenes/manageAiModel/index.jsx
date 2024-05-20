import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Typography,
  useTheme,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import MAULineChart from "../../components/TimeLineChart";
import PieChart from "../../components/PieChart";
import StatBox from "../../components/StatBox";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AIHeader from "./header";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import UpdateIcon from "@mui/icons-material/Update";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

const ManageAiModel = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [mainStatus, setMainStatus] = useState("Unknown"); // 초기 상태값을 Unknown으로 설정
  const [aiModelStatus, setAiModelStatus] = useState("Unknown"); // 초기 상태값을 Unknown으로 설정
  const [reportedOOTDCount, setReportedOOTDCount] = useState(0);
  const [mainServerErrorCount, setMainServerErrorCount] = useState(0);
  const [aiModelData, setAiModelData] = useState([]); // 표시되는 AI Model 정보들
  const [aiPerformanceData, setAiPerformanceData] = useState([]); // 표시되는 AI Model Performance 정보들

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

  const aiModelColumns = [
    {
      field: "releasedDate",
      headerName: "Released Date",
      headerAlign: "center",
      align: "center",
      flex: 4,
    },
    {
      field: "version",
      headerName: "Version",
      headerAlign: "center",
      align: "center",
      flex: 2,
    },
    {
      field: "dataCount",
      headerName: "Data Count",
      headerAlign: "center",
      align: "center",
      flex: 2,
    },
    { field: "spacer", headerName: "", flex: 7 },
    {
      field: "actions_test",
      headerName: "Test",
      headerAlign: "center",
      align: "center",
      sortable: false,
      flex: 1.5,
      // align: "center",
      renderCell: (params) => (
        <>
          <IconButton aria-label="bad" onClick={() => {}}>
            <EditIcon />
          </IconButton>
        </>
      ),
    },
    {
      field: "actions_apply",
      headerName: "Apply",
      headerAlign: "center",
      align: "center",
      sortable: false,
      flex: 1.5,
      renderCell: (params) => (
        <>
          <IconButton aria-label="good" onClick={() => {}}>
            <EditIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const aiPerformanceColumns = [
    {
      field: "modelId",
      headerName: "modelId",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "version",
      headerName: "Version",
      headerAlign: "center",
      align: "center",
      flex: 2,
    },
    {
      field: "date",
      headerName: "date",
      headerAlign: "center",
      align: "center",
      flex: 2,
    },
    {
      field: "loss",
      headerName: "loss",
      headerAlign: "center",
      align: "center",
      flex: 2,
    },
    {
      field: "precision",
      headerName: "precision",
      headerAlign: "center",
      align: "center",
      flex: 2,
    },
    {
      field: "recall",
      headerName: "recall",
      headerAlign: "center",
      align: "center",
      flex: 2,
    },
    {
      field: "f1",
      headerName: "f1",
      headerAlign: "center",
      align: "center",
      flex: 2,
    },
  ];

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
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="flex-start"
          sx={{
            boxShadow: "0px 0px 6px rgba(0,0,0,0.2)",
            borderRadius: "5px",
            height: "100%",
          }}
        >
          {/* Blacklist */}
          <Box
            flexGrow={1}
            width="100%"
            // m="20px"
            // sx={{
            //   paddingTop: "1px",
            //   boxShadow: "0px 0px 6px rgba(0,0,0,0.2)",
            //   borderRadius: "5px",
            // }}
          >
            {/* header */}
            <Box
              sx={{
                margin: "20px 20px 20px 20px",
              }}
            >
              <AIHeader
                title="AI Model"
                subtitle="List of applicable AI Models"
              />
            </Box>
            {/* dataGrid */}
            <Box
              m="0 0 0 0"
              width="100%"
              height="57%"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: colors.blueAccent[900],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: colors.blueAccent[900],
                },
                "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
                },
                "& .MuiDataGrid-selectedRowCount": {
                  display: "none",
                },
              }}
            >
              <DataGrid
                rows={aiModelData}
                columns={aiModelColumns}
                getRowId={(row) => row.version}
                disableColumnFilter
              />
            </Box>
            {/* <Box flex={1} p={0} /> */}
            <Divider />
            {/* footer */}
            <Box display="flex" p={1} alignItems="center">
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
          </Box>
        </Box>
        {/* ROW 2 */}
        {/* AI Performance */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="flex-start"
          sx={{
            boxShadow: "0px 0px 6px rgba(0,0,0,0.2)",
            borderRadius: "5px",
            height: "100%",
          }}
        >
          {/* Blacklist */}
          <Box
            flexGrow={1}
            width="100%"
            // m="20px"
            // sx={{
            //   paddingTop: "1px",
            //   boxShadow: "0px 0px 6px rgba(0,0,0,0.2)",
            //   borderRadius: "5px",
            // }}
          >
            {/* header */}
            <Box
              sx={{
                margin: "20px 20px 20px 20px",
              }}
            >
              <AIHeader
                title="AI Model Performance Metrics Table - Collaborative Filtering Model"
                subtitle="Overview of evaluation metrics usd to assess the performance of an AI model"
              />
            </Box>
            {/* dataGrid */}
            <Box
              m="0 0 0 0"
              width="100%"
              height="57%"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: colors.blueAccent[900],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: colors.blueAccent[900],
                },
                "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
                },
                "& .MuiDataGrid-selectedRowCount": {
                  display: "none",
                },
              }}
            >
              <DataGrid
                rows={aiPerformanceData}
                columns={aiPerformanceColumns}
                getRowId={(row) => row.modelId}
                disableColumnFilter
              />
            </Box>
            {/* <Box flex={1} p={0} /> */}
            <Divider />
            {/* footer */}
            <Box display="flex" p={1} alignItems="center">
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
          </Box>
        </Box>
        {/* ROW 3 */}
        {/* AI Train */}
        {/* <Box
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
        ></Box> */}
      </Box>
    </Box>
  );
};

export default ManageAiModel;
