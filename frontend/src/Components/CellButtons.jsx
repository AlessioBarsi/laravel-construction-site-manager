import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from '@mui/icons-material/Delete';
import { AccountCircle, Foundation, Article } from "@mui/icons-material";
import { userService } from "../api/users";
import { siteService } from "../api/sites";
import { reportService } from "../api/reports";
import ConfirmModal from "../Modals/ConfirmModal";
import { useNavigate } from 'react-router-dom';
import { roleService } from "../api/roles";

export default function CellButtons({ id, type }) {
    const [open, setOpen] = useState(false);
    const [, setModalResult] = useState(null);

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

    function handleRelatedButton(type, id) {
        if (type !== 'role') {
            navigate(`/${type}s/${id}`);
        } else {
            navigate(`/users/?roleFilter=${id}`);
        }
    };

    const handleDelete = async () => {
        switch (type) {
            case 'user':
                try {
                    await userService.deleteUser(id);
                    window.location.reload();
                } catch (err) {
                    console.log(err);
                }
                break;
            case 'site':
                try {
                    await siteService.deleteSite(id);
                    window.location.reload();
                } catch (err) {
                    console.log(err);
                }
                break;
            case 'report':
                try {
                    await reportService.deleteReport(id);
                    window.location.reload();
                } catch (err) {
                    console.log(err);
                }
                break;
            case 'role':
                try {
                    await roleService.deleteRole(id);
                    window.location.reload();
                } catch (err) {
                    console.log(err);
                }
                break;
            default:
                console.log('Error: invalid type from parent component');
                break;
        }
    };

    return (
        <div>
            <Stack direction="row" spacing={1}>
                <IconButton aria-label="account" color='primary' onClick={() => handleRelatedButton(type, id)}>
                    {(() => {
                        switch (type) {
                            case 'user':
                                return <AccountCircle />
                            case 'site':
                                return <Foundation />
                            case 'report':
                                return <Article />
                            case 'role':
                                return <AccountCircle />
                            default:
                                return <div>Icon Missing</div>
                        }
                    })()}
                </IconButton>
                <IconButton aria-label="delete" onClick={handleOpen} sx={{ color: 'red' }}>
                    <DeleteIcon />
                </IconButton>
            </Stack>
            <ConfirmModal open={open} handleClose={handleClose} title={`Confirm Deletion?`} subtitle={`${type} #${id} will be deleted`} onResult={handleModalResult} />
        </div>
    );

}