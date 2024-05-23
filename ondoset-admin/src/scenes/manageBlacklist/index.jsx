import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  Button,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import UpdateIcon from "@mui/icons-material/Update";
import OOTDCard from "./ootdDialog";
import axios from "axios";

const ManageBlacklist = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [blacklistData, setBlacklistData] = useState([]); // 표시되는 이용 제한자 정보들
  const [offenderListData, setOffenderListData] = useState([]); // 표시되는 피신고자 정보들
  const [reporterListData, setReporterListData] = useState([]); // 표시되는 신고자 정보들
  const [selectedRow, setSelectedRow] = useState(null); // 선택된 행 정보를 저장하는 상태 변수
  const [blockTime, setBlockTime] = useState(null); // 정지 기간 정보를 저장하는 상태 변수
  const [openChangeBlockTime, setOpenChangeBlockTime] = useState(false); // 정지 기간 화면 상자 열림 여부 상태
  const [openSeeOOTDs, setOpenSeeOOTDs] = useState(false); // OOTD 게시물 화면 상자 열림 여부 상태
  const [isOffender, setIsOffender] = useState(false);

  useEffect(() => {
    fetchBlacklistData();
    fetchOffenderListData();
    fetchReporterListData();
  }, []);

  const fetchBlacklistData = () => {
    axios
      .get("/admin/blacklist")
      .then((response) => {
        const data = response.data.result;
        const blacklist = data;
        setBlacklistData(blacklist);
      })
      .catch((error) => {
        console.error("Error fetching tag data:", error);
      });
  };

  const fetchOffenderListData = () => {
    axios
      .get("/admin/blacklist/reported")
      .then((response) => {
        const data = response.data.result;
        const offenderList = data;
        console.log(data);
        setOffenderListData(offenderList);
      })
      .catch((error) => {
        console.error("Error fetching tag data:", error);
      });
  };

  const fetchReporterListData = () => {
    axios
      .get("/admin/blacklist/reporter")
      .then((response) => {
        const data = response.data.result;
        const reporterList = data;
        console.log(data);
        setReporterListData(reporterList);
      })
      .catch((error) => {
        console.error("Error fetching tag data:", error);
      });
  };

  const handleChangeBlockTime = (id) => {
    setSelectedRow(id);
    setOpenChangeBlockTime(true);
  };

  // 정지 기간 업데이트 작업 수행
  const handleChangeBlockTimeConfirm = () => {
    // 선택된 행의 Id 가져오기
    const id = selectedRow.memberId;

    const requestData = {
      banPeriod: blockTime,
    };

    // 서버에 UPDATE 요청 보내기
    axios
      .put(`/admin/blacklist/${id}`, requestData)
      .then((response) => {
        console.log(response.data);
        // 삭제 성공 시
        if (response.data.code === "common_2000") {
          console.log("blacklist blockTime changed");
          fetchBlacklistData();
        }
      })
      .catch((error) => {
        console.error("Error deleting tag:", error);
      });

    setOpenChangeBlockTime(false);
  };

  const handleChangeBlockTimeDialogClose = () => {
    // 삭제 화면 상자 닫기
    setOpenChangeBlockTime(false);
    fetchBlacklistData();
  };

  const handleBlockTimeChange = (event) => {
    setBlockTime(event.target.value);
  };

  // OOTD 화면에 보여주기 위해 선택
  const handleSeeOOTD = (id, isOffender) => {
    console.log(id);
    setSelectedRow(id);
    setIsOffender(isOffender);
    setOpenSeeOOTDs(true);
  };

  const blacklistColumns = [
    {
      field: "memberId",
      headerName: "Member ID",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      cellClassName: "name-column--cell",
      field: "nickname",
      headerName: "Nickname",
      headerAlign: "center",
      align: "center",
      flex: 2,
    },
    {
      field: "banPeriod",
      headerName: "Ban Period",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    { field: "spacer", headerName: "", flex: 12 },
    {
      field: "actions_update",
      headerName: "Update",
      headerAlign: "center",
      align: "center",
      sortable: false,
      flex: 1,
      // align: "center",
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="Edit"
            onClick={() => handleChangeBlockTime(params.row)}
          >
            <EditIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const offenderListColumns = [
    {
      field: "memberId",
      headerName: "Member ID",
      headerAlign: "center",
      align: "center",
      flex: 1.5,
    },
    {
      cellClassName: "name-column--cell",
      field: "nickname",
      headerName: "Nickname",
      headerAlign: "center",
      align: "center",
      flex: 2,
    },
    {
      field: "reportedCount",
      headerName: "Reported Count",
      headerAlign: "center",
      align: "center",
      flex: 2,
    },
    { field: "spacer", headerName: "", flex: 12 },
    {
      field: "actions_show_content",
      headerName: "Check Content",
      sortable: false,
      headerAlign: "center",
      align: "center",
      flex: 2,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="Preview"
            onClick={() => handleSeeOOTD(params.row, true)}
          >
            <PreviewIcon />
          </IconButton>
        </>
      ),
    },
    {
      field: "actions_update",
      headerName: "Update",
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="Edit"
            onClick={() => handleChangeBlockTime(params.row)}
          >
            <EditIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const reporterListColumns = [
    {
      field: "memberId",
      headerName: "Member ID",
      headerAlign: "center",
      align: "center",
      flex: 1.5,
    },
    {
      cellClassName: "name-column--cell",
      field: "nickname",
      headerName: "Nickname",
      headerAlign: "center",
      align: "center",
      flex: 2,
    },
    {
      field: "reportedCount",
      headerName: "Reported Count",
      headerAlign: "center",
      align: "center",
      flex: 2,
    },
    { field: "spacer", headerName: "", flex: 12 },
    {
      field: "actions_show_content",
      headerName: "Check Content",
      sortable: false,
      headerAlign: "center",
      align: "center",
      flex: 2,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="Preview"
            onClick={() => handleSeeOOTD(params.row, false)}
          >
            <PreviewIcon />
          </IconButton>
        </>
      ),
    },
    {
      field: "actions_update",
      headerName: "Update",
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="Edit"
            onClick={() => handleChangeBlockTime(params.row)}
          >
            <EditIcon />
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
            title="Blacklist"
            subtitle="List of users banned due to specific reasons"
          />
        </Box>
        {/* dataGrid */}
        <Box
          m="0 0 0 0"
          height="45vh"
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
            rows={blacklistData}
            columns={blacklistColumns}
            getRowId={(row) => row.memberId}
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
            onClick={fetchBlacklistData}
          >
            Update Status
          </Button>
        </Box>
      </Box>

      {/* Offenders */}
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
            title="Offender List"
            subtitle="List of users reported due to specific reasons"
          />
        </Box>
        {/* dataGrid */}
        <Box
          m="0 0 0 0"
          height="45vh"
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
            rows={offenderListData}
            columns={offenderListColumns}
            getRowId={(row) => row.memberId}
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
            onClick={fetchOffenderListData}
          >
            Update Status
          </Button>
        </Box>
      </Box>
      {/* Reporter */}
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
            title="Reporter List"
            subtitle="List of users reporting OOTDs"
          />
        </Box>
        {/* dataGrid */}
        <Box
          m="0 0 0 0"
          height="45vh"
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
            rows={reporterListData}
            columns={reporterListColumns}
            getRowId={(row) => row.memberId}
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
            onClick={fetchReporterListData}
          >
            Update Status
          </Button>
        </Box>
      </Box>
      {/* OOTD 보여주기 화면 다이얼로그 */}
      <Dialog
        open={openSeeOOTDs}
        onClose={() => setOpenSeeOOTDs(false)}
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" color={colors.grey[100]}>
            OOTD Details
          </Typography>
        </DialogTitle>
        <DialogContent>
          {selectedRow && (
            <OOTDCard memberId={selectedRow.memberId} isOffender={isOffender} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSeeOOTDs(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      {/*  정지 기간 변경 */}
      <Dialog
        open={openChangeBlockTime}
        onClose={handleChangeBlockTimeDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <Typography variant="h6" color={colors.grey[100]}>
            Change Block Time
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ paddingBottom: "10px" }}
          >
            Are you sure you want to change block time?
          </DialogContentText>
          <TextField
            label="Block Time"
            value={blockTime}
            onChange={handleBlockTimeChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleChangeBlockTimeDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleChangeBlockTimeConfirm}
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

export default ManageBlacklist;
