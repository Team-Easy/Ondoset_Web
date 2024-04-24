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
import StatBox from "../../components/StatBox";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import UpdateIcon from "@mui/icons-material/Update";

const ServerStatus = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
            title="Normal"
            subtitle="AI Model Service Health"
            icon={
              <CheckCircleIcon
                sx={{ color: colors.blueAccent[600], fontSize: "94px" }}
              />
            }
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
            title="Error"
            subtitle="Database Service Health"
            icon={
              <RunningWithErrorsIcon
                sx={{ color: colors.blueAccent[600], fontSize: "26px" }}
              />
            }
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
            title="Error"
            subtitle="Forecast Service Health"
            icon={
              <RunningWithErrorsIcon
                sx={{ color: colors.blueAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ServerStatus;
