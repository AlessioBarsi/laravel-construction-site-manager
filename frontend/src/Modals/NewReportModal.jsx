import { useState, useEffect } from "react";

import { reportService } from "../api/reports";
import { siteService } from "../api/sites";

import { Card, CardHeader, CardContent, Modal, TextField, Stack, Box, FormControl, Button } from "@mui/material";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import CheckboxList from "../Components/CheckBoxList";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    width: '90%',
    height: '90%',
    p: 4,
};

export default function NewReportModal({ open, handleClose, user }) {

    const [usersOnSite, setUsersOnSite] = useState([]);
    //formData handling
    const [formData, setFormData] = useState({
        description: '',
        site: 0,
        problem: 0,
        critical_problem: 0,
        problem_description: '',
        solution: '',
        image_path: '',
        users: [],
    });

    useEffect(() => {
        if (user && user.site) {
            //Set site to report
            setFormData((prevData) => ({ ...prevData, site: user.site }));
            //Get users on site
            const fetchUsersOnSite = async () => {
                try {
                    const users = await siteService.getUsers(user.site);
                    setUsersOnSite(users);
                } catch (err) {
                    console.log(err);
                };
            }
            fetchUsersOnSite();
        }
    }, [user]);

    const [isDisabled, setIsDisabled] = useState(true);
    const handleCancel = () => {
        handleClose();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData['description']) {
            alert('Report description is requried')
        } else if (formData['users'].length == 0) {
            alert('Assigned users are required')
        } else {
            //Remove associated fields if there is no problem
            const filteredData = { ...formData };
            if (isDisabled) {
                delete filteredData.critical_problem;
                delete filteredData.problem_description;
                delete filteredData.solution;
            }
            console.log(filteredData);
            try {
                const newReport = await reportService.createReport(filteredData);
                console.log(JSON.stringify(newReport, null, 2));
                handleClose();
            } catch (error) {
                console.log(error);
            }
        }

    }

    const handleAttachment = (event) => {
        console.log('Handle File Upload')
    }

    const handleChange = (event) => {
        switch (event.target.id) {
            case 'problem':
                setIsDisabled(event.target.checked ? false : true);
                setFormData((prevData) => ({ ...prevData, problem: event.target.checked ? 1 : 0, }));
                break;
            case 'critical_problem':
                setFormData((prevData) => ({ ...prevData, critical_problem: event.target.checked ? 1 : 0, }));
                break;
            default:
                setFormData((prevData) => ({ ...prevData, [event.target.id]: event.target.value, }));
        }
    }

    const handleChangeUsers = (changedUsers) => {
        setFormData((prevData) => ({ ...prevData, 'users': changedUsers, }));
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Stack spacing={2} direction="row">
                    <FormControl fullWidth>
                        <TextField onChange={handleChange} id="description" label="Description" variant="outlined" placeholder="You can write multiple lines" required multiline />
                    </FormControl>
                    <FormControlLabel control={<Switch id='problem' />} onChange={handleChange} label="Problem" />
                </Stack>

                <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
                    <FormControl fullWidth>
                        <TextField onChange={handleChange} disabled={isDisabled} id="problem_description" label="Problem Description" variant="outlined" multiline />
                    </FormControl>
                    <FormControlLabel disabled={isDisabled} control={<Switch id='critical_problem' />} onChange={handleChange} label="Critical Problem" />
                </Stack>

                <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
                    <FormControl sx={{ width: '70%' }}>
                        <TextField onChange={handleChange} disabled={isDisabled} id="solution" label="Proposed Solution" variant="outlined" multiline />
                    </FormControl>
                    <Button onClick={handleAttachment} startIcon={<InsertPhotoIcon />} variant="contained">
                        Upload files
                    </Button>
                </Stack>

                <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
                    <Card variant='outlined'>
                        <CardHeader title="Users for this report" titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }} />
                        <CardContent>
                            <CheckboxList items={usersOnSite} onChangeItems={handleChangeUsers} />
                        </CardContent>
                    </Card>
                </Stack>

                <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
                    <Button type='submit' onClick={handleSubmit} sx={{ bgcolor: 'green' }} variant="contained">Send</Button>
                    <Button onClick={handleCancel} sx={{ bgcolor: 'red' }} variant="contained">Cancel</Button>
                </Stack>
            </Box>
        </Modal>
    );
}