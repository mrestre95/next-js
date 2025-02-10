import { GridColDef } from "@mui/x-data-grid";

export const searchCarsTableDefinition: GridColDef[] = [
  { field: "id", headerName: "ID", width: 80 },
  {
    field: "title",
    headerName: "Title",
    width: 250,
    editable: false,
  },
  {
    field: "brand",
    headerName: "Brand",
    width: 150,
    editable: false,
  },
  {
    field: "model",
    headerName: "Model",
    width: 110,
    editable: false,
  },
  {
    field: "year",
    headerName: "Year",
    type: "number",
    width: 110,
    editable: false,
  },
  {
    field: "currency",
    headerName: "Currency",
    width: 80,
    editable: false,
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 80,
  },
  {
    field: "kilometers",
    headerName: "Km",
    type: "number",
    width: 100,
  },
];

export const searchCarsTablePaginationModel = { page: 0, pageSize: 50 };
