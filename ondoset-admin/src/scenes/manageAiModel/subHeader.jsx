import { Typography, Box, useTheme, Divider } from "@mui/material";
import { tokens } from "../../theme";

const AISubHeader = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box>
      <Typography
        variant="h4"
        color={colors.grey[100]}
        // fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="h7" color={colors.greenAccent[400]}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default AISubHeader;
