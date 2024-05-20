import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import axios from "axios";

const AddTagDialog = ({ open, onClose, onAdd }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleTagChange = (event) => {
    setTag(event.target.value);
  };

  const handleAdd = async () => {
    const requestData = {
      category: category,
      tag: tag,
    };

    // POST 요청 보내기
    const response = await axios
      .post("/admin/tag", requestData)
      .then((response) => {
        onAdd(response.data);
        onClose();
      })
      .catch((error) => {
        console.error("Error adding tag:", error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h6" color={colors.grey[100]}>
          Add Tag
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
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
          <Grid item xs={12}>
            <TextField
              label="Tag Name"
              value={tag}
              onChange={handleTagChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleAdd}
          // sx={{ fontSize: "12px" }}
          style={{
            backgroundColor: colors.blueAccent[900],
            color: colors.grey[100],
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTagDialog;
