import React, { useState, useEffect } from "react";
import { tokens } from "../../theme";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginImage from "../../assets/ondoset_login_image.png";
import introImg from "../../assets/introduce.png";

const LoginPage = ({ onLogin }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // 페이지가 로드될 때 세션의 존재 여부를 확인합니다.
    const isLoggedIn = document.cookie
      .split(";")
      .some((cookie) => cookie.trim().startsWith("JSESSIONID"));

    // 세션의 존재 여부에 따라 로그인 상태를 변경합니다.
    if (isLoggedIn) {
      onLogin(true);
    }
  }, [onLogin]);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    // 로그인이 성공하면 onLogin 함수를 호출하여 App 컴포넌트의 isLoggedIn 상태를 true로 변경합니다.
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      console.log(username, password);

      // Axios를 사용하여 서버로 로그인 요청을 보냅니다.
      // const response = await axios.post(
      //   `${process.env.REACT_APP_BASE_URL}/auth/login`,
      //   formData,
      //   {
      const response = await axios.post(`/admin/auth/login`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // credentials 옵션 설정
      });

      // 로그인이 성공하면 서버로부터 받은 응답을 처리합니다.
      if (response.data.code === "common_2000") {
        setLoading(false);
        onLogin(true);
        navigate("/"); // 로그인 후에는 홈페이지로 이동합니다.
      } else {
        setLoading(false);
        setError("Invalid username or password");
      }
    } catch (error) {
      setLoading(false);
      setError("Something went wrong"); // 서버 통신 에러 처리
      console.log(error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh" // 화면 전체 높이만큼 설정
      width="100%"
      sx={{ overflow: "auto" }} // 스크롤 기능 추가
    >
      <Box
        width="130vh"
        height="90vh"
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
        border="1px solid #ccc"
        borderRadius={8}
        padding={4}
        sx={{
          backgroundColor: colors.blueAccent[900],
          boxShadow: "0px 0px 6px rgba(0,0,0,0.2)",
          borderRadius: "5px",
          overflow: "auto",
        }}
      >
        <Box width="100%" display="flex" justifyContent="center" m={2}>
          <img
            // MARK: 해당 이미지가 600x2000 사이즈의 소개 이미지로 변경될 예정
            src={introImg}
            alt="introImg"
            // style={{ maxWidth: "100%", height: "auto" }}
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          //   height="100vh"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
            // mb={2} // 이미지와 텍스트 사이의 간격 조절
          >
            <img
              src={LoginImage}
              alt="LoginImage"
              style={{ maxWidth: "50%", height: "auto" }}
            />
          </Box>
          {/* <Typography
            variant="h3"
            gutterBottom
            color={colors.blueAccent[100]}
            align="left" // 좌측 정렬 추가
            sx={{ alignSelf: "flex-start" }} // 추가 스타일
            paddingLeft={2}
          >
            Login
          </Typography> */}
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: colors.blueAccent[100], // 선택된 상태에서의 테두리 색상
                },
              "& .MuiInputLabel-outlined.Mui-focused": {
                color: colors.blueAccent[200], // 선택된 상태에서의 라벨 색상
              },
              backgroundColor:
                theme.palette.mode === "light" ? "whitesmoke" : "",
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: colors.blueAccent[100], // 선택된 상태에서의 테두리 색상
                },
              "& .MuiInputLabel-outlined.Mui-focused": {
                color: colors.blueAccent[200], // 선택된 상태에서의 라벨 색상
              },
              backgroundColor:
                theme.palette.mode === "light" ? "whitesmoke" : "",
            }}
          />
          {error && (
            <Typography variant="body2" color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <Button
            variant="contained"
            color="inherit"
            onClick={handleLogin}
            disabled={loading}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[900],
            }}
            // style={{ marginTop: 16 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
