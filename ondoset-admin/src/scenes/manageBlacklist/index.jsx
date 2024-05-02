import { Box, IconButton, useTheme, Button, Divider } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import {
  mockBlacklistData,
  mockOffenderListData,
  mockReporterListData,
} from "../../data/mockData";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import UpdateIcon from "@mui/icons-material/Update";

const ManageBlacklist = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleAddRow = () => {
    // 새로운 항목 추가
    console.log("Create item");
  };

  const handleEdit = (id) => {
    // 수정 작업 수행
    console.log("Edit item with ID:", id);
  };

  const handleDelete = (id) => {
    // 삭제 작업 수행
    console.log("Delete item with ID:", id);
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
            onClick={() => handleEdit(params.row.id)}
          >
            <EditIcon />
          </IconButton>
        </>
      ),
    },
  ];
  const reportListColumns = [
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
            onClick={() => handleEdit(params.row.id)}
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
            onClick={() => handleEdit(params.row.id)}
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
          height="65vh"
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
            rows={mockBlacklistData}
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
          height="65vh"
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
            rows={mockOffenderListData}
            columns={reportListColumns}
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
          height="65vh"
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
            rows={mockReporterListData}
            columns={reportListColumns}
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
          >
            Update Status
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ManageBlacklist;
