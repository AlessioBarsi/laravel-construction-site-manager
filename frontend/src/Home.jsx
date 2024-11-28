import { useState } from 'react';
import NewReportModal from './Modals/NewReportModal.jsx';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';

import { AccountCircle } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

export default function Home() {
    //Modal states
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const navigate = useNavigate();

    const { userId, logout } = useAuth();
    return (
        <div className='mt-5 ml-10 mr-10'>
            <Grid container spacing={20}>
                <Grid size={4}>
                    <Stack spacing={2} direction='row'>
                        <><Button variant='outlined' startIcon={<EditIcon/>} onClick={handleOpen}>New Report</Button>
                        <NewReportModal open={open} handleClose={handleClose} /></>
                    </Stack>
                </Grid>

                <Grid size={4}>
                    <Stack spacing={2} direction='row'>
                        <Button variant='contained' startIcon={<AccountCircle/>} onClick={() => navigate('/profile')}>User Profile</Button>
                    </Stack>
                </Grid>

                <Grid size={4}>
                    <Stack spacing={2} direction='row'>
                        <Button variant='outlined' startIcon={<InsertDriveFileIcon/>} onClick={() => navigate('/reports')}>Your Reports</Button>
                    </Stack>
                </Grid>
            </Grid>
        </div>);
}