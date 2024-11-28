import { useState, useEffect } from "react";
import { reportService } from "../api/reports";

import { Modal, TextField, Stack, Box, FormControl, Button } from "@mui/material";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
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
    width: '80%',
    p: 4,
};

export default function NewReportModal({ open, handleClose, user }) {

    //formData handling
    const [formData, setFormData] = useState({
        description: '',
        //site: user.site || '',
        problem: 0,
        critical_problem: 0,
        problem_description: '',
        solution: '',
        image_path: '',
        users: [],
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true);

    const handleCancel = () => {
        handleClose();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        if (formData['description']) {
            //Remove fields if there is no problem
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
                //handleClose();
                //window.location.reload();
            } catch (error) {
                console.log(error);
            }
        } else {
            alert('Report description is requried')
        }

    }

    const handleAttachment = (event) => {
        console.log('Handle File Upload')
    }

    const handleChange = (event) => {
        /*if (event.target.value){
            setFormData((prevData) => ({ ...prevData, [event.target.id]: event.target.value, }));
        }*/
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
                break;
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <form>
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
                        <Button onClick={handleAttachment} startIcon={<InsertPhotoIcon />} variant="contained">Upload Image</Button>
                    </Stack>

                    <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
                        <Button type='submit' onClick={handleSubmit} sx={{ bgcolor: 'green' }} variant="contained">Send</Button>
                        <Button onClick={handleCancel} sx={{ bgcolor: 'red' }} variant="contained">Cancel</Button>
                    </Stack>
                </Box>
            </form>
        </Modal>
    );
}