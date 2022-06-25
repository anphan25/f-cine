// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Stack,
//   Button,
//   FormControl,
//   Autocomplete,
//   TextField,
//   FormLabel,
//   Card,
//   Tabs,
//   Tab,
//   Divider,
// } from "@mui/material";
// import { SearchBar } from "../../components/header/SearchBar";
// import { GridActionsCellItem } from "@mui/x-data-grid";
// import { DataTable, CustomSnackBar } from "../../components/index";
// import { getUserList } from "../../services/UserService";
// import { getCompanyListWithoutManger } from "../../services/CompanyService";
// import ModeEditIcon from "@mui/icons-material/ModeEdit";
// import BlockIcon from "@mui/icons-material/Block";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import Slide from "@mui/material/Slide";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
// import GroupAddIcon from "@mui/icons-material/GroupAdd";
// import { updateRole } from "../../services/RoleService";
// import HeaderBreadcrumbs from "components/header/HeaderBreadcrumbs";
// import { blockManager } from "../../services/CompanyService";
// import useTabs from "hooks/useTabs";

// const CustomerList = () => {
//   const [pageState, setPageState] = useState({
//     isLoading: false,
//     data: [],
//     total: 0,
//     search: "",
//     page: 1,
//     pageSize: 10,
//   });

//   const gridOptions = {
//     columns: [
//       {
//         headerName: "ID",
//         field: "id",
//         width: 30,
//       },
//       {
//         headerName: "Avatar",
//         field: "avatar",
//         width: 70,
//         sortable: false,
//         filterable: false,
//         renderCell: (cellValue) => {
//           return (
//             <div>
//               <img
//                 className="avatar-cell"
//                 src={cellValue.value}
//                 style={{
//                   width: "45px",
//                   height: "45px",
//                   borderRadius: "50%",
//                   objectFit: "cover",
//                 }}
//                 alt=""
//               ></img>
//             </div>
//           );
//         },
//       },
//       {
//         headerName: "Full Name",
//         field: "fullName",
//         width: 280,
//         renderCell: (nameValue) => {
//           return (
//             <div
//               style={{
//                 fontWeight: "500",
//               }}
//             >
//               {nameValue.value}
//             </div>
//           );
//         },
//       },
//       {
//         headerName: "Email",
//         field: "email",
//         width: 250,
//       },
//       {
//         headerName: "Company",
//         field: "company",
//         width: 150,
//         valueGetter: ({ value }) => value || "-",
//       },

//       {
//         headerName: "Status",
//         field: "status",
//         type: "string",
//         width: 120,
//         renderCell: (status) => {
//           return (
//             <Box
//               sx={{
//                 color: `${statusStyle(status.value)}`,
//               }}
//             >
//               {status.value === "Active" ? (
//                 <CheckCircleOutlineIcon />
//               ) : (
//                 <BlockIcon />
//               )}
//             </Box>
//           );
//         },
//       },
//       {
//         headerName: "Role",
//         field: "role",
//         type: "string",
//         width: 120,
//         renderCell: (roleValue) => {
//           return (
//             <div
//               style={{
//                 padding: "4px 8px",
//                 fontSize: "12px",
//                 fontWeight: "600",
//                 color: roleTextStyle(roleValue.value),
//                 borderRadius: "10px",
//                 backgroundColor: roleBackGroundStyle(roleValue.value),
//               }}
//             >
//               {roleValue.value}
//             </div>
//           );
//         },
//       },

//       {
//         field: "actions",
//         type: "actions",
//         width: 80,
//         sortable: false,
//         filterable: false,
//         getActions: (params) => [
//           <GridActionsCellItem
//             disabled={params.row.role === "Customer" ? false : true}
//             icon={<ModeEditIcon sx={{ color: "#623CE7" }} />}
//             onClick={() => {
//               openEditDialog(params.row);
//             }}
//             label="Set to Manager"
//             showInMenu
//           />,

//           <GridActionsCellItem
//             disabled={params.row.role === "Manager" ? false : true}
//             icon={
//               params.row.status === "Active" ? (
//                 <GroupRemoveIcon sx={{ color: "#FF4842" }} />
//               ) : (
//                 <GroupAddIcon sx={{ color: "#54D62C" }} />
//               )
//             }
//             label={
//               params.row.status === "Active"
//                 ? "Block account"
//                 : "Unblock account"
//             }
//             onClick={() => {
//               openConfirmBlockDialog(params.row);
//             }}
//             showInMenu
//           />,
//         ],
//       },
//     ],
//     pageState: pageState,
//   };

//   const fetchData = async () => {
//     setPageState((old) => ({ ...old, isLoading: true, data: [] }));

//     const res = await getUserList({
//       PageSize: pageState.pageSize,
//       Page: pageState.page,
//       Email: pageState.search,
//     });

//     const dataRow = res.users.results.map((data) => ({
//       id: data.id,
//       fullName: data.fullName,
//       email: data.email,
//       avatar: data.pictureUrl,
//       companyId: data.companyId,
//       company: data.company?.name,
//       role: data.role.name,
//       status: data.statusName,
//     }));

//     setPageState((old) => ({
//       ...old,
//       isLoading: false,
//       data: dataRow,
//       total: res.users.maxPage,
//     }));
//   };

//   const pageChangeHandler = (newPage) => {
//     setPageState((old) => ({ ...old, page: newPage + 1 }));
//   };

//   const pageSizeChangeHandler = (newPageSize) => {
//     setPageState((old) => ({ ...old, pageSize: newPageSize }));
//   };

//   const searchHandler = (searchValue) => {
//     setPageState((old) => ({
//       ...old,
//       search: searchValue.searchTerm,
//       page: 1,
//     }));
//   };
//   return <div>CustomerList</div>;
// };

// export default CustomerList;
