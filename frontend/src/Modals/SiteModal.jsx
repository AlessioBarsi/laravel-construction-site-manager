import { useState, useEffect } from 'react';
import { userService } from '../api/users';
import { siteService } from '../api/sites';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';

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

export default function SiteModal({ open, handleClose, site }) {

  //API calls
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const users = await userService.getUsers();
        const user = users.map(user => ({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          site: user.site,
        }));
        setUsers(user);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [site]);

  //Select
  const [status, setStatus] = useState('');
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    setFormData((prevData) => ({ ...prevData, status: event.target.value, }));
  };
  const [director, setDirector] = useState(site.director);

  const handleChangeDirector = (event, value) => {
    if (value) {
      setDirector(value.id);
      setFormData((prevData) => ({ ...prevData, director: value.id }));
    }
  };

  //Buttons
  const handleCancel = () => {
    handleClose();
  };

  //formData handling
  const [formData, setFormData] = useState({
    title: site.title || '',
    client: site.client || '',
    location: site.location || '',
    status: site.status || '',
    director: site.director || '',
    start_date: dayjs(site.start_date).format('YYYY-MM-DD') || '',
    end_date: site.end_date ? dayjs(site.end_date).format('YYYY-MM-DD') : null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filter out empty fields 
    const filteredData = Object.entries(formData).reduce((acc, [key, value]) => {
      if (value) {
        acc[key] = value;
      } return acc;
    }, {});

    //console.log(JSON.stringify(formData, null, 2));
    try {
      const updatedSite = await siteService.updateSite(site.id, filteredData);
      console.log(JSON.stringify(updatedSite, null, 2));
      handleClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e, newValue = null) => {
    // Check if it's a DatePicker change
    if (newValue) {
      const { id } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [id]: newValue,
      }));
    } else {
      const { id, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
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
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} direction="row">
              <TextField id="title" label="Title" variant="outlined" onChange={handleChange} defaultValue={site.title} required />
              <TextField id="client" label="Client" variant="outlined" onChange={handleChange} defaultValue={site.client} required />
              <TextField id="location" label="Location" variant="outlined" onChange={handleChange} defaultValue={site.location} required />
            </Stack>

            <Stack spacing={2} sx={{ mt: 2 }} direction="row">
              <FormControl sx={{ width: '50%' }}>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  defaultValue={site.status}
                  label="Status"
                  onChange={handleChangeStatus}
                >
                  <MenuItem value={'open'}>Open</MenuItem>
                  <MenuItem value={'not_started'}>Not Started</MenuItem>
                  <MenuItem value={'closed'}>Closed</MenuItem>
                </Select>
              </FormControl>

              <Autocomplete
                onChange={handleChangeDirector}
                disablePortal
                options={users.map((user) => ({ label: `${user.first_name} ${user.last_name}`, id: user.id }))}
                sx={{ width: '50%' }}
                renderInput={(params) => <TextField {...params} label="Director" />}
                defaultValue={(() => {
                  const selectedDirector = users.find(user => user.id === site.director);
                  return selectedDirector ? { label: `${selectedDirector.first_name} ${selectedDirector.last_name}`, id: site.director } : null;
                })()
                }
              />
            </Stack>

            <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker id="start_date" required
                    onChange={(newValue, e) => handleChange({ target: { id: 'start_date' } }, newValue)}
                    label="Start Date"
                    defaultValue={dayjs(formData.start_date)}
                  />
                </DemoContainer>
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker id="end_date"
                    onChange={(newValue, e) => handleChange({ target: { id: 'end_date' } }, newValue)}
                    label="End Date"
                    defaultValue={site.end_date ? dayjs(site.end_date) : null}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Stack>

            <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
              <Button type='submit' sx={{ bgcolor: 'green' }} variant="contained">Update</Button>
              <Button onClick={handleCancel} sx={{ bgcolor: 'red' }} variant="contained">Cancel</Button>
            </Stack>
          </form>
        </Box>
      </Modal>

    </div>
  );
}