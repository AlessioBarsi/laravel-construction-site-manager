import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { siteService } from "./api/sites";
import { userService } from './api/users';
import { roleService } from './api/roles';
import { Link, useNavigate } from "react-router-dom";

import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { List, ListItem, ListItemText, Divider, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import dayjs from "dayjs";

import ConfirmModal from './Modals/ConfirmModal.jsx';
import UserEditModal from "./Modals/UserEditModal.jsx";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext.jsx";

export default function User() {
    const { id } = useParams();
    const { isAdmin } = useAuth();
    const navigate = useNavigate();

    //Modal states
    const [open, setOpen] = useState(false);

    const [openConfirm, setOpenConfirm] = useState(false);
    const [, setModalResultConfirm] = useState(null);
    const handleModalResultConfirm = (result) => {
        setModalResultConfirm(result);
        handleCloseConfirm();
        if (result) {
            handleDelete(id);
        };
    };
    const handleDelete = async () => {
        if (!isAdmin) {
            toast.error("You don't have permission to delete items.");
            return;
        }
        try {
            await userService.deleteUser(id);
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    };
    const handleOpenConfirm = () => setOpenConfirm(true);
    const handleCloseConfirm = () => setOpenConfirm(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //API calls
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);
    const [siteData, setSiteData] = useState(null);
    const [roleData, setRoleData] = useState(null);

    //User data
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await userService.getUser(id);
                setUserData({
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    site: user.site,
                    role: user.role,
                    admin: user.admin,
                    created_at: dayjs(user.created_at).format('YYYY-MM-DD'),

                });
            } catch (err) {
                console.log(err)
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    //Site and Role data
    useEffect(() => {
        if (userData && userData.site) {
            const fetchSite = async () => {
                try {
                    const site = await siteService.getSite(userData.site);
                    setSiteData({
                        id: site.id,
                        title: site.title,
                    });
                } catch (err) {
                    console.log(err)
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchSite();
        }

        if (userData && userData.role) {
            const fetchRole = async () => {
                try {
                    const role = await roleService.getRole(userData.role);
                    setRoleData({
                        id: role.id,
                        name: role.name,
                    });
                } catch (err) {
                    console.log(err)
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchRole();
        }
    }, [userData]);

    //useEffect(() => { console.log('User:', userData); }, [userData]);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='ml-2 mr-2'>
            <Grid container spacing={2}>
                <Grid size={4}>
                    <Card variant='outlined'>
                        <CardHeader title={`${userData.first_name} ${userData.last_name}`}
                            subheader="Information about this user"
                            titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                            subheaderTypographyProps={{ variant: 'subtitle1', fontWeight: 'bold' }}
                        />
                        <CardContent>
                            <List>
                                {userData && Object.entries(userData).map(([key, value]) => (
                                    <React.Fragment key={key}>
                                        <ListItem disablePadding>
                                            <ListItemText
                                                primary={
                                                    (() => {
                                                        switch (key) {
                                                            case 'id':
                                                                return "ID";
                                                            case 'created_at':
                                                                return "Created At";
                                                            case 'first_name':
                                                                return "First Name";
                                                            case 'last_name':
                                                                return "Last Name";
                                                            default:
                                                                return key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
                                                        }
                                                    })()
                                                }
                                                primaryTypographyProps={{ fontWeight: 'bold' }}
                                            />
                                            {(key == 'site' && (siteData && siteData.id != 0)) ? (
                                                <Typography style={{ color: 'blue' }}>
                                                    <Link color='primary' to={`/sites/${siteData.id}`}>
                                                        {siteData ? `${siteData.title}` : 'Loading site data...'}
                                                    </Link>
                                                </Typography>
                                            ) : (
                                                <Typography>
                                                    {(() => {
                                                        switch (key) {
                                                            case 'admin':
                                                                return value ? 'Yes' : 'No';
                                                            case 'role':
                                                                return (roleData && roleData.id != 0) ? (
                                                                    roleData.name
                                                                ) : 'No role assigned';
                                                            default:
                                                                return value;
                                                        }
                                                    })()}
                                                </Typography>
                                            )}
                                        </ListItem>
                                        <Divider />
                                    </React.Fragment>
                                ))}
                            </List>

                        </CardContent>
                        <CardActions>
                            <Stack spacing={2} direction='row'>
                                <IconButton aria-label="edit" color='primary' onClick={handleOpen}>
                                    <EditIcon />
                                </IconButton>
                                
                                <IconButton aria-label="delete" sx={{ color: 'red' }} onClick={handleOpenConfirm}>
                                    <DeleteIcon />
                                </IconButton>

                                <IconButton aria-label="reports" color='secondary' onClick={() => navigate('/reports')}>
                                    <InsertDriveFileIcon />
                                </IconButton>
                            </Stack>
                            <ConfirmModal open={openConfirm} handleClose={handleCloseConfirm} title={`Confirm Deletion?`} subtitle={`User #${userData.id} will be deleted`} onResult={handleModalResultConfirm} />
                            <UserEditModal open={open} handleClose={handleClose} user={userData} />

                        </CardActions>
                    </Card>
                </Grid>

                <Grid size={8}>
                    <div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}