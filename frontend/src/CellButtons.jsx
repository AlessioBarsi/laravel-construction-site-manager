import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from '@mui/icons-material/Delete';
import { AccountCircle } from "@mui/icons-material";
import { userService } from "./api/users";
import ConfirmModal from "./ConfirmModal";
import { useNavigate } from 'react-router-dom';

export default function CellButtons({ id }) {
    const [open, setOpen] = useState(false);
    const [modalResult, setModalResult] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();

    const handleModalResult = (result) => { 
        setModalResult(result); 
        handleClose(); 
        if (result) {
            handleDelete(id);
        };
    };

    const handleDelete = async () => {
        try {
            await userService.deleteUser(id);
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    };
    
    return (
        <div>
            <Stack direction="row" spacing={1}>
                <IconButton aria-label="account" onClick={() => navigate('/user')}>
                    <AccountCircle />
                </IconButton>
                <IconButton aria-label="delete" onClick={handleOpen} sx={{ color: 'red' }}>
                    <DeleteIcon />
                </IconButton>
            </Stack>
            <ConfirmModal open={open} handleClose={handleClose} id={id} onResult={handleModalResult} />
        </div>
    );
        
}