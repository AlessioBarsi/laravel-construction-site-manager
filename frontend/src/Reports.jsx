import React, { useState, useEffect } from 'react';
import CellButtons from './Components/CellButtons';
import { siteService } from './api/sites';
import { reportService } from './api/reports';
import { userService } from './api/users';
import { format } from 'date-fns';
import { DataGrid } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { ReportProblem, Image, Group } from "@mui/icons-material";
import { Link } from 'react-router-dom';



export default function Reports() {
    const columns = [
        { field: 'id', headerName: 'ID', headerClassName: 'table-header', flex: 1, maxWidth: 100 },
        {field: 'created_at', headerName: 'Date', headerClassName: 'table-header',
            valueFormatter: (params) => {
                return format(params, 'yyyy-MM-dd HH:mm');
            }, flex: 1
        },
        { field: 'site', headerName: 'Site', headerClassName: 'table-header',
            valueFormatter: (params) => {
                let siteTitle = 'Loading...';
                if (!loading && fetchedSites.find(site => site.id === params)) { 
                    siteTitle = (fetchedSites.find(site => site.id === params)).title;
                }
                return siteTitle;
            },
            flex: 1, 
        },
        { field: 'description', headerName: 'Description', headerClassName: 'table-header', flex: 1, },
        { field: 'problem', headerName: 'Problem Status', headerClassName: 'table-header', flex: 1,
            renderCell: (params) => {
                if (params && params.value[0]) {
                    if (params.value[1]){
                        return <ReportProblem sx={{color:'red'}}/>
                    } else {
                        return <ReportProblem />
                    }
                } else {
                    return <div>No Problem</div>
                }
            }
         },
        { field: 'problem_description', headerName: 'Problem Description', headerClassName: 'table-header', flex: 1, },
        { field: 'solution', headerName: 'Solution', headerClassName: 'table-header', flex: 1, },
        { field: 'image_path', headerName: 'Image', headerClassName: 'table-header', flex: 1,
            renderCell: (params) => {
                if (params.value) {
                    return <Image color='primary'/>
                } else {
                    return <></>
                }
            } 
        },
        { field: 'users', headerName: 'Users on Site', headerClassName: 'table-header', flex:1, 
            renderCell:(params) => {
                if (params.value) {
                    return <>{params.value.length} <Group color='primary'/> </>
                } else {
                    return <></>
                }
            }
        },
        {
            field: 'buttons', headerName: '', headerClassName: 'table-header', flex: 1,
            renderCell: (params) => (<CellButtons type='report' id={params.id} />)
        }
    ];

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fetchedUsers, setFetchedUsers] = useState([]);
    const [fetchedSites, setFetchedSites] = useState([]);

    //Reports
    useEffect(() => {
        const fetchReports = async () => {
            try {
                setLoading(true);
                const reports = await reportService.getReports();
                const formattedRows = reports.map(report => ({
                    id: report.id,
                    created_at: report.created_at,
                    site: report.site,
                    description: report.description,
                    problem: [report.problem, report.critical],
                    problem_description: report.problem_description,
                    solution: report.solution,
                    image_path: report.image_path,
                    users: report.users,
                }));
                setRows(formattedRows);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);

    //Sites
    useEffect(() => {
        const fetchSites = async () => {
            try {
                setLoading(true);
                const sites = await siteService.getSites();
                setFetchedSites(sites);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSites();
    }, []);

    //Users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const users = await userService.getUsers();
                setFetchedUsers(users);
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
