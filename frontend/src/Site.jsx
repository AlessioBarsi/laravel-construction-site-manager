import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { siteService } from "./api/sites";
import { userService } from './api/users';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { List, ListItem, ListItemText, Divider, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

export default function Site() {
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [siteData, setSiteData] = useState(null);
    const [directorData, setDirectorData] = useState(null);

    useEffect(() => {
        const fetchSite = async () => {
            try {
                const site = await siteService.getSite(id);
                setSiteData({
                    id: site.id,
                    title: site.title,
                    client: site.client,
                    location: site.location,
                    start_date: site.start_date,
                    end_date: site.end_date,
                    status: site.status,
                    director: site.director,
                });
            } catch (err) {
                console.log(err)
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSite();
    }, [id]);

    useEffect(() => {
        if (siteData && siteData.director) {
            const fetchDirector = async () => {
                try {
                    const director = await userService.getUser(siteData.director);
                    setDirectorData({
                        id: director.id,
                        first_name: director.first_name,
                        last_name: director.last_name,
                    });
                } catch (err) {
                    console.log(err)
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchDirector();
        }

    }, [siteData]);

    //useEffect(() => { console.log('Director:', directorData); }, [directorData]);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='ml-2 mr-2'>
            <Grid container spacing={2}>
                <Grid size={4}>
                    <Card variant='outlined'>
                        <CardHeader title={siteData.title}
                            subheader="Information about this site"
                            titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                            subheaderTypographyProps={{ variant: 'subtitle1', fontWeight: 'bold' }}
                        />
                        <CardContent>
                            <List>
                                {siteData && Object.entries(siteData).map(([key, value]) => (
                                    <React.Fragment key={key}>
                                        <ListItem disablePadding>
                                            <ListItemText
                                                primary={
                                                    (() => {
                                                        switch (key) {
                                                            case 'id':
                                                                return "ID";
                                                            case 'start_date':
                                                                return "Start Date";
                                                            case 'end_date':
                                                                return "End Date";
                                                            case 'director':
                                                                return "Director";
                                                            default:
                                                                return key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
                                                        }
                                                    })()
                                                }
                                                primaryTypographyProps={{ fontWeight: 'bold' }}
                                            />
                                            {key == 'director' ? (
                                                <Typography style={{color:'blue'}}>
                                                   <Link color='primary' to={`/user/${siteData.director}`}>
                                                     {directorData ? `${directorData.first_name} ${directorData.last_name}` : 'Loading director...'} 
                                                     </Link>
                                                </Typography>
                                            ) : (
                                                <Typography>
                                                    {(() => {
                                                        switch (key) {
                                                            case 'status':
                                                                if (value=='not_started') return 'Not started'
                                                                return value.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
                                                            default:
                                                                return value;
                                                        }
                                                    })()}
                                                </Typography>
                                            )

                                            }
                                        </ListItem>
                                        <Divider />
                                    </React.Fragment>
                                ))}
                            </List>

                        </CardContent>
                        <CardActions>
                            <Stack>
                                <IconButton aria-label="edit" color="primary" onClick={() => console.log('Editing')}>
                                    <EditIcon />
                                </IconButton>
                            </Stack>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid size={8}>
                    <Card variant='outlined'>
                        <CardHeader title="Assigned Users"
                            titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                        />
                        <CardContent>
                            <div>
                                Users List
                            </div>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Card Action Button</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}