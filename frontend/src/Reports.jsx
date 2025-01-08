import React, { useState, useEffect } from 'react';
import CellButtons from './Components/CellButtons';
import { siteService } from './api/sites';
import { reportService } from './api/reports';
import { userService } from './api/users';
import { format } from 'date-fns';
import { DataGrid } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid2';
import { ReportProblem, Image } from "@mui/icons-material";
import { Link, useLocation } from 'react-router-dom';
import UserListModal from './Modals/UserListModal';

export default function Reports() {

    //URL params
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userFilter = searchParams.get('userFilter');
    const siteFilter = searchParams.get('siteFilter');

    const columns = [
        { field: 'id', headerName: 'ID', headerClassName: 'table-header', flex: 1, maxWidth: 100 },
        {
            field: 'created_at', headerName: 'Date', headerClassName: 'table-header',
            valueFormatter: (params) => {
                return format(params, 'yyyy-MM-dd HH:mm');
            }, flex: 1
        },
        {
            field: 'site', headerName: 'Site', headerClassName: 'table-header',
            renderCell: (params) => {
                let siteTitle = 'Loading...';
                if (!loading && fetchedSites.find(site => site.id === params.value)) {
                    siteTitle = (fetchedSites.find(site => site.id === params.value)).title;
                }
                return <Link style={{ color: 'blue' }} to={`/sites/${params.value}`}>{siteTitle}</Link>;
            },
            flex: 1,
        },
        { field: 'description', headerName: 'Description', headerClassName: 'table-header', flex: 1, },
        {
            field: 'author', headerName: 'Author', headerClassName: 'table-header', flex: 1,
            renderCell: (params) => {
                let authorName = 'Loading...';
                if (!loading && fetchedUsers.find(user => user.id === params.value)) {
                    authorName = `${(fetchedUsers.find(user => user.id === params.value)).first_name} ${(fetchedUsers.find(user => user.id === params.value)).last_name}`;
                }
                return <Link style={{ color: 'blue' }} to={`/users/${params.value}`}>{authorName}</Link>;
            }
        },
        {
            field: 'problem', headerName: 'Problem Status', headerClassName: 'table-header', flex: 1,
            renderCell: (params) => {
                if (params && params.value[0]) {
                    if (params.value[1]) {
                        return <ReportProblem sx={{ color: 'red' }} />
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
        {
            field: 'image_path', headerName: 'Image', headerClassName: 'table-header', flex: 1,
            renderCell: (params) => {
                if (params.value) {
                    return <Image color='primary' />
                } else {
                    return <></>
                }
            }
        },
        {
            field: 'users', headerName: 'Users on Site', headerClassName: 'table-header', flex: 1,
            renderCell: (params) => {
                if (params.value) {
                    return <>
                        <UserListModal userList={params.value} />
                    </>
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
                let reports = await reportService.getReports();

                if (userFilter && userFilter != 0) {
                    reports = reports.filter(report => String(report.author) === String(userFilter));
                }

                if (siteFilter && siteFilter != 0) {
                    reports = reports.filter(report => String(report.site) === String(siteFilter));
                }

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
                    author: report.author,
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
                        <CardHeader title="Reports"
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
                    </Card>
                </Grid>

            </Grid>
        </div>
    );
}
