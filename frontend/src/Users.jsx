import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { DataGrid } from '@mui/x-data-grid';
import { userService } from './api/users';
import { format } from 'date-fns';
import CellButtons from './CellButtons';

const columns = [
  { field: 'id', headerName: 'ID', headerClassName: 'table-header', flex : 1, maxWidth: 100 },
  { field: 'first_name', headerName: 'First name', headerClassName: 'table-header', flex : 1, },
  { field: 'last_name', headerName: 'Last name', headerClassName: 'table-header', flex : 1, },
  { field: 'email', headerName: 'Email', headerClassName: 'table-header', flex : 1, },
  { field: 'site', headerName: 'Site', headerClassName: 'table-header', flex : 1, },
  { field: 'age', headerName: 'Age', headerClassName: 'table-header', flex : 1,  },
  {
    field: 'created_at', headerName: 'Created at', headerClassName: 'table-header',
    valueFormatter: (params) => {
      return format(params, 'yyyy-MM-dd HH:mm');
    }, flex : 1
  },
  { field: 'buttons', headerName: '', headerClassName: 'table-header', flex: 1,
   renderCell: (params) => ( <CellButtons id={params.id}/> ) 
  }
];

export default function Users() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const users = await userService.getUsers();
        const formattedRows = users.map(user => ({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          site: user.site,
          created_at: user.created_at,
        }));
        setRows(formattedRows);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='ml-2 mr-2'>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Card variant='outlined'>
            <CardHeader title="My Bold Title"
              subheader="This is a subheader"
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
