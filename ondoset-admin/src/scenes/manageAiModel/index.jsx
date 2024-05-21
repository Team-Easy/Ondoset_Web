import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Typography,
  TextField,
  Grid,
  useTheme,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import StatBox from "../../components/StatBox";
import TRCLineChart1 from "../../components/TrainResultChart1";
import TRCLineChart2 from "../../components/TrainResultChart2";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AIHeader from "./header";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import UpdateIcon from "@mui/icons-material/Update";
import EditIcon from "@mui/icons-material/Edit";
import AISubHeader from "./subHeader";
import AiStatBox from "./aiStatBox";
import axios from "axios";

const ManageAiModel = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [mainStatus, setMainStatus] = useState("Unknown"); // 초기 상태값을 Unknown으로 설정
  const [aiModelStatus, setAiModelStatus] = useState(); // 초기 상태값을 Unknown으로 설정
  const [reportedOOTDCount, setReportedOOTDCount] = useState(0);
  const [mainServerErrorCount, setMainServerErrorCount] = useState(0);
  const [aiModelData, setAiModelData] = useState([]); // 표시되는 AI Model 정보들
  const [aiPerformanceData, setAiPerformanceData] = useState([]); // 표시되는 AI Model Performance 정보들
  // AI Hyperparameter
  const [learningRate, setLearningRate] = useState("");
  const [latentVectorSize, setLatentVectorSize] = useState("");
  const [regularizationParameter, setRegularizationParameter] = useState("");
  const [iteration, setIteration] = useState("");

  useEffect(() => {
    handleUpdateAiModelStatus();
    fetchAiModelList();
    fetchAiPerfomanceData();
  }, []);

  const handleUpdateAiModelStatus = async () => {
    try {
      const aiResponse = await axios.get("/admin/ai/model-version");
      const { result } = aiResponse.data;
      setAiModelStatus(result);
      console.log(result);
    } catch (error) {
      console.error("Error updating AiModel status:", error);
    }
  };

  const fetchAiModelList = async () => {
    try {
      const response = await axios.get("/admin/ai/list");
      const { result } = response.data;
      setAiModelData(result.result);
    } catch (error) {
      console.error("Error updating AiModel status:", error);
    }
  };

  const fetchAiPerfomanceData = async () => {
    try {
      const response = await axios.get("/admin/ai/cfModel");
      const { result } = response.data;
      setAiPerformanceData(result.result);
    } catch (error) {
      console.error("Error updating AiModel status:", error);
    }
  };

  const handleNumberInputChange = (event) => {
    const { value } = event.target;
    if (/^\d*\.?\d*$/.test(value)) {
      event.target.value = value;
    } else {
      event.preventDefault();
    }
  };

  const handlePostRequest = async () => {
    const data = {
      learningRate,
      latentVectorSize,
      regularizationParameter,
      iteration,
    };

    try {
      const response = await axios.post("/admin/ai/train", data);
      console.log("POST 요청 성공:", response.data);
    } catch (error) {
      console.error("POST 요청 실패:", error);
    }
  };

  const aiModelColumns = [
    {
      field: "modelId",
      headerName: "Model ID",
      headerAlign: "center",
      align: "center",
      flex: 2,
    },
    {
      field: "date",
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
      headerName: "Model ID",
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
      headerName: "Date",
      headerAlign: "center",
      align: "center",
      flex: 2,
    },
    {
      field: "loss",
      headerName: "Loss",
      headerAlign: "center",
      align: "center",
      flex: 2,
    },
    {
      field: "precision",
      headerName: "Precision",
      headerAlign: "center",
      align: "center",
      flex: 2,
    },
    {
      field: "recall",
      headerName: "Recall",
      headerAlign: "center",
      align: "center",
      flex: 2,
    },
    {
      field: "f1",
      headerName: "F1",
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
          gridRow="span 4"
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
          <AiStatBox
            title={aiModelStatus !== undefined ? "Normal" : "Unknown"} // AI 모델의 상태를 title에 반영
            subtitle="AI Model Service Health"
            icon={
              aiModelStatus !== undefined ? ( // AI 모델 상태에 따라 아이콘 변경
                <CheckCircleIcon
                  sx={{ color: colors.blueAccent[600], fontSize: "94px" }}
                />
              ) : (
                <RunningWithErrorsIcon
                  sx={{ color: colors.blueAccent[600], fontSize: "26px" }}
                />
              )
            }
            description={aiModelStatus}
            onUpdateStatus={handleUpdateAiModelStatus}
          />
        </Box>
        {/* AI Selection */}
        <Box
          gridColumn="span 8"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="flex-start"
          sx={{
            boxShadow: "0px 0px 6px rgba(0,0,0,0.2)",
            borderRadius: "5px",
            // height: "100%",
          }}
        >
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
              height="320px"
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
          gridRow="span 4"
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
              height="320px"
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
            <Box
              display="flex"
              p={1}
              alignItems="center"
              sx={
                {
                  // margin: "20px 20px 20px 20px",
                }
              }
            >
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
        {/* AI Train */}
        <Box
          gridColumn="span 12"
          gridRow="span 9"
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
          {/* header */}
          <Box
            sx={{
              margin: "20px 20px 20px 20px",
            }}
          >
            <AIHeader
              title="AI Model Training"
              subtitle="Input hyper-parameters and displays the training results in charts"
            />
          </Box>
          {/* sub header */}
          <Box
            sx={{
              margin: "20px 20px 20px 20px",
              width: "95%",
            }}
          >
            <AISubHeader title="Collaborative Filtering" />
            <Divider sx={{ paddingTop: "10px" }} />
          </Box>
          {/* TextFields */}
          <Box
            sx={{
              width: "100%", // Ensure full width of the container
              padding: "0 20px 20px 20px", // Add padding to match the margins
            }}
          >
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={2.3}>
                <TextField
                  label="Learning rate"
                  type="number"
                  fullWidth
                  onKeyDown={handleNumberInputChange}
                />
              </Grid>
              <Grid item xs={2.3}>
                <TextField
                  label="Latent Vector Size"
                  type="number"
                  fullWidth
                  onKeyDown={handleNumberInputChange}
                />
              </Grid>
              <Grid item xs={2.3}>
                <TextField
                  label="Regularization Parameter"
                  type="number"
                  fullWidth
                  onKeyDown={handleNumberInputChange}
                />
              </Grid>
              <Grid item xs={2.3}>
                <TextField
                  label="#Iteration"
                  type="number"
                  fullWidth
                  onKeyDown={handleNumberInputChange}
                />
              </Grid>
              <Grid item xs={2.3}>
                <TextField
                  label="Count Weight"
                  type="number"
                  fullWidth
                  onKeyDown={handleNumberInputChange}
                />
              </Grid>
            </Grid>
          </Box>
          {/* POST Button */}
          <Box
            sx={{
              // margin: "20px 20px 20px 20px",
              display: "flex",
              justifyContent: "flex-end",
              width: "98%",
            }}
          >
            <Button
              onClick={handlePostRequest}
              // sx={{ fontSize: "12px" }}
              style={{
                backgroundColor: colors.blueAccent[900],
                color: colors.grey[100],
              }}
            >
              Submit
            </Button>
          </Box>
          {/* Train result header */}
          <Box
            sx={{
              margin: "20px 20px 0px 20px",
              width: "95%",
            }}
          >
            <AISubHeader title="Training Result" />
            <Divider sx={{ paddingTop: "10px" }} />
          </Box>
          {/* Charts */}
          <Box
            height="300px"
            width="100%"
            display="flex"
            justifyContent="space-between" // 차트들 사이에 공간을 균등하게 분배
            alignItems="center" // 차트를 수직으로 가운데 정렬
            // flexWrap="wrap" // 창 크기에 따라 차트가 자동으로 다음 줄로 이동
            gap="20px" // 차트들 사이에 여유 공간 추가
          >
            {/* <Box> */}
            <Box>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: colors.grey[100], paddingLeft: "20px" }}
              >
                Training
              </Typography>
            </Box>

            <Box height="300px" width="100%">
              <TRCLineChart1 />
              {/* <TRCLineChart1 /> */}
            </Box>
            <Box>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: colors.grey[100] }}
              >
                Validation
              </Typography>
            </Box>

            <Box height="300px" width="100%">
              <TRCLineChart2 option="true" />
              <TRCLineChart2 />
            </Box>

            <Divider />
            {/* footer */}
            <Box display="flex" p={1} alignItems="center"></Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ManageAiModel;
