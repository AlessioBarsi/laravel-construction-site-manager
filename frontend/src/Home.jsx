import { useState, useEffect } from 'react';
import { userService } from './api/users';
import NewReportModal from './Modals/NewReportModal.jsx';

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import { Divider } from '@mui/material';

import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import EditIcon from '@mui/icons-material/Edit';
import { AccountCircle } from '@mui/icons-material';

export default function Home() {
    //Modal states
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    return (
        <div className='mt-5 ml-10 mr-10'>
            <Grid container spacing={20}>
                <Grid size={4}>
                    <Stack spacing={2} divider={<Divider orientation="vertical" flexItem />} direction='row'>
                        <IconButton aria-label="new report" color='primary' onClick={handleOpen}>
                            <EditIcon />
                        </IconButton>
                        <><Button variant='outlined'>New Report</Button>
                        <NewReportModal open={open} handleClose={handleClose} /></>
                    </Stack>
                </Grid>

                <Grid size={4}>
                    <Stack spacing={2} divider={<Divider orientation="vertical" flexItem />} direction='row'>
                        <IconButton aria-label="user profile" color='primary' onClick={() => navigate('/user')}>
                            <AccountCircle />
                        </IconButton>
                        <Button variant='contained'>User Profile</Button>
                    </Stack>
                </Grid>

                <Grid size={4}>
                    <Stack spacing={2} divider={<Divider orientation="vertical" flexItem />} direction='row'>
                        <IconButton aria-label="your reports" color='primary' onClick={() => navigate('/reports')}>
                            <InsertDriveFileIcon />
                        </IconButton>
                        <Button variant='outlined'>Your Reports</Button>
                    </Stack>
                </Grid>
            </Grid>
        </div>);
}