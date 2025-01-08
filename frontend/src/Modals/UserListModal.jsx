import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
//import Typography from '@mui/material/Typography';
import { IconButton, Typography } from '@mui/material';
import { Group } from '@mui/icons-material';
import { Link } from 'react-router-dom';

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

export default function UserListModal({ userList }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {userList ? userList.length : 'No userList'}
      <IconButton color='primary' onClick={handleOpen}>
        <Group />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="user-list-modal"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Users for this report
          </Typography>
          {userList ?
            <ul>
              {userList.map((user, index) => (
                <li key={index}>
                  <Link to={`/users/${user.id}`} >
                    <Typography sx={{ color: 'blue' }}> {user.first_name} {user.last_name} </Typography>
                  </Link>
                </li>
              ))}
            </ul>
            : 'No userList'}
        </Box>
      </Modal>
    </div>
  );
}