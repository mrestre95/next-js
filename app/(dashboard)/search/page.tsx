"use client"; // Indica que este componente debe ser ejecutado en el cliente

import React, { ChangeEvent, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { searchCar } from "@/app/api/services/apiProducts";
import { DataGrid } from "@mui/x-data-grid";
import {
  searchCarsTableDefinition,
  searchCarsTablePaginationModel,
} from "@/app/utils/tableDefinitions";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const paginationModel = searchCarsTablePaginationModel;

export default function SearchPage() {
  const [data, setData] = useState([]);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const [queryInput, setQueryInput] = useState<string>("");
  const [tableRowsState, setTableRowsState] = useState([]);

  const handleQueryInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQueryInput(event.target.value);
  };

  const handleClick = async () => {
    setLoadingState(true);

    try {
      const response = await searchCar(queryInput);
      console.log("response", response);
      if (response) {
        setData(response);
        populateTableRows(response);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    } finally {
      setLoadingState(false);
    }
  };

  const populateTableRows = (data: any) => {
    const populatedRows = data.map(
      (item: {
        id: string;
        title: string;
        currency_id: string;
        price: number;
        attributes: Attribute[];
      }) => ({
        id: item.id,
        fieldId: item.id,
        title: item.title,
        brand: item.attributes.find((item) => item.id === "BRAND")?.value_name,
        model: item.attributes.find((item) => item.id === "MODEL")?.value_name,
        year: Number(
          item.attributes.find((item) => item.id === "VEHICLE_YEAR")?.value_name
        ),
        currency: item.currency_id,
        price: item.price,
        kilometers: item.attributes.find((item) => item.id === "KILOMETERS")
          ?.value_struct.number,
      })
    );
    setTableRowsState(populatedRows);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography marginBlock={2}>Ingrese los datos del vehiculo</Typography>
      <Grid container spacing={3}>
        <Grid size={12}>
          <TextField
            fullWidth
            id="query-id"
            label="Search vehicles..."
            variant="outlined"
            onChange={handleQueryInputChange}
          />
        </Grid>
      </Grid>
      <Box sx={{ flexGrow: 1, marginBlock: 3 }}>
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={handleClick}
          loading={loadingState}
          disabled={!queryInput}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ flexGrow: 1, marginBlock: 2 }}>
        <Typography marginBlock={3}>Vehiculos</Typography>
        <DataGrid
          rows={tableRowsState}
          columns={searchCarsTableDefinition}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Box>
    </Box>
  );
}

type AttributeValue = {
  id: string;
  name: string;
  source: number;
  struct: any | null; // Puedes especificar un tipo más detallado si conoces la estructura de 'struct'
};

type Attribute = {
  attribute_group_id: string;
  attribute_group_name: string;
  id: string;
  name: string;
  source: number;
  value_id: string;
  value_name: string;
  value_struct: any | null; // Puedes especificar un tipo más detallado si conoces la estructura de 'value_struct'
  value_type: string;
  values: AttributeValue[];
};

type Item = {
  attributes: Attribute[];
  // Otros campos que pueda tener el objeto 'Item'
};
