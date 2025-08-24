import { useState, useEffect, useRef } from "react";

import { reportService } from "../api/reports";
import { siteService } from "../api/sites";

import { Card, CardHeader, CardContent, Modal, TextField, Stack, Box, FormControl, Button } from "@mui/material";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import CheckBoxList from "../Components/CheckBoxList";
import toast from "react-hot-toast";

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
    const fileInputRef = useRef(null);
    const [usersOnSite, setUsersOnSite] = useState([]);
    //formData handling
    const [formData, setFormData] = useState({
        description: '',
        site: 0,
        author: 0,
        problem: 0,
        critical_problem: 0,
        problem_description: '',
        solution: '',
        file: null,
        users: [],
    });

    useEffect(() => {
        if (user && user.site && user.id) {
            //Set author to report
            setFormData((prevData) => ({ ...prevData, author: user.id }))
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

            toast.error('Report description is required');

        } else if (formData['users'].length == 0) {

            toast.error('At least one user must be selected');

        } else {

            //Remove associated fields if there is no problem
            const filteredData = { ...formData, 'critical': formData.critical_problem };
            console.log('filtered data', filteredData);
            delete filteredData.critical_problem;

            if (isDisabled) {
                delete filteredData.critical;
                delete filteredData.problem_description;
                delete filteredData.solution;
            }
            if (filteredData.solution == '') {
                delete filteredData.solution;
            }

            const formDataToSend = new FormData();
            Object.entries(filteredData).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    // send arrays properly
                    value.forEach((v, i) => formDataToSend.append(`${key}[${i}]`, v));
                } else {
                    formDataToSend.append(key, value);
                }
            });

            try {
                const newReport = await reportService.createReport(formDataToSend);
                console.log(JSON.stringify(newReport, null, 2));
                toast.success('Report has been sent!')
                setTimeout(() => {
                    handleClose();
                }, 3000);

            } catch (error) {
                console.log("Caught Error:", error)
                Object.keys(error.errors).forEach((key) => {
                    error.errors[key].forEach((err) => toast.error(<div><b>{key.charAt(0).toUpperCase() + key.slice(1)}</b><br />{err}</div>));
                });
            }
        }
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

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setFormData((prevData) => ({ ...prevData, file: file }));
            console.log(formData);
        }
    }

    //click the file upload input instead
    const handleFileButtonClick = () => {
        fileInputRef.current.click();
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
                    <Button onClick={handleFileButtonClick} startIcon={<InsertPhotoIcon />} variant="contained">
                        Upload files
                    </Button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </Stack>

                <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
                    <Card variant='outlined'>
                        <CardHeader title="Users for this report" titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }} />
                        <CardContent>
                            <CheckBoxList items={usersOnSite} onChangeItems={handleChangeUsers} />
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