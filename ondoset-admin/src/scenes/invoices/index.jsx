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
import { mockBlacklistData } from "../../data/mockData";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UpdateIcon from "@mui/icons-material/Update";
import { alignProperty } from "@mui/material/styles/cssUtils";

const Invoices = () => {
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
  const columns = [
    { field: "memberId", headerName: "Member ID", align: "center" },
    { field: "nickname", headerName: "Nickname" },
    {
      field: "banPeriod",
      headerName: "Ban Period",
      align: "center",
    },
    // {
    //   field: "spacer",
    //   headerName: "",
    //   width: 100,
    //   sortable: false,
    //   renderCell: () => <div style={{ width: "100%", height: "100%" }}></div>,
    // },
    {
      field: "actions_update",
      headerName: "Update",
      sortable: false,
      align: "center",
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
    <Box
      m="20px"
      sx={{
        paddingTop: "1px",
        boxShadow: "0px 0px 6px rgba(0,0,0,0.2)",
        borderRadius: "5px",
      }}
    >
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
          columns={columns}
          getRowId={(row) => row.memberId}
          disableColumnFilter
        />
      </Box>
      <Box flex={1} p={0} />
      <Divider />

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
  );
};

export default Invoices;
