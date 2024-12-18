import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { siteService } from "./api/sites";
import { reportService } from "./api/reports";
import { Link } from "react-router-dom";

import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { List, ListItem, ListItemText, Divider } from "@mui/material";
import dayjs from "dayjs";
import { userService } from "./api/users";

export default function Report() {
    const { id } = useParams();

    //API calls
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reportData, setReportData] = useState(null);
    const [siteData, setSiteData] = useState(null);
    const [usersData, setUsersData] = useState(null);
    const [authorData, setAuthorData] = useState(null);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const report = await reportService.getReport(id);
                setReportData(report);
            } catch (err) {
                console.log(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchReport();
    }, [id]);

    //Associated Users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await reportService.getUsers(id);
                setUsersData(users);
            } catch (err) {
                console.log(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [id]);

    //Site Data
    useEffect(() => {
        if (reportData && reportData.site) {
            const fetchSite = async () => {
                try {
                    const site = await siteService.getSite(reportData.site);
                    setSiteData(site);
                } catch (err) {
                    console.log(err)
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchSite();
        }
    }, [reportData]);

    //Author Data
    useEffect(() => {
        if (reportData && reportData.author) {

            const fetchAuthor = async () => {
                try {
                    const author = await userService.getUser(reportData.author);
                    setAuthorData(author);
                }
                catch (err) {
                    console.log(err);
                    setError(err.message)
                } finally {
                    setLoading(false);
                }
            };
            fetchAuthor();
        }
    }, [reportData]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const keysToSkip = ['description', 'problem_description', 'solution', 'users', 'updated_at', 'image_path'];

    return (
        <div className='ml-2 mr-2'>
            <Grid container spacing={2}>
                <Grid size={4}>
                    <Card variant='outlined'>
                        <CardHeader title={`Report ${dayjs(reportData.created_at).format('YYYY-MM-DD')}`}
                            subheader="Information about this report"
                            titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                            subheaderTypographyProps={{ variant: 'subtitle1', fontWeight: 'bold' }}
                        />
                        <CardContent>
                            <List>
                                {reportData && Object.entries(reportData).map(([key, value]) => {
                                    if (keysToSkip.includes(key) || (key == 'critical' && reportData.problem == 0)) return null;
                                    return (
                                        <React.Fragment key={key}>
                                            <ListItem disablePadding>
                                                <ListItemText
                                                    primary={
                                                        (() => {
                                                            switch (key) {
                                                                case 'id':
                                                                    return "ID";
                                                                case 'created_at':
                                                                    return "Date";
                                                                case 'problem':
                                                                    return "Problem Status";
                                                                default:
                                                                    return key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
                                                            }
                                                        })()
                                                    }
                                                    primaryTypographyProps={{ fontWeight: 'bold' }}
                                                />
                                                {(() => {
                                                    switch (key) {
                                                        case 'created_at':
                                                            return dayjs(value).format('YYYY-MM-DD HH:mm')
                                                        case 'site':
                                                            if (siteData && siteData.title) {
                                                                return <Link to={`/sites/${value}`} style={{ color: 'blue' }}>{siteData.title}</Link>
                                                            } else {
                                                                return 'Loading Site..';
                                                            }
                                                        case 'author':
                                                            if (authorData) {
                                                                return <Link to={`/users/${authorData.id}`} style={{ color: 'blue' }}>
                                                                    {authorData.first_name} {authorData.last_name}
                                                                </Link>
                                                            } else {
                                                                return 'Loading Author...'
                                                            }
                                                        case 'problem':
                                                            return value ? 'Yes' : 'No problem';
                                                        case 'critical':
                                                            return value ? 'Yes' : 'No';
                                                        default:
                                                            return JSON.stringify(value);
                                                    }
                                                })()}
                                            </ListItem>
                                            <Divider />
                                        </React.Fragment>
                                    )
                                })}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={8}>
                    <Card variant='outlined'>
                        <CardHeader title="Description"
                            titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                        />
                        <CardContent>
                            <div>{reportData.description}</div>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={4}>
                    <Card variant='outlined'>
                        <CardHeader title="Users for this report"
                            titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                        />
                        <CardContent>
                            <List>
                                {usersData && usersData.map((user) => {
                                    return (
                                        <React.Fragment key={user.id}>
                                            <ListItem>
                                                <Link style={{ color: 'blue' }} to={`/users/${user.id}`}>
                                                    <ListItemText primary={`${user.first_name} ${user.last_name}`} />
                                                </Link>
                                            </ListItem>
                                            <Divider />
                                        </React.Fragment>)
                                })}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={8}>
                    <Card variant='outlined'>
                        <CardHeader title="Problem"
                            titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                        />
                        <CardContent>
                            <div>{reportData.problem_description ? reportData.problem_description : 'Not a problem'}</div>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={4}>
                    <Card variant='outlined'>
                        <CardHeader title="Image"
                            titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                        />
                        <CardContent>
                            <div>Image goes here</div>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={8}>
                    <Card variant='outlined'>
                        <CardHeader title="Proposed Solution"
                            titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                        />
                        <CardContent>
                            <div>{reportData.problem_solution ? reportData.problem_solution : 'Not a problem'}</div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}