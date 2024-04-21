import {
  Box,
  Typography,
  useTheme,
  Divider,
  Button,
  SvgIcon,
} from "@mui/material";
import { tokens } from "../theme";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import ondosetLogo from "../assets/ondoset_logo_white.svg";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      width="100%"
      height="100%"
      m="15px"
      display="flex"
      flexDirection="column"
    >
      {/* top Icon + status */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        {/* <Box>{icon}</Box> */}
        <SvgIcon
          sx={{
            blockSize: "90px",
            minBlockSize: "90px",
            minInlineSize: "90px",
            overflow: "visible",
            alignContent: "flex-start",
          }}
        >
          {/* <image href={ondosetLogo} width="100%" height="100%" /> */}
          {icon}
        </SvgIcon>
        <Box>
          <Typography variant="h6" sx={{ color: colors.greenAccent[500] }}>
            {subtitle}
          </Typography>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
      </Box>

      <Box flex="1" />
      <Divider />

      <Box display="flex" mt="4px" mb="20px" alignItems="center">
        <PersonAddIcon
          sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
        />
        <Button sx={{}}>Update Status</Button>
      </Box>
    </Box>
  );
};

export default StatBox;
