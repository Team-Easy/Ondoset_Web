import {
  Box,
  Typography,
  Icon,
  IconButton,
  useTheme,
  Button,
  Slide,
} from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";

const Topbar = ({ handleLogin, handleLogout }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutButton, setShowLogoutButton] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutButton(!showLogoutButton);
  };

  const formatPath = (path) => {
    if (path === "/") {
      return "DASHBOARD";
    }
    return path
      .replace("/", "")
      .replace("-", " ")
      .replace("-", " ")
      .toUpperCase();
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      p={2}
      sx={{
        boxShadow: "0px 0px 6px rgba(0,0,0,0.2)",
        borderRadius: "5px",
      }}
    >
      <Box ml="5px">
        {/* add subtitle if needed-> will be added below title */}
        <Header title={formatPath(location.pathname)} subtitle="" />
      </Box>

      {/* ICONS */}
      <Box display="flex" alignItems="center">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={handleLogoutClick}>
          <PersonOutlinedIcon />
        </IconButton>
        {/* 조건부 렌더링으로 로그아웃 버튼을 표시 */}
        <Slide
          direction="left"
          in={showLogoutButton}
          timeout={100}
          mountOnEnter
          unmountOnExit
        >
          <Button
            variant="outlined"
            onClick={handleLogout}
            style={{
              color: colors.blueAccent[100],
              borderColor: colors.blueAccent[100],
            }}
          >
            Logout
          </Button>
        </Slide>
      </Box>
    </Box>
  );
};

export default Topbar;
