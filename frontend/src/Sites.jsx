import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import CellButtons from './CellButtons';
import { siteService } from './api/sites';

import { DataGrid } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';

const columns = [
  { field: 'id', headerName: 'ID', headerClassName: 'table-header', flex: 1, maxWidth: 100 },
  { field: 'title', headerName: 'Title', headerClassName: 'table-header', flex: 1, },
  { field: 'client', headerName: 'Client', headerClassName: 'table-header', flex: 1, },
  { field: 'location', headerName: 'Location', headerClassName: 'table-header', flex: 1, },
  { field: 'start_date', headerName: 'Start Date', headerClassName: 'table-header', flex: 1, },
  { field: 'end_date', headerName: 'End Date', headerClassName: 'table-header', flex: 1, },
  { field: 'status', headerName: 'Status', headerClassName: 'table-header', flex: 1, },
  { field: 'director', headerName: 'Director', headerClassName: 'table-header', flex: 1, },
  {
    field: 'buttons', headerName: '', headerClassName: 'table-header', flex: 1,
    renderCell: (params) => (<CellButtons id={params.id} />)
  }
];

export default function Users() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        setLoading(true);
        const sites = await siteService.getSites();
        const formattedRows = sites.map(site => ({
          id: site.id,
          title: site.title,
          client: site.client,
          location: site.location,
          start_date: site.start_date,
          end_date: site.end_date,
          status: site.status,
          director: site.director,
        }));
        setRows(formattedRows);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSites();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='ml-2 mr-2'>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Card variant='outlined'>
            <CardHeader title="Construction Site"
              subheader="Filter options are available for each column"
              titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
              subheaderTypographyProps={{ variant: 'subtitle1', fontWeight: 'bold' }}
            />
            <CardContent>
              <div>
                <DataGrid
                  sx={{
                    '& .MuiDataGrid-columnHeaderTitle': {
                      fontWeight: 'bold',
                    },
                  }}
                  rows={rows}
                  columns={columns}
                  disableRowSelectionOnClick
                />
              </div>
            </CardContent>
            <CardActions>
              <Button size="small">Card Action Button</Button>
            </CardActions>
          </Card>
        </Grid>

      </Grid>
    </div>
  );
}
