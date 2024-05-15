import React, { useState, useEffect } from "react";
import { Box, IconButton, useTheme, Button, Dialog } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UpdateIcon from "@mui/icons-material/Update";
import AddTagDialog from "./addTagDialog.jsx";
import UpdateDialog from "./updateDialog.jsx";
import axios from "axios";

const ManageTag = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false); // 추가 다이얼로그 상태
  const [selectedRow, setSelectedRow] = useState(null); // 선택된 행 정보를 저장하는 상태 변수
  const [tagData, setTagData] = useState([]);

  useEffect(() => {
    fetchTagData();
  }, []);

  const fetchTagData = () => {
    axios
      .get("/admin/tag")
      .then((response) => {
        const data = response.data.result;
        const tags = [];
        for (const category in data) {
          data[category].forEach((tagItem) => {
            tags.push({
              id: tagItem.tagId,
              category: category,
              tag: tagItem.tag,
              tagId: tagItem.tagId,
            });
          });
        }
        setTagData(tags);
      })
      .catch((error) => {
        console.error("Error fetching tag data:", error);
      });
  };

  // 행 선택 시 상태 업데이트
  const handleRowSelection = (row) => {
    setSelectedRow(row);
  };

  const handleDelete = (id) => {
    // 삭제 작업 수행
    console.log("Delete item with ID:", id);
  };

  // ADD

  const handleAddRow = () => {
    // 새로운 항목 추가
    setOpenAddDialog(true);
  };

  const handleAdd = (addedData) => {
    // 데이터에 추가된 항목 추가
    fetchTagData();
  };

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
    // 데이터 다시 페칭
    fetchTagData();
  };

  // UPDATE
  const handleUpdateClick = (row) => {
    handleRowSelection(row);
    // 업데이트 버튼 클릭 시 업데이트 대화 상자 열기
    setOpenUpdateDialog(true);
  };

  const handleUpdate = (updatedData) => {
    // 업데이트 작업 수행
    console.log("Update performed with data:", updatedData);
    // 여기에 업데이트 작업 수행 로직 추가
    handleUpdateDialogClose(); // 업데이트 작업 완료 후 대화 상자 닫기
  };

  const handleUpdateDialogClose = () => {
    // 업데이트 대화 상자 닫기
    setOpenUpdateDialog(false);
    fetchTagData();
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Major Category",
      headerAlign: "center",
      align: "center",
      flex: 1.5,
    },
    {
      field: "tag",
      headerName: "Tag Name",
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
      flex: 1.5,
    },
    {
      field: "tagId",
      headerName: "Tag ID",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    { field: "spacer", headerName: "", flex: 12 },
    {
      field: "actions_update",
      headerName: "Update",
      sortable: false,
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="Edit"
            onClick={() => handleUpdateClick(params.row)}
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
      headerAlign: "center",
      align: "center",
      flex: 1,
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
      <AddTagDialog
        open={openAddDialog}
        onClose={handleAddDialogClose}
        onAdd={handleAdd}
      />
      <UpdateDialog
        open={openUpdateDialog}
        onClose={handleUpdateDialogClose}
        rowData={selectedRow}
        onUpdate={handleUpdate}
      />
    </Box>
  );
};

export default ManageTag;
