import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import CellButtons from './Components/CellButtons';
import { userService } from './api/users';
import { siteService } from './api/sites';
import { Link } from 'react-router-dom';

import { DataGrid } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid2';
import { roleService } from './api/roles';

export default function Users() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sites, setSites] = useState([]);
  const [roles, setRoles] = useState([]);

  const searchParams = new URLSearchParams(location.search);
  const roleFilter = searchParams.get('roleFilter');

  const columns = [
    { field: 'id', headerName: 'ID', headerClassName: 'table-header', flex: 1, maxWidth: 100 },
    { field: 'first_name', headerName: 'First name', headerClassName: 'table-header', flex: 1, },
    { field: 'last_name', headerName: 'Last name', headerClassName: 'table-header', flex: 1, },
    { field: 'email', headerName: 'Email', headerClassName: 'table-header', flex: 1, },
    {
      field: 'site', headerName: 'Site', headerClassName: 'table-header', flex: 1,
      renderCell: (params) => {
        let siteTitle = '';
        if (!loading && sites.find(site => site.id === params.value)) {
          siteTitle = (sites.find(site => site.id === params.value)).title;
        }
        return <Link style={{ color: 'blue' }} to={`/sites/${params.value}`}>{siteTitle}</Link>;
      }
    },
    {
      field: 'role', headerName: 'Role', headerClassName: 'table-header', flex: 1,
      renderCell: (params) => {
        let roleTitle = '';
        if (!loading && roles.find(role => role.id === params.value)) {
          roleTitle = (roles.find(role => role.id === params.value)).name;
        }
        return <span>{roleTitle}</span>;
      }
    },
    {
      field: 'created_at', headerName: 'Account created at', headerClassName: 'table-header',
      valueFormatter: (params) => {
        return format(params, 'yyyy-MM-dd HH:mm');
      }, flex: 1
    },
    {
      field: 'buttons', headerName: '', headerClassName: 'table-header', flex: 1,
      renderCell: (params) => (<CellButtons type='user' id={params.id} />)
    }
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        let users = await userService.getUsers();

        if (roleFilter && roleFilter != 0) {
          users = users.filter(user => String(user.role) === String(roleFilter));
        }

        const formattedRows = users.map(user => ({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          site: user.site,
          role: user.role,
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

    const fetchSites = async () => {
      try {
        setLoading(true);
        const fetchedSites = await siteService.getSites();
        setSites(fetchedSites);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSites();

    const fetchRoles = async () => {
      try {
        setLoading(true);
        const fetchedRoles = await roleService.getRoles();
        setRoles(fetchedRoles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();

  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='ml-2 mr-2'>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Card variant='outlined'>
            <CardHeader title="Users"
              titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
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
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
