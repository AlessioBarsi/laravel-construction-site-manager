import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack, TextField, FormControl } from '@mui/material';
import { roleService } from '../api/roles';
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function RoleModal({ open, handleClose, role, newRole = false }) {

    const [roleName, setRoleName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newRole = await roleService.createRole({
                'name': roleName,
                'icon': '',
            });
            console.log(JSON.stringify(newRole, null, 2));
            navigate(0);
            handleClose();
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create a new Role
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Enter the role name
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Stack direction='row' sx={{ mt: 2, mb: 2 }}>
                            <FormControl required sx={{ gap: 2 }} fullWidth>
                                <TextField type='name' required onChange={(event) => setRoleName(event.target.value ? event.target.value : '')} variant='outlined' label='Role Name' />
                            </FormControl>
                        </Stack>
                        <Stack spacing={2} direction='row'>
                            <Button type='submit' sx={{ bgcolor: 'green' }} variant="contained">Create Role</Button>
                            <Button onClick={handleClose} sx={{ bgcolor: 'red' }} variant="contained">Cancel</Button>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}