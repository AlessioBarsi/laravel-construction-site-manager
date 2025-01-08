import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UserListModal({ open, handleClose, userList }) {
  
  const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log(userList);
        if (userList){
            setUsers(userList);
        }
    }, [userList])

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
            Users assigned for this report: {users ? users.length : ''}
          </Typography>
          <Stack spacing={2} direction="row">
            <Button onClick={handleClose} color='primary' variant="contained">Close</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}