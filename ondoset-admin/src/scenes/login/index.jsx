import React, { useState } from "react";
import { tokens } from "../../theme";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Link,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    // 로그인이 성공하면 onLogin 함수를 호출하여 App 컴포넌트의 isLoggedIn 상태를 true로 변경합니다.
    try {
      setLoading(false);
      onLogin(true);
      navigate("/"); // 로그인 후에는 홈페이지로 이동합니다.
    } catch (error) {
      setLoading(false);
      setError("Invalid username or password"); // 로그인 실패 시 에러 메시지 표시
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh" // 화면 전체 높이만큼 설정
      width="100%"
    >
      <Box
        width={800}
        height={500}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        border="1px solid #ccc"
        borderRadius={8}
        padding={4}
        sx={{
          backgroundColor: colors.blueAccent[900],
        }}
      >
        <Box flex="1">
          <img
            src="https://via.placeholder.com/300"
            alt="LoginImage"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          //   height="100vh"
        >
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          {error && (
            <Typography variant="body2" color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            disabled={loading}
            style={{ marginTop: 16 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
          <Typography variant="body2" style={{ marginTop: 16 }}>
            Don't have an account? <Link href="#">Sign up</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
