import {
  Box,
  Typography,
  IconButton,
  useTheme,
  Button,
  Divider,
} from "@mui/material";
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
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UpdateIcon from "@mui/icons-material/Update";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GppGoodIcon from "@mui/icons-material/GppGood";
import GppBadIcon from "@mui/icons-material/GppBad";
import { alignProperty } from "@mui/material/styles/cssUtils";

const ManageReport = () => {
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
      flex: 1,
    },
    {
      field: "imageURL",
      headerName: "Image URL",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "reason",
      headerName: "Reason",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    { field: "spacer", headerName: "", flex: 12 },
    {
      field: "actions_vanish",
      headerName: "Vanish",
      headerAlign: "center",
      align: "center",
      sortable: false,
      flex: 1,
      // align: "center",
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="bad"
            onClick={() => handleEdit(params.row.id)}
          >
            <GppBadIcon />
          </IconButton>
        </>
      ),
    },
    {
      field: "actions_remove",
      headerName: "Cancel Report",
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="good"
            onClick={() => handleEdit(params.row.id)}
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
    </Box>
  );
};

export default ManageReport;
