// import { Box, Typography, Icon, IconButton, useTheme } from "@mui/material";
// import { useContext } from "react";
// import { ColorModeContext, tokens } from "../../theme";
// import InputBase from "@mui/material/InputBase";
// import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import SearchIcon from "@mui/icons-material/Search";
// import Header from "../../components/Header";
// import { useLocation } from "react-router-dom";

// const Topbar = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const colorMode = useContext(ColorModeContext);
//   const location = useLocation();

//   const formatPath = (path) => {
//     if (path === "/") {
//       return "DASHBOARD";
//     }
//     return path
//       .replace("/", "")
//       .replace("-", " ")
//       .replace("-", " ")
//       .toUpperCase();
//   };

//   return (
//     <Box
//       display="flex"
//       justifyContent="space-between"
//       alignItems="flex-start"
//       p={2}
//       sx={{
//         boxShadow: "0px 0px 6px rgba(0,0,0,0.2)",
//         borderRadius: "5px",
//       }}
//     >
//       <Box ml="5px">
//         {/* add subtitle if needed-> will be added below title */}
//         <Header title={formatPath(location.pathname)} subtitle="" />
//       </Box>

//       {/* ICONS */}
//       <Box display="flex">
//         <IconButton onClick={colorMode.toggleColorMode}>
//           {theme.palette.mode === "dark" ? (
//             <DarkModeOutlinedIcon />
//           ) : (
//             <LightModeOutlinedIcon />
//           )}
//         </IconButton>
//         <IconButton>
//           <PersonOutlinedIcon />
//         </IconButton>
//       </Box>
//     </Box>
//   );
// };

// export default Topbar;

import {
  Box,
  Typography,
  Icon,
  IconButton,
  useTheme,
  Button,
} from "@mui/material";
import { useContext } from "react";
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

const Topbar = ({ handleLogin }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // 여기에 로그아웃 로직을 작성하면 됩니다.
    // 예를 들어, 로컬 스토리지에서 로그인 상태를 제거하고, 로그인 페이지로 이동하는 등의 작업을 수행합니다.
    // 이 예시에서는 단순히 새로 고침을 통해 로그아웃 시뮬레이션합니다.
    handleLogin(false); // 로그아웃 콜백 호출하여 상태 변경
    navigate("/login");
    // window.location.reload(); // 실제 로그아웃 로직을 추가하십시오.
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
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
        {/* 로그아웃 버튼 */}
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Topbar;
