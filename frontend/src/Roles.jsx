import { useState, useEffect } from 'react';
import CellButtons from './Components/CellButtons';
import { Link } from 'react-router-dom';

import { DataGrid } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid2';
import { roleService } from './api/roles';

export default function Roles() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const columns = [
        { field: 'id', headerName: 'ID', headerClassName: 'table-header', flex: 1, maxWidth: 100 },
        { field: 'name', headerName: 'Role Name', headerClassName: 'table-header', flex: 1, },
        { field: 'icon', headerName: 'Icon', headerClassName: 'table-header', flex: 1, },
        {
            field: 'buttons', headerName: '', headerClassName: 'table-header', flex: 1,
            renderCell: (params) => (<CellButtons type='role' id={params.id} />)
        }
    ];

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                setLoading(true);
                const fetchedRoles = await roleService.getRoles();
                setRows(fetchedRoles);
                console.log(fetchedRoles);
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
                        <CardHeader title="Roles"
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
