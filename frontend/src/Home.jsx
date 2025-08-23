import { useState, useEffect } from 'react';
import NewReportModal from './Modals/NewReportModal.jsx';
import { userService } from './api/users.jsx';

import { styled } from '@mui/material/styles';
import { ButtonBase, Box, Typography, Card } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

export default function Home() {
    //Modal states
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const navigate = useNavigate();

    //User Data
    const { userId } = useAuth();
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        if (userId) {
            const fetchUser = async () => {
                try {
                    const user = await userService.getUser(userId);
                    setUserData(user);
                } catch (error) {
                    console.log(error)
                };
            }
            fetchUser();
        }
    }, [userId]);

    //#region MaterialUI Complex Button
    const images = [
        {
            url: '/images/newreport.png',
            title: 'New Report',
            width: '33%',
        },
        {
            url: '/images/profile.png',
            title: 'Profile',
            width: '33%',
        },
        {
            url: '/images/myreports.png',
            title: 'My Reports',
            width: '33%',
        },
    ];
    const ImageButton = styled(ButtonBase)(({ theme }) => ({
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('sm')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &.Mui-focusVisible': {
            zIndex: 1,
            '& .MuiImageBackdrop-root': {
                opacity: 0.15,
            },
            '& .MuiImageMarked-root': {
                opacity: 0,
            },
            '& .MuiTypography-root': {
                border: '4px solid currentColor',
            },
        },
    }));

    const ImageSrc = styled('span')({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    });

    const Image = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    }));

    const ImageBackdrop = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    }));

    const ImageMarked = styled('span')(({ theme }) => ({
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    }));
    //#endregion

    return (
        <div className='mx-5 my-5 flex justify-between'>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
                {images.map((image) => (
                    <ImageButton
                        focusRipple
                        key={image.title}
                        style={{
                            width: image.width,
                        }}
                        onClick={(() => {
                            switch (image.title) {
                                case 'New Report':
                                    return (() => handleOpen());
                                case 'Profile':
                                    return (() => navigate('/profile'));
                                case 'My Reports':
                                    return (() => navigate(`/reports?userFilter=${userId}`));
                                default:
                                    break;
                            }
                        })()}
                    >
                        <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                        <ImageBackdrop className="MuiImageBackdrop-root" />
                        <Image>
                            <Typography
                                component="span"
                                variant="subtitle1"
                                color="inherit"
                                sx={(theme) => ({
                                    position: 'relative',
                                    p: 4,
                                    pt: 2,
                                    pb: `calc(${theme.spacing(1)} + 6px)`,
                                    fontSize: '1.5rem'
                                })}
                            >
                                {(() => {
                                    const iconStyle = { mr: 1 }
                                    switch (image.title) {
                                        case 'New Report':
                                            return (<EditIcon fontSize='large' sx={iconStyle} />);
                                        case 'Profile':
                                            return (<AccountCircle fontSize='large' sx={iconStyle} />);
                                        case 'My Reports':
                                            return (<InsertDriveFileIcon fontSize='large' sx={iconStyle} />);
                                        default:
                                            break;
                                    }
                                })()}
                                {image.title}
                                <ImageMarked className="MuiImageMarked-root" />
                            </Typography>
                        </Image>
                    </ImageButton>
                ))}
            </Box>
            <NewReportModal open={open} handleClose={handleClose} user={userData} />
        </div>
    );
}