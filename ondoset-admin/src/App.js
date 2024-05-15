import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import ServerStatus from "./scenes/serverStatus";
import ManageTag from "./scenes/manageTag";
// import Contacts from "./scenes/contacts";
import ManageBlacklist from "./scenes/manageBlacklist";
import ManageReport from "./scenes/manageReport";
import axios from "axios";
import LoginPage from "./scenes/login";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(process.env.REACT_APP_LOGIN_STATE === 'true'); // 로그인 상태를 추적하는 상태 변수

  // 로그인 처리 함수
  const handleLogin = (isLogin) => {
    // 로그인 처리 로직을 작성한 후, 로그인 성공 시 setIsLoggedIn(true) 호출
    setIsLoggedIn(isLogin);
  };

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    try {
      // await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/logout`, {
      await axios.get(`/admin/auth/logout`, { withCredentials: true });
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isLoggedIn ? ( // 로그인 되어있는지 확인 후, 조건에 따라 렌더링
            <>
              <Sidebar isSidebar={isSidebar} />
              <main className="content">
                <Topbar handleLogin={handleLogin} handleLogout={handleLogout} />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/server-status" element={<ServerStatus />} />
                  {/* <Route path="/manage-ai-model" element={<Contacts />} /> */}
                  <Route path="/manage-tags" element={<ManageTag />} />
                  <Route
                    path="/manage-blacklist"
                    element={<ManageBlacklist />}
                  />
                  <Route path="/manage-reports" element={<ManageReport />} />
                </Routes>
              </main>
            </>
          ) : (
            <LoginPage onLogin={handleLogin} /> // 로그인 페이지 렌더링
          )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
