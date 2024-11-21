import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';

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

export default function ConfirmModal({ open, handleClose, title, subtitle, onResult }) {
  const handleYes = () => { 
    onResult(true); 
  };
  const handleNo = () => { 
    onResult(false); 
  };
  
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
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb : 2 }}>
            {subtitle}
          </Typography>
          <Stack spacing={2} direction="row">
            <Button onClick={handleYes} sx={{bgcolor : 'green'}} variant="contained">Yes</Button>
            <Button onClick={handleNo} sx={{bgcolor : 'red'}} variant="contained">No</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}