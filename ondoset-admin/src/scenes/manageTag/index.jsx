import { Box, Typography, IconButton, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices, tagData } from "../../data/mockData";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { alignProperty } from "@mui/material/styles/cssUtils";
import UpdateIcon from "@mui/icons-material/Update";

const ManageTag = () => {
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
    { field: "id", headerName: "ID" },
    { field: "category", headerName: "Major Category" },
    {
      field: "tag",
      headerName: "Tag Name",
      cellClassName: "name-column--cell",
    },
    {
      field: "tagId",
      headerName: "Tag ID",
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
    {
      field: "actions_delete",
      headerName: "Delete",
      sortable: false,
      align: "center",
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="Delete"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
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
          title="Detailed Tags"
          subtitle="Detailed tags included in major category"
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
        <DataGrid rows={tagData} columns={columns} disableColumnFilter />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="flex-end" p={1}>
        <Box display="flex" alignItems="center">
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

        <Box flex={1} />

        <Box
          display="flex"
          alignItems="center"
          onClick={() => handleAddRow()}
          style={{
            backgroundColor: colors.blueAccent[800],
            color: colors.grey[100],
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          <Button
            endIcon={<AddCircleIcon color={colors.blueAccent[600]} />}
            style={{
              color: colors.grey[100],
              fontWeight: "bold",
            }}
          >
            Add Tag
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ManageTag;
