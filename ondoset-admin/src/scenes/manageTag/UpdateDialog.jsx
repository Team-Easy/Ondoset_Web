import React from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";

const UpdateDialog = ({ open, onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleUpdate = () => {
    // 업데이트 작업 수행
    console.log("Update performed");
    // 여기에 업데이트 작업 수행 로직 추가
    // onClose(); // 업데이트 작업 완료 후 대화 상자 닫기
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h6" color={colors.blueAccent[900]}>
          Update Dialog
        </Typography>
      </DialogTitle>
      <DialogContent>
        {/* 업데이트 내용 입력 필드 */}
        <TextField
          autoFocus
          margin="dense"
          id="updateContent"
          label="Update Content"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateDialog;
