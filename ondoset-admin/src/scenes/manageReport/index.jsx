import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  useTheme,
  Button,
  Divider,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockReportedOOTDData } from "../../data/mockData";
import Header from "../../components/Header";
import UpdateIcon from "@mui/icons-material/Update";
import GppGoodIcon from "@mui/icons-material/GppGood";
import GppBadIcon from "@mui/icons-material/GppBad";
import axios from "axios";

const ManageReport = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null); // 선택된 행 정보를 저장하는 상태 변수
  const [ootdData, setOOTDData] = useState([]); // 표시되는 OOTD 정보들
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // 삭제 화면 상자 열림 여부 상태

  useEffect(() => {
    fetchOOTDData();
  }, []);

  const fetchOOTDData = () => {
    axios
      .get("/admin/report")
      .then((response) => {
        const data = response.data.result;
        const ootds = [];
        // console.log(data);
        data.forEach((item) => {
          ootds.push({
            ootdId: item.ootdId,
            reportedCount: item.reportedCount,
            imageURL: "http://ceprj.gachon.ac.kr:60019/images" + item.imageURL,
            reason: item.reason,
          });
        });
        console.log(ootds);
        setOOTDData(ootds);
      })
      .catch((error) => {
        console.error("Error fetching tag data:", error);
      });
  };

  // 행 선택 시 상태 업데이트
  const handleRowSelection = (row) => {
    setSelectedRow(row);
  };

  const handleUpdate = (row) => {
    handleRowSelection(row);
    // 업데이트 버튼 클릭 시 업데이트 대화 상자 열기
    setOpenUpdateDialog(true);
  };

  // 업데이트 작업 수행
  const handleUpdateConfirm = () => {
    // 선택된 행의 tagId 가져오기
    const reportId = selectedRow.ootdId;

    // 서버에 UPDATAE 요청 보내기
    axios
      .put(`/admin/report/${reportId}`)
      .then((response) => {
        console.log(response.data);
        // 삭제 성공 시
        if (response.data.code === "common_2000") {
          // 여기에서 성공 메시지 처리 혹은 다른 작업 수행 가능
          console.log("report vanished successfully");
          // 삭제 후 데이터 다시 페칭
          fetchOOTDData();
        }
      })
      .catch((error) => {
        console.error("Error deleting tag:", error);
      });

    // 업데이트 화면 상자 닫기
    handleUpdateDialogClose();
  };

  const handleUpdateDialogClose = () => {
    // 업데이트 대화 상자 닫기
    setOpenUpdateDialog(false);
    fetchOOTDData();
  };

  const handleDelete = (id) => {
    // 삭제 작업 수행
    console.log("Delete item with ID:", id);
    setSelectedRow(id);
    setOpenDeleteDialog(true);
  };

  // 삭제 작업 수행
  const handleDeleteConfirm = () => {
    // 선택된 행의 tagId 가져오기
    const ootdId = selectedRow.ootdId;

    // 서버에 DELETE 요청 보내기
    axios
      .put(`/admin/report/count/${ootdId}`)
      .then((response) => {
        console.log(response.data);
        // 삭제 성공 시
        if (response.data.code === "common_2000") {
          // 여기에서 성공 메시지 처리 혹은 다른 작업 수행 가능
          console.log("report cancelled successfully");
          // 삭제 후 데이터 다시 페칭
          fetchOOTDData();
        }
      })
      .catch((error) => {
        console.error("Error deleting tag:", error);
      });

    // 삭제 화면 상자 닫기
    handleDeleteDialogClose();
  };

  const handleDeleteDialogClose = () => {
    // 삭제 화면 상자 닫기
    setOpenDeleteDialog(false);
    fetchOOTDData();
  };

  const reportedOOTDColumns = [
    {
      field: "ootdId",
      headerName: "OOTD ID",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "reportedCount",
      headerName: "Reported Count",
      headerAlign: "center",
      align: "center",
      flex: 1.5,
    },
    {
      field: "imageURL",
      headerName: "Image URL",
      headerAlign: "center",
      align: "center",
      flex: 1.5,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          See Image
        </a>
      ),
    },
    {
      field: "reason",
      headerName: "Reason",
      headerAlign: "center",
      align: "center",
      flex: 6,
    },
    { field: "spacer", headerName: "", flex: 7 },
    {
      field: "actions_vanish",
      headerName: "Vanish",
      headerAlign: "center",
      align: "center",
      sortable: false,
      flex: 1.5,
      // align: "center",
      renderCell: (params) => (
        <>
          <IconButton aria-label="bad" onClick={() => handleUpdate(params.row)}>
            <GppBadIcon />
          </IconButton>
        </>
      ),
    },
    {
      field: "actions_remove",
      headerName: "Cancel Report",
      headerAlign: "center",
      align: "center",
      sortable: false,
      flex: 1.5,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="good"
            onClick={() => handleDelete(params.row)}
          >
            <GppGoodIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box>
      {/* Blacklist */}
      <Box
        m="20px"
        sx={{
          paddingTop: "1px",
          boxShadow: "0px 0px 6px rgba(0,0,0,0.2)",
          borderRadius: "5px",
        }}
      >
        {/* header */}
        <Box
          sx={{
            margin: "20px 20px 20px 20px",
          }}
        >
          <Header
            title="Reported OOTDs"
            subtitle="OOTDs reported with specific reasons"
          />
        </Box>
        {/* dataGrid */}
        <Box
          m="0 0 0 0"
          height="55vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[900],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[900],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid
            rows={ootdData}
            columns={reportedOOTDColumns}
            getRowId={(row) => row.ootdId}
            disableColumnFilter
          />
        </Box>
        <Box flex={1} p={0} />
        <Divider />
        {/* footer */}
        <Box display="flex" p={1} alignItems="center">
          <Button
            startIcon={
              <UpdateIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
            style={{
              color: colors.grey[100],
            }}
          >
            Update Status
          </Button>
        </Box>
      </Box>
      {/* 업데이트 화면 상자 */}
      <Dialog
        open={openUpdateDialog}
        onClose={handleUpdateDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <Typography variant="h6" color={colors.grey[100]}>
            Vanish Report
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to vanish this report?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleUpdateConfirm}
            sx={{ fontSize: "12px" }}
            style={{
              backgroundColor: colors.blueAccent[900],
              color: colors.grey[100],
            }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {/* 삭제 화면 상자 */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <Typography variant="h6" color={colors.grey[100]}>
            Cancel Report
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel this report?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            sx={{ fontSize: "12px" }}
            style={{
              backgroundColor: colors.blueAccent[900],
              color: colors.grey[100],
            }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageReport;
