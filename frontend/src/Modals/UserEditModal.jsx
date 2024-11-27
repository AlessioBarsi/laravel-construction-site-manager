import { useState, useEffect } from 'react';
import { siteService } from '../api/sites';
import { roleService } from '../api/roles';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import { userService } from '../api/users';

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

export default function UserEditModal({ open, handleClose, user }) {

    //API calls
    const [roles, setRoles] = useState([]);
    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user && user.role) {
            const fetchRoles = async () => {
                try {
                    setLoading(true);
                    const roles = await roleService.getRoles();
                    const role = roles.map(role => ({
                        id: role.id,
                        name: role.name,
                        icon: role.icon,
                    }));
                    setRoles(role);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchRoles();
        }
        if (user && user.site) {
            const fetchSites = async () => {
                try {
                    setLoading(true);
                    const sites = await siteService.getSites();
                    const site = sites.map(site => ({
                        id: site.id,
                        title: site.title,
                    }));
                    setSites(site);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchSites();
        }
    }, [user]);

    //Select
    const handleChangeAdmin = (event) => {
        setFormData((prevData) => ({ ...prevData, admin: event.target.checked ? 1 : 0, }));
    };

    const [userRole, setRole] = useState(user.role);
    const handleChangeRole = (event, value) => {
        if (value) {
            setRole(value.id);
            setFormData((prevData) => ({ ...prevData, role: value.id }));
        } else {
            setFormData((prevData) => ({ ...prevData, role: 0 }));
        }
    };
    const [userSite, setSite] = useState(user.site);
    const handleChangeSite = (event, value) => {
        if (value) {
            setSite(value.id);
            setFormData((prevData) => ({ ...prevData, site: value.id }));
        } else {
            setFormData((prevData) => ({ ...prevData, site: 0 }));
        }
    };

    //Buttons
    const handleCancel = () => {
        handleClose();
    };

    //formData handling
    const [formData, setFormData] = useState({
        role: userRole || '',
        site: userSite || '',
        admin: user.admin || 0,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Filter out empty or invalid fields 
        const filteredData = Object.entries(formData).reduce((acc, [key, value]) => {
            if (key=='admin' || value != null && value!==0) {
                acc[key] = value;
            } return acc;
        }, {});
        try {
            const updatedUser = await userService.updateUser(user.id, filteredData);
            console.log(JSON.stringify(updatedUser, null, 2));
            handleClose();
            window.location.reload();
            console.log(filteredData)
        } catch (error) {
            console.log(error);
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
                        <Stack spacing={2} sx={{ mt: 2 }} >
                            <Autocomplete
                                onChange={handleChangeRole}
                                disablePortal
                                options={roles.map((role) => ({ label: `${role.name} ${role.icon}`, id: role.id }))}
                                renderInput={(params) => <TextField {...params} label="Role" />}
                                defaultValue={
                                    (user.role && user.role !== 0)
                                    ? (() => {
                                        const selectedRole = roles.find(role => role.id === user.role);
                                        return selectedRole ? {label: selectedRole.name, id: user.role} : null;
                                    })()
                                    : null
                                }
                            />

                            <Autocomplete
                                onChange={handleChangeSite}
                                disablePortal
                                options={sites.map((site) => ({ label: `${site.title}`, id: site.id }))}
                                renderInput={(params) => <TextField {...params} label="Site" />}
                                defaultValue={
                                    (user.site && user.site !== 0) 
                                        ? (() => {
                                            const selectedSite = sites.find(site => site.id === user.site);
                                            return selectedSite ? {label: selectedSite.title, id: user.site} : null;
                                        })()
                                    : null
                                }
                            />
                            <FormControlLabel
                                control={user.admin ?
                                    <Switch defaultChecked onChange={handleChangeAdmin} /> :
                                    <Switch onChange={handleChangeAdmin} />
                                } label="Admin" />
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