import React from 'react';
import { Grid, Paper } from '@mui/material';
import CountriesTable from './components/CountriesTable';
export default function App() {

  

  return (
    <Paper>
      <Grid
        container
        spacing={0}
        alignItems="center"
        justifyContent="center"
      >
        <h1>
          React Data Table
        </h1>
      </Grid>
      <CountriesTable />
    </Paper>
  );
}
