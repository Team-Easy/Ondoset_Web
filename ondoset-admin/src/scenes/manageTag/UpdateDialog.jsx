import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Grid,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import axios from "axios";

const UpdateDialog = ({ open, onClose, rowData, onUpdate }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [updatedTag, setUpdatedTag] = useState(rowData ? rowData.tag : "");
  const [updatedCategory, setUpdatedCategory] = useState(
    rowData ? rowData.category.toUpperCase() : ""
  );

  useEffect(() => {
    if (rowData) {
      setUpdatedTag(rowData.tag);
      setUpdatedCategory(rowData.category.toUpperCase());
    }
  }, [rowData]);

  const handleTagChange = (e) => {
    setUpdatedTag(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setUpdatedCategory(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const updatedData = {
        category: updatedCategory,
        tag: updatedTag,
      };

      // PUT 요청 보내기
      const response = await axios.put(
        `/admin/tag/${rowData.tagId}`,
        updatedData
      );

      // 업데이트 성공한 경우에만 onUpdate 콜백 호출
      if (response.data.code === "common_2000") {
        onUpdate(updatedData);
        console.log("put완료");
      }
    } catch (error) {
      console.error("Error updating tag:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h6" color={colors.grey[100]}>
          Update Tag
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ paddingTop: "10px" }}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={updatedCategory}
                onChange={handleCategoryChange}
                fullWidth
              >
                <MenuItem value="TOP">상의</MenuItem>
                <MenuItem value="BOTTOM">하의</MenuItem>
                <MenuItem value="OUTER">아우터</MenuItem>
                <MenuItem value="SHOE">신발</MenuItem>
                <MenuItem value="ACC">액세서리</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Tag Name"
              value={updatedTag}
              onChange={handleTagChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ fontSize: "12px" }}
          style={{
            backgroundColor: colors.blueAccent[900],
            color: colors.grey[100],
          }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateDialog;
