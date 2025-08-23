import { useState, useEffect } from 'react';
import { siteService } from './api/sites';
import CellButtons from './Components/CellButtons';
import SiteModal from './Modals/SiteModal';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import { DataGrid } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { Add } from '@mui/icons-material';
import { userService } from './api/users';

export default function Sites() {

  const columns = [
    { field: 'id', headerName: 'ID', headerClassName: 'table-header', flex: 1, maxWidth: 100 },
    { field: 'title', headerName: 'Title', headerClassName: 'table-header', flex: 1, },
    { field: 'client', headerName: 'Client', headerClassName: 'table-header', flex: 1, },
    { field: 'location', headerName: 'Location', headerClassName: 'table-header', flex: 1, },
    //{ field: 'start_date', headerName: 'Start Date', headerClassName: 'table-header', flex: 1, },
    {
      field: 'start_date', headerName: 'Start Date', headerClassName: 'table-header',
      valueFormatter: (params) => {
        return format(params, 'yyyy-MM-dd');
      }, flex: 1
    },
    //{ field: 'end_date', headerName: 'End Date', headerClassName: 'table-header', flex: 1, },
    {
      field: 'end_date', headerName: 'End Date', headerClassName: 'table-header',
      valueFormatter: (params) => {
        if (params) {
          return format(params, 'yyyy-MM-dd');
        } else {
          return 'Ongoing';
        }
      }, flex: 1
    },
    { field: 'status', headerName: 'Status', headerClassName: 'table-header', flex: 1, },
    {
      field: 'director', headerName: 'Director', headerClassName: 'table-header', flex: 1,
      renderCell: (params) => {
        let directorName = 'Loading...';
        if (!loading && directors.find(user => user.id === params.value)) {
          directorName = `${directors.find(user => user.id === params.value).first_name} ${directors.find(user => user.id === params.value).last_name}`;
        }
        return <Link style={{ color: 'blue' }} to={`/users/${params.value}`}>{directorName}</Link>;
      }
    },
    {
      field: 'buttons', headerName: '', headerClassName: 'table-header', flex: 1,
      renderCell: (params) => (<CellButtons type='site' id={params.id} />)
    }
  ];

  //Site Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //API states
  const [rows, setRows] = useState([]);
  const [directors, setDirectors] = useState([]);
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

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const users = await userService.getUsers();
        setDirectors(users);
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

            <CardHeader title="Construction Sites"
              subheader="Filter options are available for each column"
              titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
              subheaderTypographyProps={{ variant: 'subtitle1', fontWeight: 'bold' }}
            />

            <CardActions sx={{ ml: 1 }}>
              <Button variant="contained" onClick={handleOpen} startIcon={<Add />}>
                Add New Site
              </Button>
              <SiteModal open={open} handleClose={handleClose} newSite={true} />
            </CardActions>
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
          </Card>
        </Grid>

      </Grid>
    </div>
  );
}
