import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
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
        gridTemplateColumns="repeat(8, 1fr)"
        gridAutoRows="100px"
        gap="20px"
      >
        {/* ROW 1 */}
        {/* Main Server Status */}
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
            title="Normal"
            subtitle="Main Server Health"
            icon={
              <CheckCircleIcon
                sx={{ color: colors.blueAccent[600], fontSize: "94px" }}
              />
            }
          />
        </Box>
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
            title="431,225"
            subtitle="Reported OOTD Count"
            icon={
              <AssignmentIcon
                sx={{ color: colors.blueAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        {/* Database ServiceHealth */}
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
            title="32,441"
            subtitle="Error"
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
            title="32,441"
            subtitle="Error"
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
