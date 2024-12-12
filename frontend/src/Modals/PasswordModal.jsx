import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack, TextField, FormControl } from '@mui/material';
import { userService } from '../api/users';

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


export default function PasswordModal({ userId, open, handleClose }) {

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedUser = await userService.changePassword(userId, {
        'password' : oldPassword,
        'new_password': newPassword,
        'email': email,
      });
      console.log(JSON.stringify(updatedUser, null, 2));
      //handleClose();
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
            Change Password
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Enter your email and current password
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack direction='row' sx={{ mt: 2, mb: 2 }}>
              <FormControl required sx={{ gap: 2 }} fullWidth>
                <TextField type='email' required onChange={(event) => setEmail(event.target.value ? event.target.value : '')} variant='outlined' label='Email' />
                <TextField type='password' required onChange={(event) => setOldPassword(event.target.value ? event.target.value : '')} variant='outlined' label='Current Password' />
                <TextField type='password' required onChange={(event) => setNewPassword(event.target.value ? event.target.value : '')} variant='outlined' label='New Password' />
              </FormControl>
            </Stack>
            <Stack spacing={2} direction='row'>
              <Button type='submit' sx={{ bgcolor: 'green' }} variant="contained">Change Password</Button>
              <Button onClick={handleClose} sx={{ bgcolor: 'red' }} variant="contained">Cancel</Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </div>
  );
}