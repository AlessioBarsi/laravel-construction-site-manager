import { useState, useEffect } from "react";

import { Modal, TextField, Stack, Box, FormControl, Button } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function NewReportModal({ open, handleClose, user }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleCancel = () => {
        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Stack spacing={2} direction="row">
                    <FormControl>
                        <TextField id="description" label="Description" variant="outlined" required />
                    </FormControl>
                </Stack>

                <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
                    <TextField id="site" label="Site" variant="outlined" required />
                    <TextField id="author" label="Author" variant="outlined" required />
                    <FormControlLabel control={<Switch/>} label="Critical Problem" />
                </Stack>

                <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
                    <Button type='submit' sx={{ bgcolor: 'green' }} variant="contained">Send</Button>
                    <Button onClick={handleCancel} sx={{ bgcolor: 'red' }} variant="contained">Cancel</Button>
                </Stack>
            </Box>
        </Modal>
    );
}